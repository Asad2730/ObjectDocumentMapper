import { type Request, type Response } from 'express';
import * as mongoose from 'mongoose';
import { Post, type IPost } from '../model/post';



export const create = async (req: Request, res: Response) => {
    try {
        const post: IPost = req.body
        await Post.create(post);
        res.status(201).json('post created!')
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('user')
        res.status(200).json(posts)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}


export const getById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')
        const post = await Post.findOne(id).populate('user')
        if (!post) return res.status(404).json({ msg: 'post not found' })
        res.status(200).json(post)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}



export const updateById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        const update: IPost = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')
        const post = await Post.updateOne(id, { $set: update }, { new: true })
        if (post.modifiedCount === 0) return res.status(404).json({ msg: 'post not found' });
        res.status(200).json(post)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}



export const deleteById = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid id format')
        const post = await Post.deleteOne(id)
        if (post.deletedCount === 0) return res.status(404).json({ msg: 'post not found' })
        res.status(204).json(`Deleted post with id ${id}`)
    } catch (ex) {
        res.status(500).send({ error: ex })
    }
}