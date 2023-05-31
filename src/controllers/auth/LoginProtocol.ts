import { Req } from "@tsed/common";
import { Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { BeforeInstall, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UserService } from "../users/UserService";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall, BeforeInstall {
  @Inject()
  private userService: UserService;

  async $beforeInstall(settings: IStrategyOptions): Promise<IStrategyOptions> {
    return settings;
  }

  $onInstall(strategy: Strategy): void {
    console.log(strategy);
  }

  async $onVerify(@Req() request: Req, @BodyParams() name: string, @BodyParams() pwd: string) {
    const user = this.userService.findOne(String(name), pwd);

    if (!user) {
      return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    // if (!user.verifyPassword(pwd)) {
    //   return false;
    //   // OR throw new NotAuthorized("Wrong credentials")
    // }

    return user;
  }
}
