import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Orphanage from '../models/Orphanage'

export default {
  //
  // List all
  //
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find()

    return res.json(orphanages)
  },

  //
  // Show One
  //
  async show(req: Request, res: Response) {
    const { id } = req.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id)

    return res.json(orphanage)
  },

  //
  // Create One
  //
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    })

    await orphanagesRepository.save(orphanage)

    res.status(201).json(orphanage)
  },
}