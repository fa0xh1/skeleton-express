export interface IRepositoryBase<T> {
  findAll(item: T): Promise<T[]>
  findByCondition(
    expression: (value: T, index?: number, Array?: T[]) => boolean,
  ): Promise<T[]>
  create(item: T): Promise<boolean>
  update(id: string, item: T): Promise<boolean>
  delete(id: string): Promise<boolean>
}
