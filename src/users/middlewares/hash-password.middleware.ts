import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        next();
    }
}
