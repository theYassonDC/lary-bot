import { AppDataSource } from "../connect";
import { Users } from "../entities/users/Users";

const userRepository = AppDataSource.getRepository(Users)
export async function createUser(id: string): Promise<any> {
  try {
    const newuser = new Users()
    newuser.user_id = id
    newuser.reputation = 1000
    await userRepository.save(newuser)
  } catch (error) {
    console.log(error)
  }
}
type MODE = "add" | "remove"
export async function updateUser(id: string, type: MODE, amount: number): Promise<any> {
  try {
    const user = await userRepository.findOne({ where: { user_id: id } })
    if (!user) {
      return 'user is null'
    }
    if (type === "add") {
      user.reputation += amount
      await userRepository.save(user)
    } else if (type === "remove") {
      user.reputation -= amount
      await userRepository.save(user)
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getUser(id: string ): Promise<any> {
  try {
    const user = await userRepository.findOne({ where: { user_id: id } })
    if (!user) {
      return false
    }
    return user
  } catch (error) {
    console.log(error)
  }
}

export async function getUsers(): Promise<Users[] | any> {
  try {
    const users = await userRepository.find()
    if (!users) {
      return false
    }
    return users
  } catch (error) {
    console.log(error)
  }
}