import { PatientRecordModel } from "src/models/PatientRecordModel";
import { PrismaClient, PatientRecord } from "@prisma/client";

export class PatientRecordsService {
  private readonly prisma: PrismaClient = new PrismaClient();

  async findRecordById(id: string): Promise<PatientRecordModel> {
    console.log(id);

    return new PatientRecordModel();
  }

  async createRecord(record: PatientRecord): Promise<PatientRecord> {
    await this.prisma.patientRecord
      .create({
        data: record
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        throw e;
      });

    return record;
  }

  async deleteRecordById(id: string): Promise<string> {
    await this.prisma.patientRecord
      .delete({
        where: {
          id: id
        }
      })
      .then((res) => {
        console.log(res);
        return String(res);
      })
      .catch((e) => {
        throw e;
      });

    return id;
  }
}
