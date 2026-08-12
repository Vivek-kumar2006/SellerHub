import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcrypt';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    hashed,
    verifyAccessToken
} from '../../utils/jwt.js';
const REFRESH_COOKIE_PATH = '/auth/refresh';

import { Request, Response, NextFunction } from 'express';


export const loginhandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });


        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        const payload = {
            userId: user.id,
            role: user.role
        };

        const AccessToken = generateAccessToken(payload);
        const RefreshToken = generateRefreshToken(payload);
        const hashedrefreshtoken = hashed(RefreshToken as string);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await prisma.refreshTokens.create({
            data: {
                userId: user.id,
                token: hashedrefreshtoken,
                expiresAt: expiresAt
            }
        });

        res.cookie('accessToken', AccessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', RefreshToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            "message": "User logged in",
            accessToken: AccessToken,
            
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

export const registerhandler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, email, password } = req.body;
    console.log("--- REFRESH ENDPOINT HIT ---");
    console.log("Headers:", req.headers);
    console.log("Cookies Object:", req.cookies);
    try {
        const existing = await prisma.user.findFirst({ where: { email } });
        if (existing) {
            return res.status(400).json({ "message": "Email is already registered." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                phone,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            success: true,
            message: "User is registered.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};
export const refreshTokenhandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ "message": "Refresh token is missing." });
        }

        const decoded = verifyRefreshToken(refreshToken);
        const hashedRefToken = hashed(refreshToken);

        const storedToken = await prisma.refreshTokens.findFirst({
            where: { token: hashedRefToken }
        });

        if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
            return res.status(403).json({ "message": "Invalid or revoked refresh token" });
        }

        const AccessToken = generateAccessToken({
            userId: decoded.userId,
            role: decoded.role
        });

        res.cookie('accessToken', AccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });

        return res.json({
            success: true,
            message: "Token refreshed successfully.",
            accessToken: AccessToken
        });
    } catch (error) {
        next(error);
    }
};

export const logouthandler = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;
    try {
        if(!refreshToken)
            {
                return res.json(
                    {
                        "message":"Response token is missing...."
                    })
            }
        if (refreshToken) {
            const hashedToken = hashed(refreshToken);
            await prisma.refreshTokens.deleteMany({
                where: { token: hashedToken }
            });
        }

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.clearCookie('refreshToken', {
            //httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {

        next(error);
    }
};

// const COOKIE_OPTIONS = {
//     path: '/',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax' as const,
// };

// // ==========================================
// // 1. REFRESH TOKEN HANDLER
// // ==========================================
// export const refreshTokenhandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Step 1: Check if refresh token exists in incoming cookies
//         const refreshToken = req.cookies?.refreshToken;
//         if (!refreshToken) {
//             return res.status(401).json({
//                 success: false,
//                 error: 'MISSING_REFRESH_TOKEN',
//                 message: 'Refresh token cookie is missing. Please log in again.',
//             });
//         }

//         // Step 2: Validate JWT signature & expiration explicitly
//         let decoded: any;
//         try {
//             decoded = verifyRefreshToken(refreshToken);
//         } catch (jwtError: any) {
//             if (jwtError.name === 'TokenExpiredError') {
//                 return res.status(401).json({
//                     success: false,
//                     error: 'TOKEN_EXPIRED',
//                     message: 'Refresh token has expired. Please log in again.',
//                 });
//             }
//             return res.status(400).json({
//                 success: false,
//                 error: 'INVALID_TOKEN_FORMAT',
//                 message: 'Refresh token is malformed or signature verification failed.',
//                 details: jwtError.message,
//             });
//         }

//         // Step 3: Check database for hashed token match
//         const hashedRefToken = hashed(refreshToken);
//         const storedToken = await prisma.refreshTokens.findFirst({
//             where: { token: hashedRefToken },
//         });

//         if (!storedToken) {
//             return res.status(403).json({
//                 success: false,
//                 error: 'TOKEN_NOT_FOUND',
//                 message: 'Refresh token does not exist in the database or was already revoked.',
//             });
//         }

//         if (storedToken.revoked) {
//             return res.status(403).json({
//                 success: false,
//                 error: 'TOKEN_REVOKED',
//                 message: 'This refresh token session has been revoked.',
//             });
//         }

//         if (storedToken.expiresAt < new Date()) {
//             return res.status(403).json({
//                 success: false,
//                 error: 'TOKEN_EXPIRED_IN_DB',
//                 message: 'Refresh token record expired in database.',
//             });
//         }

//         // Step 4: Issue New Access Token
//         const newAccessToken = generateAccessToken({
//             userId: decoded.userId,
//             role: decoded.role,
//         });

//         res.cookie('accessToken', newAccessToken, {
//             ...COOKIE_OPTIONS,
//             maxAge: 15 * 60 * 1000, // 15 mins
//         });

//         return res.status(200).json({
//             success: true,
//             message: 'Access token refreshed successfully.',
//             accessToken: newAccessToken,
//         });

//     } catch (error) {
//         console.error('❌ Unexpected Error in refreshTokenhandler:', error);
//         next(error);
//     }
// };

// // ==========================================
// // 2. LOGOUT HANDLER
// // ==========================================
// export const logouthandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const refreshToken = req.cookies?.refreshToken;

//         // Step 1: Remove refresh token from database if present
//         if (refreshToken) {
//             try {
//                 const hashedToken = hashed(refreshToken);
//                 await prisma.refreshTokens.deleteMany({
//                     where: { token: hashedToken },
//                 });
//             } catch (dbError) {
//                 console.error('⚠️ DB token deletion warning on logout:', dbError);
//                 // Continue execution so client-side cookies still get cleared
//             }
//         }

//         // Step 2: Always clear both cookies on client with matching options
//         res.clearCookie('accessToken', COOKIE_OPTIONS);
//         res.clearCookie('refreshToken', COOKIE_OPTIONS);

//         return res.status(200).json({
//             success: true,
//             message: 'Logged out successfully. All authentication cookies cleared.',
//         });

//     } catch (error) {
//         console.error('❌ Unexpected Error in logouthandler:', error);
//         next(error);
//     }
// };