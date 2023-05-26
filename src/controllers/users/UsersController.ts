import { Get, Post } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  id: string
  name: string,
  pwd?: string
}

@Controller("/users")
export class UserController {
  @Get("/")
  async findAll(): Promise<string> {
    return "This action returns all users";
  }

  // verify user exist in database
  @Get("/:id")
  async getUserById(@PathParams("id") id: string): Promise<User> {
    return {
      id,
      name: "test"
    };
  }

  @Get("/:pwd/:uname")
  async getUserByLogin(@PathParams("pwd") pwd: string, @PathParams("uname") uname: string): Promise<any> {
    return {
      name: "test"
    };
  }
}