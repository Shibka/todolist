import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {
    AddTodolistAC,
    ChangeTodolistFilter,
    RemoveTodolistAC,
    todolistReducer,
    UpdateTodolistAC
} from "./state/todolist-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'


export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,

}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}



function App(): JSX.Element {

    const todoListId_1 = v1();
    const todoListId_2 = v1()

    const [todoLists, dispatchTodolist] = useReducer(todolistReducer, [
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


    const removeTask = (taskId: string, todoListId: string) => {

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchTodolist(ChangeTodolistFilter(filter, todolistId))
    }
    const removeTodoList = (todoListId: string) => {
        dispatchTodolist(RemoveTodolistAC(todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        dispatchTodolist(AddTodolistAC(newTitle, newTodolistId))
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchTodolist(UpdateTodolistAC(todolistId, title))
    }
    const getTasksForMe = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks = getTasksForMe(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper elevation={3} style={{padding: '15px'}}>
                    <TodoList
                        key={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        todoListId={tl.id}
                        tasks={filteredTasks}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}

                        changeTodoListFilter={changeTodoListFilter}
                        removeTodoList={removeTodoList}

                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className='App'>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '25px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid
                    container
                    spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
