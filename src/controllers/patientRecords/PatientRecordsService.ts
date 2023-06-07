import { PatientRecordModel } from "src/models/PatientRecordModel";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @Injectable()
export class PatientRecordsService {
  addRecord(record: PatientRecordModel) {
    prisma.patientRecord.create({
      data: {
        name: record.name,
        date: record.date,
        category: record.category,
        recordType: String(record.rType),
        priority: String(record.priority),
        statusType: String(record.sType)
      }
    });
  }

  async findRecordById(id: string): Promise<PatientRecordModel> {
    console.log(id);

    return new PatientRecordModel();
  }
}
