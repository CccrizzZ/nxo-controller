import { PrismaClient, Users } from "@prisma/client";

export class UserService {
  private readonly prisma: PrismaClient = new PrismaClient();

  async findAll(): Promise<any> {
    let usersArr: Users[];
    try {
      usersArr = await this.prisma.users.findMany();
    } catch (error) {
      throw new Error(`Cannot get all users, ${error}`);
    }

    return usersArr;
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

  async findUserById(id: string): Promise<Users | undefined> {
    let result: Users | null;
    try {
      result = await this.prisma.users.findFirst({
        where: {
          id: id
        }
      });
      await this.prisma.$disconnect();
    } catch (error) {
      await this.prisma.$disconnect();
      throw new Error(`Cannot Find user with ID ${id}, ${error}`);
    }

    return result === null ? undefined : result;
  }

  async createUser(newUser: Users): Promise<Users | undefined> {
    try {
      await this.prisma.users.create({
        data: {
          name: newUser.name,
          pwd: newUser.pwd,
          records: {}
        }
      });
      await this.prisma.$disconnect();
    } catch (error) {
      await this.prisma.$disconnect();
      throw new Error(`Cannot create user, ${error}`);
    }

    return newUser;
  }
}
