import { PrismaClient, Users } from "@prisma/client";
import { Md5 } from "ts-md5";

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
        name: name,
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

  async registerUser(newUser: Users): Promise<Users | undefined> {
    try {
      await this.prisma.users.create({
        data: {
          name: newUser.name,
          pwd: Md5.hashStr(newUser.pwd),
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

  async validateUser(uname: string, pwd: string): Promise<boolean> {
    console.log("validating ........" + uname);
    try {
      const result = await this.prisma.users.findFirst({
        where: {
          name: uname,
          pwd: pwd
        }
      });
      return result?.name === uname && result.pwd === pwd;
    } catch (error) {
      throw new Error(`Authentication error, ${error}`);
    }
    return true;
  }
}
