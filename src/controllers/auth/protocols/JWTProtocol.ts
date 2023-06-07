import { Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UserService } from "src/controllers/users/UserService";
import { Users } from "@prisma/client";

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
  constructor(private userSevice: UserService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any): Promise<Users | undefined> {
    const user = this.userSevice.findUserById(String(jwtPayload.sub));

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    req.user = user;

    return user;
  }

  $onInstall(strategy: Strategy): void {
    console.log(strategy);
  }
}
