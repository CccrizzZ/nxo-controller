import { BodyParams, Post, Req, Get, Session } from "@tsed/common";
import { Returns } from "@tsed/schema";
import { Unauthorized } from "@tsed/exceptions";
import { Controller } from "@tsed/di";
import { UserService } from "../users/UserService";
import * as jwt from "jsonwebtoken";
// import { Authorize } from "@tsed/passport";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

@Controller("/auth")
export class PassportController {
  constructor(private readonly userService: UserService) {}

  @Get("/whoami")
  whoAmI(@Session() session: any) {
    console.log("User in session =>", session.user);

    return session.user && session.user.id ? `Hello user ${session.user.token}` : "Hello world";
  }

  @Post("/login")
  @Returns(200, String)
  @Returns(401, Unauthorized).Description("login failed")
  async login(@Req() req: Req, @BodyParams("uname") uname: string, @BodyParams("pwd") pwd: string): Promise<any | undefined> {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.hostname);

    const result = await this.userService.validateUser(uname, pwd);
    console.log(result);
    if (result) {
      console.log(uname);
      console.log(pwd);
      const res = jwt.sign(
        {
          uname,
          pwd
        },
        String(process.env.PKEY)
      );
      return res;
    } else {
      throw new Unauthorized("login failed");
    }
  }
}
