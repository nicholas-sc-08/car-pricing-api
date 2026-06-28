import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.usersService.find(email);
        if(users.length) {
            throw new BadRequestException('email in use ');
        }

        //cada byte tem 2 carateres, aqui eu converto binario pra string
        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 32) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        const user = this.usersService.create(email, result);

        return user;
    }

    signin(email: string, password: string) {

    }
}