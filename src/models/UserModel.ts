import { MaxLength, MinLength, Required } from "@tsed/schema";
import { PatientRecordModel } from "./PatientRecordModel";

export class User {
  _id: string;

  @Required()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @Required()
  @MinLength(3)
  @MaxLength(50)
  pwd: string;

  records?: PatientRecordModel[];
}
