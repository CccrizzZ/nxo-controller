import { PrismaClient, Users } from "@prisma/client";

export type UserInfo = {
  name: string | undefined;
  email: string | undefined;
};

export class UsersService {
  private readonly prisma: PrismaClient = new PrismaClient();

  // only return user info
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
      throw new Error("Cannot create user");
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
      .catch(() => {
        throw new Error("Cannot find user");
      });
    await this.prisma.$disconnect();
    if (!result) {
      return false;
    }
    return true;
  }

  async updateUserById(id: string, name?: string, pwd?: string, email?: string): Promise<Users | undefined> {
    if (!name && !pwd && !email) throw new Error("Need more input");
    const user = await this.prisma.users
      .findFirst({
        where: {
          id: id
        }
      })
      .catch(() => {
        throw new Error("Cannot update user");
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
      .catch(() => {
        throw new Error("Cannot update user");
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
      .catch(() => {
        throw new Error("Cannot delete user");
      });

    if (!res.name) return false;
    return true;
  }
}
