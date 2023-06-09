import { Get, Post, Put, Delete } from "@tsed/schema";
import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { Users } from "@prisma/client";
import { UserService, UserInfo } from "./UserService";
// import { Authenticate } from "@tsed/passport";

@Controller("/users")
export class UserController {
  @Inject()
  protected userService: UserService;

  // @Get("/")
  // @Authenticate("jwt")
  // async findAll(): Promise<Users[] | undefined> {
  //   return this.userService.findAll();
  // }

  // get user by id, throw error if not found
  @Get("/:id")
  async getUserById(@PathParams("id") id: string): Promise<UserInfo | undefined> {
    return this.userService.findUserById(id);
  }

  @Post("/register")
  async registerUser(@BodyParams() newUser: Users): Promise<Users | undefined> {
    return this.userService.registerUser(newUser);
  }

  @Post("/validate")
  async validateUser(@BodyParams("email") email: string, @BodyParams("pwd") pwd: string): Promise<boolean> {
    return this.userService.validateUser(email, pwd);
  }

  @Put("/update/:id")
  async updateUserInfo(
    @PathParams("id") id: string,
    @BodyParams("name") name?: string,
    @BodyParams("pwd") pwd?: string,
    @BodyParams("email") email?: string
  ): Promise<Users | undefined> {
    return this.userService.updateUserById(id, name, pwd, email);
  }

  @Delete("/delete/:id")
  async deleteUserById(@PathParams("id") id: string): Promise<boolean> {
    return this.userService.deleteUserById(id);
  }
}
