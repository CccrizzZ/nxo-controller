import { BodyParams, Post, Req } from "@tsed/common";
import { Returns } from "@tsed/schema";
import { Unauthorized } from "@tsed/exceptions";
import { Controller } from "@tsed/di";
import { UserService } from "../users/UserService";
// import { Authorize } from "@tsed/passport";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

@Controller("/auth")
export class PassportController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  @Returns(200, String)
  @Returns(401, Unauthorized).Description("login failed")
  async login(@Req() req: Req, @BodyParams("uname") uname: string, @BodyParams("pwd") pwd: string): Promise<any> {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.hostname);

    const result = await this.userService.validateUser(uname, pwd);
    console.log(result);
    if (result) {
      console.log(uname);
      console.log(pwd);
      return "token";
    } else {
      throw new Unauthorized("login failed");
    }
  }
}
