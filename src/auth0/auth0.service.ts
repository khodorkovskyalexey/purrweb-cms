import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";

@Injectable()
export class Auth0Service {
  constructor(private httpService: HttpService) {}

    async getUser(access_token: string): Promise<AxiosResponse<any, any>> {
        const res = await this.httpService.get(`${process.env.AUTH0_ISSUER_URL}/userinfo`, { 
            headers: { Authorization: access_token }
        }).toPromise();
        return res.data;
    }
}