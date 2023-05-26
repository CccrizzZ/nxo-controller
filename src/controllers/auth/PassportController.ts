import { BodyParams, Get, Post, Req } from "@tsed/common"
import { Returns } from "@tsed/schema"
import { Controller } from "@tsed/di"
import { PathParams } from "@tsed/platform-params"
import { PrismaClient } from '@prisma/client'
import { User } from '../../models/User'
import { Authenticate } from '@tsed/passport'

const prisma = new PrismaClient()


@Controller("/auth")
export class PassportController {
  @Post("/login")
  @Returns(200, User)
  @Authenticate('login')
  async login(@Req() req: Req, @BodyParams("name") name: string, @BodyParams("pwd") pwd: string): Promise<string> {
    return name
  }
}