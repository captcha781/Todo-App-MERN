import express from "express"
import * as todoCon from "../controllers/todoController"

const router = express.Router()

router.get("/",todoCon.getTodo)

router.post("/setTodo", todoCon.setTodo)

router.put("/updateTodo/:id", todoCon.updateTodo)

router.delete("/deleteTodo/:id", todoCon.deleteTodo)

export default router