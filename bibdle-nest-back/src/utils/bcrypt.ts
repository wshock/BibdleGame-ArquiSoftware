import * as bycrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const SALT = bycrypt.genSaltSync(10);
  return await bycrypt.hash(password, SALT);
};
