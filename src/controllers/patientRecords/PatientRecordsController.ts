import { Get, Post, Delete, Put } from "@tsed/schema";
import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
// import { PrismaClient } from '@prisma/client'
import { Authorize } from "@tsed/passport";
import { PatientRecordsService } from "./PatientRecordsService";
import { PatientRecord } from "@prisma/client";
import { priorityType, statusType } from "../../models/PatientRecordModel";

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
  async deleteRecordById(@PathParams("id") id: string): Promise<string | undefined> {
    return await this.patientRecordService.deleteRecordById(id);
  }

  @Get("/ownerId/:id")
  async getRecordOwnerId(@PathParams("id") id: string): Promise<string | undefined> {
    return await this.patientRecordService.getRecordOwnerId(id);
  }

  @Put("/updateName")
  async updateName(@BodyParams("id") id: string, @BodyParams("name") name: string): Promise<string | undefined> {
    if (!id) throw new Error("Invalid ID");
    if (!name) throw new Error("Invalid Name");
    return await this.patientRecordService.updateRecordNameById(id, name);
  }

  @Put("/updatePriority")
  async updatePriority(@BodyParams("id") id: string, @BodyParams("priority") priority: string): Promise<string> {
    if (!id) throw new Error("Invalid ID");
    if (!priority) throw new Error("Invalid Priority");
    return await this.patientRecordService.updateRecordPriorityById(id, priority as priorityType);
  }

  @Put("/updateStatus")
  async updateStatus(@BodyParams("id") id: string, @BodyParams("status") status: string): Promise<string | undefined> {
    if (!id) throw new Error("Invalid ID");
    if (!status) throw new Error("Invalid Status");
    return await this.patientRecordService.updateStatusTypeById(id, status as statusType);
  }
}
