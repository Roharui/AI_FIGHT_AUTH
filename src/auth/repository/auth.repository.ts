import { EntityRepository, Repository } from "typeorm";
import { User } from "../../db/entity/user.entity";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository };
