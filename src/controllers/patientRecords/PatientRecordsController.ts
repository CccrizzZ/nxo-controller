import { Get, Post, Delete } from "@tsed/schema";
import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
// import { PrismaClient } from '@prisma/client'
import { Authorize } from "@tsed/passport";
import { PatientRecordsService } from "./PatientRecordsService";
import { PatientRecord } from "@prisma/client";

// const prisma = new PrismaClient()

@Controller("/record")
export class PatientRecordsController {
  @Inject()
  protected patientRecordService: PatientRecordsService;

  @Get("/")
  @Authorize("jwt")
  async findAll(): Promise<string> {
    return "This action returns all records";
  }

  @Get("/get/:id")
  async findRecordById(@PathParams("id") id: string): Promise<PatientRecord | undefined> {
    return await this.patientRecordService.findRecordById(id);
  }

  @Post("/create")
  async createRecord(@BodyParams("record") record: PatientRecord): Promise<string> {
    return await this.patientRecordService.createRecord(record);
  }

  @Get("/owner/:id")
  async findAllRecordsByOwnerId(@PathParams("id") id: string): Promise<PatientRecord[]> {
    return this.patientRecordService.getAllRecordByOwner(id);
  }

  @Delete("/delete/:id")
  async deleteRecordById(@BodyParams("id") id: string): Promise<string | undefined> {
    return await this.patientRecordService.deleteRecordById(id);
  }
}
