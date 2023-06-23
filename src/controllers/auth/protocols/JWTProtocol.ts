import { Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UsersService } from "../../users/UsersService";
import * as jwt from "jsonwebtoken";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
    issuer: "cccrizzz.nxocare.com",
    audience: "nxocare.com"
  }
})
export class JwtProtocol implements OnVerify, OnInstall {
  constructor(private usersSevice: UsersService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: jwt.JwtPayload): Promise<string | undefined> {
    const user = await this.usersSevice.findUserById(String(jwtPayload.sub));

    if (!user || !user.name) {
      throw new Unauthorized("Wrong token");
    }

    return "Login Success!";
  }

  $onInstall(strategy: Strategy): void {
    console.log(strategy.name);
  }
}
