import { Request,Response,NextFunction } from "express";
import { asyncHandler } from "./asyncHandler";
import { Role } from "../../generated/prisma/enums";
import { ApiError } from "../utils/ApiError";

export const verifyRoles=(...allowedRoles:Role[])=>
    {
        return (req:Request,res:Response,next:NextFunction) =>
            {
                const user=req.user
                  if (!user) {
                    throw new ApiError(401,'User is not authenticated.')
                  }
                  if (!allowedRoles.includes(user.role as Role)) {
                       throw new ApiError(403,`Access denied.Permission denied to ${allowedRoles.join('or')}`)
                  }

                  next()
            }
    }