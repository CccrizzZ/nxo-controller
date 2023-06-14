import { PrismaClient, PatientRecord } from "@prisma/client";
import { priorityType, statusType } from "../../models/PatientRecordModel";

export class PatientRecordsService {
  private readonly prisma: PrismaClient = new PrismaClient();

  async findRecordById(id: string): Promise<PatientRecord | undefined> {
    const record = await this.prisma.patientRecord.findFirst({
      where: {
        id: id
      }
    });
    return record || undefined;
  }

  async createRecord(record: PatientRecord): Promise<string> {
    await this.prisma.patientRecord
      .create({
        data: {
          ...record
        }
      })
      .catch((e) => {
        throw e;
      });
    return record.id;
  }

  async deleteRecordById(id: string | undefined): Promise<string | undefined> {
    await this.prisma.patientRecord
      .delete({
        where: {
          id: id
        }
      })
      .catch((e) => {
        throw e;
      });

    return id;
  }

  async getRecordOwnerId(id: string): Promise<string | undefined> {
    const record = await this.prisma.patientRecord
      .findFirst({
        where: {
          id: id
        }
      })
      .catch((e) => {
        throw e;
      });

    if (!record) return undefined;
    return record.id;
  }

  async updateRecordNameById(id: string, newName: string): Promise<string> {
    await this.prisma.patientRecord
      .update({
        where: {
          id: id
        },
        data: {
          name: newName
        }
      })
      .catch((e) => {
        throw e;
      });
    return newName;
  }

  async updateRecordPriority(id: string, newPriority: priorityType): Promise<string> {
    await this.prisma.patientRecord
      .update({
        where: {
          id: id
        },
        data: {
          priority: newPriority
        }
      })
      .catch((e) => {
        throw e;
      });
    return String(newPriority);
  }

  async updateStatusType(id: string, newStatus: statusType): Promise<string> {
    await this.prisma.patientRecord
      .update({
        where: {
          id: id
        },
        data: {
          statusType: newStatus
        }
      })
      .catch((e) => {
        throw e;
      });
    return String(newStatus);
  }

  async getAllRecordByOwner(id: string): Promise<PatientRecord[]> {
    const arr = await this.prisma.patientRecord
      .findMany({
        where: {
          usersId: id
        }
      })
      .catch((e) => {
        throw e;
      });
    return arr;
  }
}
