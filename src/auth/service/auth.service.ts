import { getRepository, Repository } from "typeorm";
import { User } from "../../db/entity/user.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

type LoginInfo = {
  user_id: string;
  password: string;
};

type UserInfo = {
  user_id: string;
  nickname: string;
  isActive: boolean;
};

class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async register(user: User): Promise<User> {
    user.isActive = true;
    const userInstance = this.userRepository.create(user);
    return this.userRepository.save(userInstance);
  }

  async login(data: LoginInfo): Promise<string | null> {
    const { user_id, password } = data;
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (user === null || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return jwt.sign({ id: user.id }, process.env.SECRET_KEY as string);
  }

  async resolve(token: string): Promise<UserInfo | null> {
    const data = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;

    const user = await this.userRepository.findOne({ where: { id: data.id } });

    if (user === null) {
      return null;
    }

    return {
      user_id: user.user_id,
      nickname: user.nickname,
      isActive: user.isActive,
    };
  }
}

export { AuthService };
