import { InsideDTO } from '../dtos/InsideDTO'
import { BaseModel } from './BaseModel'
import { PgType } from '../../db'
import { IInside } from '../interface/IInside'
import { INSIDE } from '../../constants/constants'

export default class Inside extends BaseModel {
  public DB: PgType
  public tableName: string
  public static tableName = INSIDE
  public static columnsProperties: { [key: string]: string } = {
    id: 'SERIAL NOT NULL PRIMARY KEY',
    asiento_conductor: 'INTEGER DEFAULT 0',
    asiento_acompañante: 'INTEGER DEFAULT 0',
    techo: 'INTEGER DEFAULT 0',
    maletero: 'INTEGER DEFAULT 0',
    car_id: 'INTEGER REFERENCES car(id) ON DELETE CASCADE UNIQUE',
  }

  constructor() {
    super()
    this.DB = BaseModel.DB()
    this.tableName = Inside.tableName
  }

  public static async initModel(): Promise<void> {
    await this.getQueryCreateTable(this.columnsProperties, this.tableName)
  }

  public async create(data: InsideDTO): Promise<InsideDTO> {
    const res = await this.save(data, this.tableName)
    return new InsideDTO(res)
  }

  public async getAll(): Promise<InsideDTO[]> {
    const res: IInside[] = await this.findAll({
      tableName: this.tableName,
    })
    return res.map((e) => new InsideDTO(e))
  }

  public async getById(id: number): Promise<InsideDTO> {
    const res = await this.findOne({ id }, this.tableName)
    return new InsideDTO(res)
  }

  public async update(id: number, data: InsideDTO): Promise<InsideDTO> {
    const res = await this.saveChange({ id, data, tableName: this.tableName })
    return new InsideDTO(res)
  }

  public async getByCar_id(car_id: number): Promise<InsideDTO> {
    const res = await this.findOne({ car_id }, this.tableName)
    return new InsideDTO(res)
  }
}
export const columnsProperties = Inside.columnsProperties
