import { Get, Post } from "@tsed/schema";
import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { Users } from "@prisma/client";
import { UserService } from "./UserService";
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
  async getUserById(@PathParams("id") id: string): Promise<Users | undefined> {
    return this.userService.findUserById(id);
  }

  @Post("/register")
  async registerUser(@BodyParams() newUser: Users): Promise<Users | undefined> {
    return this.userService.registerUser(newUser);
  }

  // @Put("/update")
}
