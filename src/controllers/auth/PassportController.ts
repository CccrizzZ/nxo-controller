import { BodyParams, Post, Req } from "@tsed/common";
import { Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
// import { PrismaClient } from "@prisma/client";
import { User } from "../../models/User";
import { Authenticate } from "@tsed/passport";

// const prisma = new PrismaClient();

@Controller("/auth")
export class PassportController {
  @Post("/login")
  @Returns(200, User)
  @Authenticate("login")
  async login(@Req() req: Req, @BodyParams("name") name: string, @BodyParams("pwd") pwd: string): Promise<any> {
    return {
      name,
      pwd
    };
  }
}
