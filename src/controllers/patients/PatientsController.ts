import { Get, Post, Delete } from "@tsed/schema";
import { Controller, Inject } from "@tsed/di";
import { Patients } from "@prisma/client";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { PatientsService, PatientInfo } from "./PatientsService";

@Controller("/patients")
export class PatientsController {
  @Inject()
  protected patientsService: PatientsService;

  @Get("/:id")
  async getPatientById(@PathParams("id") id: string): Promise<PatientInfo | undefined> {
    return this.patientsService.findPatientById(id);
  }

  @Post("/register")
  async registerPatient(@BodyParams("newPatient") newPatient: Patients): Promise<PatientInfo | undefined> {
    return this.patientsService.registerPatient(newPatient);
  }

  @Delete("/delete/:id")
  async deletePatient(@PathParams("id") id: string): Promise<string> {
    if (!id) throw new Error("Invalid ID");
    return this.patientsService.deletePatient(id);
  }
}
