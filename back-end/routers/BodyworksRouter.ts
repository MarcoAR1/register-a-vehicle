import { PARAM_PATH_ID, PATH_INICIAL } from '../constants/constants'
import { BaseRouter } from './BaseRouter'
import * as express from 'express'
import { BodyworksMannager } from '../mannagers/BodyworksMannager'
import { BodyworkDTO } from '../models/dtos/BodyworkDTO'

export class BodyworksRouter extends BaseRouter {
  private BodyworksMannager: BodyworksMannager
  constructor() {
    super()
    this.BodyworksMannager = new BodyworksMannager()
    this.buildRoutes()
  }

  private async createBodywork(req: express.Request, res: express.Response) {
    const Bodywork = new BodyworkDTO(req.body)
    const response = await this.BodyworksMannager.createBodywork(Bodywork)

    res.status(200).json(response)
  }

  private async getBodywork(req: express.Request, res: express.Response) {
    const response = await this.BodyworksMannager.getAllBodywork()
    res.status(200).json(response)
  }

  private async updateBodywork(req: express.Request, res: express.Response) {
    const { id } = req.params
    if (isNaN(+id)) {
      return res.status(400).json({
        message: 'El id debe ser un numero',
      })
    }
    const response = await this.BodyworksMannager.updateBodywork(+id, req.body)
    res.status(200).json(response)
  }

  private async getBodyworkById(req: express.Request, res: express.Response) {
    const { id } = req.params
    if (isNaN(+id)) {
      return res.status(400).json({
        message: 'El id debe ser un numero',
      })
    }
    const response = await this.BodyworksMannager.getBodyworkById(+id)
    res.status(200).json(response)
  }

  private buildRoutes() {
    this.router.post(PATH_INICIAL, this.createBodywork.bind(this))
    this.router.put(PARAM_PATH_ID, this.updateBodywork.bind(this))
    this.router.get(PATH_INICIAL, this.getBodywork.bind(this))
    this.router.get(PARAM_PATH_ID, this.getBodyworkById.bind(this))
  }
}
