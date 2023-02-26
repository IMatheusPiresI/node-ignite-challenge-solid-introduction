import { v4 as uuidv4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const userValues: User = {
      name,
      email,
    };

    Object.assign(user, userValues);

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.indexOf(receivedUser);

    if (userIndex < 0) {
      throw new Error("User not exist");
    }

    const userWithAdmin: User = {
      ...receivedUser,
      admin: true,
    };

    this.users[userIndex] = userWithAdmin;

    return userWithAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
