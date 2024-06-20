import * as mongoose from 'mongoose';
import type { IUser } from './user';


export interface IPost extends mongoose.Document{
    title:string
    content:string
    author:IUser['_id']
}


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author : {type:mongoose.Schema.Types.ObjectId,ref:'user',require:true}
})


export const Post = mongoose.model<IPost>('post',PostSchema)