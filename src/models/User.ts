import {
  Default,
  Enum,
  Format,
  Maximum,
  MaxLength,
  Minimum,
  MinLength,
  Pattern,
  Required,
  Description,
  Ignore
} from "@tsed/schema";

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
}