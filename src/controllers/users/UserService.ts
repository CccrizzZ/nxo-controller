import { User } from "../../models/UserModel";
import { PrismaClient } from "@prisma/client";

// @Injectable()
export class UserService {
  private readonly prisma: PrismaClient = new PrismaClient();

  create(user: User) {
    console.log(user);
  }

  findAll(): void {
    console.log("findAll");
  }

  async findOne(name: string, pwd: string): Promise<any> {
    const user = await this.prisma.users.findFirst({
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
