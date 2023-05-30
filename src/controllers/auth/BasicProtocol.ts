import { Req } from "@tsed/common";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { Strategy } from "passport";
import { BasicStrategy } from "passport-http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {
    usernameField: "name",
    passwordField: "pwd"
  }
})
export class BasicProtocol implements OnVerify, OnInstall {
  async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
    // grab from database
    const user = await prisma.users.findFirst({
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
