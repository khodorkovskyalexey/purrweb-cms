import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    
    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } 
    return true;
  }
}
