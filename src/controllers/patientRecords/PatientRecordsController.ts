import { Get, Post, ContentType } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
// import { PrismaClient } from '@prisma/client'
import { PatientRecordModel } from "src/models/PatientRecordModel";
// const prisma = new PrismaClient()

@Controller("/record")
export class PatientRecordsController {
  @Get("/")
  async findAll(): Promise<string> {
    return "This action returns all records";
  }

  @Get("/get/:id")
  async getRecordById(@PathParams("id") id: string): Promise<any> {
    return {
      id,
      name: "test"
    };
  }

  @Post("/add")
  @ContentType("json")
  async addNewRecord(@BodyParams("record") record: PatientRecordModel): Promise<any> {
    console.log("payload: ", record);

    return;
  }
}
