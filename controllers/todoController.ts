import { Request, Response } from "express";
import mongoose, { Mongoose, MongooseError, UpdateQuery } from "mongoose";
import { TodoList } from "../interface";
import TodoModel from "../models/TodoModel"
interface reque {
    value: string
}

const todoList:TodoList[] = []

export const getTodo = (req:Request,res:Response) => {
    TodoModel.find({})
    .then((getResponse) => {
        res.json({todo:getResponse})
    })
    .catch((err) => {
        res.json({message: "Some error occured"})
    })
}

export const setTodo = (req:Request, res:Response) => {

    TodoModel.create({_id:new mongoose.Types.ObjectId,value:req.body.value})
    .then((insertResponse) => {
        res.json({message: "New todo inserted successfully!...", response:insertResponse})
    })
    .catch((err:MongooseError) => {
        res.json({message:"some error occured", error:err.message})
    })

}

export const updateTodo = (req:Request, res:Response) => {
    let id = req.params.id
    TodoModel.updateOne({_id: id},{value: req.body.value})
    .then((updateResponse) => {
        res.json({message:"Updated successfully", response: updateResponse})
    })
    .catch((err:MongooseError) => {
        res.json({message:err.message, name:err.name})
    })
}

export const deleteTodo = (req:Request, res:Response) => {
    let id = req.params.id
    TodoModel.deleteOne({_id:id})
    .then((deleteResponse) => {
        res.json({message:"Deleted successfully", response: deleteResponse})
    })
    .catch((err:MongooseError) => {
        res.json({todo: todoList, message: "Item deleted successfully"})
    })
}