import { PrismaClient, Users } from "@prisma/client";

export type UserInfo = {
  name: string | undefined;
  email: string | undefined;
};

export class UserService {
  private readonly prisma: PrismaClient = new PrismaClient();

  // async findAll(): Promise<any> {
  //   let usersArr: Users[];
  //   try {
  //     usersArr = await this.prisma.users.findMany();
  //   } catch (error) {
  //     throw new Error(`Cannot get all users, ${error}`);
  //   }

  //   return usersArr;
  // }

  async findUserById(id: string): Promise<UserInfo> {
    let result: Users | null;
    try {
      result = await this.prisma.users.findFirst({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error(`Cannot Find user with ID ${id}, ${error}`);
    }
    await this.prisma.$disconnect();

    const info: UserInfo = {
      name: result?.name,
      email: result?.email
    };

    return info;
  }

  async registerUser(newUser: Users): Promise<Users | undefined> {
    try {
      await this.prisma.users.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          pwd: newUser.pwd,
          records: {}
        }
      });
    } catch (error) {
      throw new Error(`Cannot create user, ${error}`);
    }
    await this.prisma.$disconnect();
    return newUser;
  }

  async validateUser(email: string, pwd: string): Promise<boolean> {
    const result = await this.prisma.users
      .findFirst({
        where: {
          email: email,
          pwd: pwd
        }
      })
      .catch((e) => {
        throw e;
      });
    await this.prisma.$disconnect();
    if (!result) {
      return false;
    }
    return true;
  }

  async updateUserById(id: string, name?: string, pwd?: string, email?: string): Promise<Users | undefined> {
    const user = await this.prisma.users
      .findFirst({
        where: {
          id: id
        }
      })
      .catch((e) => {
        throw e;
      });

    if (!user) return undefined;

    const result = await this.prisma.users
      .update({
        where: {
          id: id
        },
        data: {
          name: name ? name : user.name,
          email: email ? email : user.email,
          pwd: pwd ? pwd : user.pwd
        }
      })
      .catch((e) => {
        throw e;
      });

    if (!result) return undefined;
    await this.prisma.$disconnect();
    return result;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const res = await this.prisma.users
      .delete({
        where: {
          id: id
        }
      })
      .catch((e) => {
        throw e;
      });

    if (!res.name) return false;
    return true;
  }
}
