import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const todolistTitle_1: string = 'What to learn'
    const todolistTitle_2: string = 'What to buy'
    const task_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: 'JS/ES6&TS', isDone: true},
        {id: 3, title: 'REACT/REDUX', isDone: true}
    ]
    const task_2: Array<TaskType> = [
        {id: 4, title: "BREAD", isDone: true},
        {id: 5, title: 'WATER', isDone: true},
        {id: 6, title: 'SALT', isDone: false}
    ]
    return (
        <div className="App">
            <TodoList
                title={todolistTitle_1}
                tasks={task_1}
            />
            <TodoList
                title={todolistTitle_2}
                tasks={task_2}
            />
        </div>

    );
}

export default App;
