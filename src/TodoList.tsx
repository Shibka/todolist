import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


type TodolistPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}


export function TodoList(props: TodolistPropsType) {


    const tasksListItems: Array<JSX.Element> = props.tasks.map((task): JSX.Element => {

        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() =>props.removeTask(task.id)}>x</button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}