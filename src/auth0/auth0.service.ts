import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { UpdateUserDto } from "src/users/dtos/update-user.dto";

@Injectable()
export class Auth0Service {
  constructor(private httpService: HttpService) {}

    async getUser(access_token: string): Promise<AxiosResponse<any, any>> {
        const res = await this.httpService.get(`${process.env.AUTH0_ISSUER_URL}/userinfo`, { 
            headers: { Authorization: access_token }
        }).toPromise();
        return res.data;
    }

    async updateUser(sub: string, userDto: UpdateUserDto) {
        const url = `${process.env.AUTH0_ISSUER_URL}/api/v2/users/auth0%7C${sub}`;
        
        const res = await this.httpService.patch(url, userDto, {
            headers: { Authorization: `Bearer ${process.env.AUTH0_MGMT_ACCESS_TOKEN}` },
        }).toPromise();
        console.log("VSE");
        
        return res.data;
    }

    static getSubId(sub: string): string {
        const subParsed = sub.split('|');  
        return subParsed[1];
    }
}