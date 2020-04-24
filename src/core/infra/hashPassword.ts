import bcrypt from "bcrypt"

export const hashUserPassword = (password: string) => bcrypt.hashSync(password, 2)
export const comparePassword = (password: string) => (hash: string) => bcrypt.compareSync(password, hash)
