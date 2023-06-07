import { Req } from "@tsed/common";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { Strategy } from "passport";
import { BasicStrategy } from "passport-http";
import { PrismaClient, Users } from "@prisma/client";

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {
    usernameField: "name",
    passwordField: "pwd"
  }
})
export class BasicProtocol implements OnVerify, OnInstall {
  private prisma: PrismaClient = new PrismaClient();

  async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string): Promise<boolean | Users> {
    // grab from database
    const user = await this.prisma.users.findFirst({
      where: {
        name: username,
        pwd: password
      }
    });

    if (!user) {
      return false;
    }

    return user;
  }

  $onInstall(strategy: Strategy): void {
    console.log(strategy);
  }
}
