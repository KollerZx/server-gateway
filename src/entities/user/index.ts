import { hash } from 'bcrypt'
import { prisma } from '../../prisma'
export type UserCreate = {
  username: string,
  password: string
}
export class User {
  private constructor(private username: string, private password: string) {
  }

  static async create({ username, password }: UserCreate) {
    if (!username || !password) {
      throw new Error('username e password são obrigatórios')
    }
    const passwordHash = await hash(password, 10)
    const user = new User(username, passwordHash)
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password
      },
      select: {
        id: true,
        username: true
      }
    })

    return newUser
  }

  static async update(id: number, data: Partial<UserCreate>) {
    if (data.password) {
      data.password = await hash(data.password, 10)
    }
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        username: data.username,
        password: data.password
      },
      select: {
        id: true,
        username: true
      }
    })

    return user
  }
}