import { Get } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
prisma.$connect()

interface User {
  id: string
  name: string,
  pwd?: string
}

@Controller("/")
export class UserController {
  @Get("/")
  async findAll(): Promise<string> {
    await prisma.user.create({
      data: {
        name: 'Chris',
        pwd: '12345'
      }
    })


    console.log(prisma.user)
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