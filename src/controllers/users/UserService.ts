import { User } from "../../models/UserModel";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @Injectable()
export class UserService {
  private readonly usersArr: User[] = [];

  create(user: User) {
    this.usersArr.push(user);
  }

  findAll(): User[] {
    return this.usersArr;
  }

  async findOne(name: string, pwd: string): Promise<any> {
    const user = await prisma.users.findFirst({
      where: {
        name: String(name),
        pwd: pwd
      }
    });

    if (user) {
      return user;
    }

    return "not found";
  }
}
