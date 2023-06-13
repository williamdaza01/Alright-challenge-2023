import { Controller, Post, Res, HttpStatus, Body, Get, Req } from '@nestjs/common';
import {CreateUserDTO} from './dto/user.dto'; 
import { UserService } from './user.service';
import * as CryptoJS from 'crypto-js';

@Controller('user/')
export class UserController {

    constructor( private userService: UserService) {}

    @Post('create-user')
    async signUp(@Res() res, @Body() createUserDTO){
        const decryptedData: CreateUserDTO = JSON.parse(CryptoJS.AES.decrypt(createUserDTO.encryptedData, 'coconice').toString(CryptoJS.enc.Utf8));
        const passEncrypt = CryptoJS.AES.encrypt(decryptedData.password, 'coconut').toString();      
        const user = await this.userService.createUser({...decryptedData, password: passEncrypt});
        return res.status(HttpStatus.OK).json({
            message: "User Successfully Created",
            user: user
        })
    }

    @Post('login-user')
    async login(@Res() res, @Body() createUserDTO){
        const decryptedData: CreateUserDTO = JSON.parse(CryptoJS.AES.decrypt(createUserDTO.encryptedData, 'coconice').toString(CryptoJS.enc.Utf8));
        const currentUser = await this.userService.loginUser(decryptedData);
        
        return res.status(HttpStatus.OK).json({
            message: "User Successfully Logged",
            currentUser: currentUser
        })
    }

    @Get('load-reviewers')
    async getReviewer(){
        return await this.userService.getReviewers();
    }
}
