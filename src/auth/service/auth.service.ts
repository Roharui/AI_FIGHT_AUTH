import { getRepository, Repository } from "typeorm";
import { User } from "../../db/entity/user.entity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

type LoginInfo = {
  user_id: string;
  password: string;
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
}

export { AuthService };
