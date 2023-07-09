import React, {ChangeEvent, ChangeEventHandler, useRef, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
}


export function TodoList(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const setTitleHandler = () => {
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ''
    //     }
    // }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }


    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        }
        const taskClasses = task.isDone ? 'task-isDone' : 'task'
        return (
            <li key={task.id}>
                <div>
                    <input type="checkbox" checked={task.isDone}
                           onChange={changeTaskStatus}/>
                    <span className={taskClasses}>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </div>
            </li>

        )
    })


    const titleMaxLenght = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLenght
    const isAddBtnDisabled: boolean = !title.length || title.length > titleMaxLenght
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'darkred'}}>Title is too long</div>
        : null
    const userMessage = error
        ? <div style={{color: 'darkred'}}>Title is required!</div>
        : null

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    const removeTodoList = () =>  props.removeTodoList(props.todoListId)

    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()

    return (

        <div className='todolist'>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    placeholder='Please, enter title'
                    value={title}
                    onChange={setTitleHandler}
                    //ref={taskTitleInput}
                    onKeyDown={addTaskOnKeyPressHandler}
                    className={error || isTitleLengthTooLong ? 'input-error' : undefined}
                />
                <button
                    disabled={isAddBtnDisabled}
                    //onClick={setTitleHandler}
                    onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
                {/*{userMessage}*/}
            </div>
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
