import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    const todolistTitle_1 = 'What to learn'
    const todolistTitle_2 = 'What to buy'
    return (
        <div className="App">
            <TodoList title={todolistTitle_1}/>
            <TodoList title={todolistTitle_2}/>
        </div>

    );
}

export default App;
