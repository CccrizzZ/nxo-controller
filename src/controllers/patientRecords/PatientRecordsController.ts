import { Get, Post, Delete } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
// import { PrismaClient } from '@prisma/client'
import { PatientRecordModel } from "src/models/PatientRecordModel";
import { Authorize } from "@tsed/passport";
// const prisma = new PrismaClient()

@Controller("/record")
export class PatientRecordsController {
  @Get("/")
  @Authorize("jwt")
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
  async addNewRecord(@BodyParams("record") record: PatientRecordModel): Promise<any> {
    console.log("payload: ", record);

    return;
  }

  @Delete("/delete")
  async deleteRecordById(@BodyParams("id") id: string): Promise<any> {
    console.log(id);
  }
}
