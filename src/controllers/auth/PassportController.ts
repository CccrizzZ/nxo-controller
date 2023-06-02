import { BodyParams, Post, Req } from "@tsed/common";
import { Controller } from "@tsed/di";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

@Controller("/auth")
export class PassportController {
  @Post("/login")
  async login(@Req() req: Req, @BodyParams("name") name: string, @BodyParams("pwd") pwd: string): Promise<any> {
    return {
      name,
      pwd
    };
  }
}
