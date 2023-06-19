import { PrismaClient, PatientRecord } from "@prisma/client";
import { priorityType, statusType } from "../../models/PatientRecordModel";

export class PatientRecordsService {
  private readonly prisma: PrismaClient = new PrismaClient();

  async findRecordById(id: string): Promise<PatientRecord | undefined> {
    const record = await this.prisma.patientRecord
      .findFirst({
        where: {
          id: id
        }
      })
      .catch(() => {
        throw new Error("Cannot find record");
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
      .catch(() => {
        throw new Error("Failed to create record");
      });
    return record.id;
  }

  async getAllRecordByOwner(id: string): Promise<PatientRecord[]> {
    const arr = await this.prisma.patientRecord
      .findMany({
        where: {
          usersId: id
        }
      })
      .catch(() => {
        throw new Error("Owner not found");
      });
    return arr;
  }

  async deleteRecordById(id: string | undefined): Promise<string | undefined> {
    await this.prisma.patientRecord
      .delete({
        where: {
          id: id
        }
      })
      .catch(() => {
        throw new Error("Failed to delete record");
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
      .catch(() => {
        throw new Error("Cannot get record owner");
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
      .catch(() => {
        throw new Error("Failed to update name");
      });
    return newName;
  }

  async updateRecordPriorityById(id: string, newPriority: priorityType): Promise<string> {
    await this.prisma.patientRecord
      .update({
        where: {
          id: id
        },
        data: {
          priority: newPriority
        }
      })
      .catch(() => {
        throw new Error("Failed to update priority");
      });
    return String(newPriority);
  }

  async updateStatusTypeById(id: string, newStatus: statusType): Promise<string> {
    await this.prisma.patientRecord
      .update({
        where: {
          id: id
        },
        data: {
          statusType: newStatus
        }
      })
      .catch(() => {
        throw new Error("Failed to update status");
      });
    return String(newStatus);
  }
}
