import { type Request, type Response } from 'express';
import { User, type IUser } from '../model/user';
import * as mongoose from 'mongoose';



export const create = async(req: Request, res: Response) => {
    try{
     const user:IUser = req.body
     await User.create(user)
     res.status(201).json('user created!')
    }catch(ex){
        res.status(500).send({error:ex})
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}


export const getById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')

        const user = await User.findOne(id)
        if (!user) return res.status(404).json({ msg: 'user not found' })

        res.status(200).json(user)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}



export const updateById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        const update: IUser = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')

        const user = await User.updateOne(id, { $set: update }, { new: true })

        if (user.modifiedCount === 0) return res.status(404).json({ msg: 'User not found' });
        return res.json(200).send(user)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}



export const deleteById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')

        const user = await User.deleteOne(id)
        if (user.deletedCount === 0) return res.status(404).json({ msg: 'user not found' })
        res.status(204).json(`Deleted user with id ${id}`)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}