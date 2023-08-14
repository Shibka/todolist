import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'


type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,

}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

type TodoListStateType = Array<TodolistType>

function App(): JSX.Element {

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


    const removeTask = (taskId: string, todoListId: string) => {
        //Первый способ
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        //Второй способ
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})

        //Todolist 1 неделя
        // const updatedTasks = tasks.filter(t => t.id !==taskId)
        // setTasks(updatedTasks)
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        //Первый способ
        // const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        //Второй способ
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

        //Todolist 1 неделя
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //Первый способ
        // const tasksForUpdate: Array<TaskType>  = tasks[todoListId]
        // const updatedTasks = [newTask, ...tasksForUpdate]
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)

        //Второй способ
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const addTodolist = (newTitle: string,) => {
        const todolistId = v1()
        let newTodo: TodolistType = {id: todolistId, title: newTitle, filter: 'all'}
        setTodoList([newTodo, ...todoLists])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodoList(todoLists.map(t => t.id === todolistId ? {...t, title} : t))
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
        )
    })
    return (
        <div className='App'>
            <AddItemForm callBack={addTodolist}
            />
            {todoListsComponents}
        </div>
    );
}


export default App;
