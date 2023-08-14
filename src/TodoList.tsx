import React, {ChangeEvent, ChangeEventHandler, useRef, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type TodolistPropsType = {
    todoListId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void

    changeTodoListFilter: (nextFilter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string)=> void
    updateTodolist: (todolistId: string,title: string)=> void
}


export function TodoList(props: TodolistPropsType) {

    const updateTaskHandler =(taskId: string, newTitle:string)=>{
        props.updateTask(props.todoListId, taskId, newTitle)
    }


    const tasksListItems = props.tasks.map((task: TaskType) => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        }

        const taskClasses = task.isDone ? 'task-isDone' : 'task'
        return (
            <li key={task.id} className={taskClasses}>
                <div>
                    <input type="checkbox" checked={task.isDone}
                           onChange={changeTaskStatus}/>
                    <EditableSpan oldTitle={task.title} callBack={(newTitle)=>updateTaskHandler(task.id, newTitle)}/>
                    <button onClick={removeTask}>x</button>
                </div>
            </li>

        )
    })

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const updateTodolistHandler =(newTitle: string) =>{
        props.updateTodolist(props.todoListId, newTitle)
    }
    const addTaskHandler =(title: string) =>{
        props.addTask(title,props.todoListId)
    }
    return (

        <div className='todolist'>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>

            <ul>
               {tasksListItems}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <button
                    className={props.filter === 'all' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                    onClick={handlerCreator('all')}
                >All
                </button>
                <button className={props.filter === 'active' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                        onClick={handlerCreator('active')}
                >Active
                </button>
                <button className={props.filter === 'completed' ? 'filter-btn filter-btn-active' : 'filter-btn'}
                        onClick={handlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    )
}
