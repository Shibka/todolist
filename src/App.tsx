import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'


type TodolistType ={
    id: string,
    title: string,
    filter: FilterValuesType,

}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

type TodoListStateType = Array<TodolistType>
function App(): JSX.Element  {

    const todoListId_1 = v1();
    const todoListId_2 = v1()

    const [todoLists, setTodoList] = useState<TodoListStateType>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT & REDUX", isDone: false},
        ],
        [todoListId_2]: [
        {id: v1(), title: "MILK", isDone: true},
        {id: v1(), title: "BREAD", isDone: true},
        {id: v1(), title: "MEAT", isDone: false}
    ]
    })











//BLL:

    // const todoListTitle: string = 'What to learn'
    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    // ])


    const removeTask = (taskId: string, todoListId:string) => {
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.filter(t=> t.id !== taskId)

        //
        // const updatedTasks = tasks.filter(t => t.id !==taskId)
        // setTasks(updatedTasks)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) =>{
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }


    // const [filter, setFilter] = useState<FilterValuesType>( 'all')

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {

        switch (filterValue) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    return (
        <div className='App'>
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={tasksWhatIWantToSee}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                />
        </div>
    );
}


export default App;
