import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import Navigation from '../components/Navigation'
import { useAppDispatch, useAppState } from '../States/Hooks'
import { CreateState, TodoItem } from "../interface"
import axios from 'axios'
import { updater, deleter } from '../States/TodoSlice'

const Index = () => {
    const state = useAppState(state => state)
    const [data, setData] = useState<CreateState>({ value: "", priority: 0 })
    const dispatch = useAppDispatch()
    const [updatation, setUpdation] = useState({})
    const [editmode, setEditmode] = useState({ mode: false, id: "" })
    const inputRef = useRef<HTMLInputElement|null>(null)
    const inputRef2 = useRef<HTMLInputElement|null>(null)

    console.log(updatation);

    const dblClickHandler = (e: MouseEvent) => {
        if(!e.currentTarget.attributes.getNamedItem("readOnly")){
            return
        }

        e.currentTarget.classList.remove("outline-none", "cursor-default")
        e.currentTarget.attributes.removeNamedItem("readOnly")
        setEditmode({ mode: true, id: e.currentTarget.id })
    }


    return (
        <div className="w-full h-screen">
            <Navigation />
            <div className="w-full h-screen flex flex-col justify-center items-center">
                {state.todo.todos ? <div className='w-10/12 md:w-1/3 lg:w-1/2 xl:w-1/3 max-h-72 space-y-3 overflow-auto my-2'>
                    {state.todo.todos.map((item: TodoItem) => {
                        return <div id={item._id} key={item._id} className="bg-white rounded-md shadow-2xl shadow-slate-300 p-1.5 flex justify-between items-center w-full">

                            <input id={item._id} readOnly className='p-1.5 w-7/12 rounded outline-none cursor-default' defaultValue={item.value} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setUpdation({ ...updatation, value: e.currentTarget.value })
                                // e.currentTarget.value = updatation
                            }} onDoubleClick={dblClickHandler} />


                            <input id={item._id} readOnly className='p-1.5 w-2/12 rounded outline-none cursor-default' defaultValue={item.priority} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setUpdation({ ...updatation, priority: Number(e.currentTarget.value) })
                                // e.currentTarget.value = updatation
                            }} onDoubleClick={dblClickHandler} />

                            {!editmode.mode ? <button className='bg-red-500 w-10 h-10 rounded-full bi bi-trash bi-lg font-bold text-white flex items-center justify-center border border-red-500 hover:bg-transparent hover:text-slate-800 active:bg-red-600 duration-200' onClick={() => {
                                axios.delete("http://localhost:5000/deleteTodo/" + item._id)
                                .then(response => {
                                    dispatch(deleter(item._id))
                                })
                                .catch(err => {
                                    console.log(err);
                                    
                                })
                            }}></button> 
                            :<></>    
                        }


                            {editmode.mode && editmode.id === item._id ? <><button className='bg-yellow-500 w-10 h-10 rounded-full bi bi-x-circle bi-lg font-bold text-white flex items-center justify-center border border-yellow-500 hover:bg-transparent hover:text-slate-800 active:bg-yellow-600 duration-200' onClick={(e:MouseEvent<HTMLButtonElement>) => {
                                setUpdation({})
                                e.currentTarget.parentNode?.children[0].setAttribute("readOnly","true")
                                e.currentTarget.parentNode?.children[0].classList.add("outline-none", "cursor-default")
                                e.currentTarget.parentNode?.children[1].setAttribute("readOnly","true")
                                e.currentTarget.parentNode?.children[1].classList.add("outline-none", "cursor-default")
                                setEditmode({ mode: false, id: "" })
                                
                            }} ></button>

                                <button className='bg-teal-500 w-10 h-10 rounded-full bi bi-send bi-lg font-bold text-white flex items-center justify-center border border-teal-500 hover:bg-transparent hover:text-slate-800 active:bg-teal-600 duration-200' onClick={(e:MouseEvent) => {
                                    axios.put("http://localhost:5000/updateTodo/" + item._id, updatation)
                                        .then(updateResponse => {
                                            // dispatch(updater(updatation))
                                            console.log(updateResponse);
                                            e.currentTarget.parentNode?.children[0].setAttribute("readOnly","true")
                                            e.currentTarget.parentNode?.children[0].classList.add("outline-none", "cursor-default")
                                            e.currentTarget.parentNode?.children[1].setAttribute("readOnly","true")
                                            e.currentTarget.parentNode?.children[1].classList.add("outline-none", "cursor-default")
                                            setEditmode({ mode: false, id: "" })
                                            setUpdation({})
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                }} ></button></> : <></>}
                        </div>
                    })
                    }
                </div> : <></>}
                <div className='p-3 w-10/12 md:w-1/3 lg:w-1/2 xl:w-1/3 bg-white rounded-md shadow-2xl shadow-slate-300'>
                    <p className='text-slate-800 text-lg font-medium'>Add Todo</p>
                    <div className='w-full flex justify-between'>
                        <input ref={inputRef} type={"text"} name={"todo"} placeholder={"Enter the task"} className={"w-7/12 p-2 bg-slate-100 focus:bg-slate-200 outline-none rounded-sm"} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setData({ ...data, value: e.target.value })
                        }} />
                        <input ref={inputRef2}  type={"number"} name={"todo"} placeholder={"Priority"} className={"w-3/12 p-2 bg-slate-100 focus:bg-slate-200 outline-none rounded-sm "} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setData({ ...data, priority: Number(e.target.value) })
                        }} />
                        <button className='bg-teal-500 w-10 h-10 rounded-full bi bi-send bi-lg font-bold text-white flex items-center justify-center border border-teal-500 hover:bg-transparent hover:text-slate-800 active:bg-teal-600 duration-200' onClick={() => {
                            axios.post("http://localhost:5000/setTodo", data)
                                .then(createResponse => {
                                    dispatch(updater(createResponse.data.response))
                                    if(inputRef.current){
                                        inputRef.current.value = ""
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }} ></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index