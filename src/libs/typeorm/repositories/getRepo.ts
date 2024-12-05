import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../connect'

export async function getRepo(
  file: EntityTarget<ObjectLiteral>
): Promise<Repository<ObjectLiteral>> {
  return AppDataSource.getRepository(file)
}