import * as bcrypt from "bcrypt";

const setHash = async function setPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export { setHash };
