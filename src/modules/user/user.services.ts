import {prisma} from '../../lib/prisma'
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError';



export const getMe =async(req:Request,res:Response,next:NextFunction)=>
    {
          const userId =req.user?.userId
          const user = await prisma.user.findUnique({ 
             where:{id: userId},
             select:
             {
                id:true,name:true,email:true,phone:true
             } }
            );
          
            if(!user){
                throw new ApiError(400, "No such user found")
            }
    
    }