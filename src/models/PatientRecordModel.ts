import { Property, Nullable } from "@tsed/schema";

export type categoryType = "patientRequests" | "providerRequests" | "recordsReceived" | "yourRequests" | undefined;
export type recordType = "patientProfile" | "labResult" | "doctorsNote" | undefined;
export type priorityType = "emergency" | "medium" | "low" | undefined;
export type statusType = "pending" | "complete" | "rejected" | undefined;

export class PatientRecordModel {
  @Property()
  id: string;

  @Property()
  name: string;

  @Property()
  date: string;

  @Property()
  category: string;

  @Property()
  rType: recordType;

  @Property()
  sType: statusType;

  @Property()
  priority: priorityType;

  @Nullable(String)
  oid: string | null;
}
