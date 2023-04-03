import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'
    const [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])


    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(t => t.id !==taskId)
        setTasks(updatedTasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>( 'active')

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {

        switch (filterValue) {
            case 'active':
                return tasks.filter(t => t.isDone === false)
            case 'completed':
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }


    const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    return (
        <div className='App'>
            <TodoList
                title={todoListTitle}
                tasks={tasksWhatIWantToSee}
                removeTask={removeTask}
                changeFilter={changeFilter}
                />
        </div>
    );
}


export default App;
