import React, {ChangeEvent, ChangeEventHandler, useRef, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

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
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}


export function TodoList(props: TodolistPropsType) {

    const updateTaskHandler = (taskId: string, newTitle: string) => {
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
                    <Checkbox checked={task.isDone}
                              onChange={changeTaskStatus}/>
                    <EditableSpan oldTitle={task.title} callBack={(newTitle) => {
                        updateTaskHandler(task.id, newTitle)
                    }}/>
                    <IconButton aria-label="delete" onClick={removeTask}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </li>

        )
    })

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todoListId, newTitle)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    return (
        <div className='todolist'>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {tasksListItems}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    color='primary'
                    onClick={handlerCreator('all')}
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    color='success'
                    onClick={handlerCreator('active')}
                >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    color='error'
                    onClick={handlerCreator('completed')}
                >Completed
                </Button>
            </div>
        </div>
    )
}
