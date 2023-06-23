import { Patients, PrismaClient } from "@prisma/client";

export type PatientInfo = {
  name: string | undefined;
  email: string | undefined;
};

export class PatientsService {
  private readonly prisma: PrismaClient = new PrismaClient();

  async findPatientById(id: string): Promise<PatientInfo> {
    const patient = await this.prisma.patients
      .findFirst({
        where: {
          id: id
        }
      })
      .catch(() => {
        throw new Error(`Cannot find patient of id: ${id}`);
      });

    return patient as PatientInfo;
    // return {
    //   name: patient?.name,
    //   email: patient?.email
    // }
  }

  async registerPatient(newPatient: Patients): Promise<PatientInfo> {
    const res = await this.prisma.patients
      .create({
        data: {
          ...newPatient
        }
        // }).catch(() => { throw new Error("Register patient failed") })
      })
      .catch((e) => {
        throw e;
      });
    return res as PatientInfo;
  }

  async deletePatient(id: string): Promise<string> {
    const res = await this.prisma.patients
      .delete({
        where: {
          id: id
        }
      })
      .catch(() => {
        throw new Error("Delete patient failed");
      });

    return res.id;
  }
}
