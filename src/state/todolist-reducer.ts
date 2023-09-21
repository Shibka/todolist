import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
export type UpdateTodolistActionType = {
    type: 'UPDATE-TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string
}

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | UpdateTodolistActionType
    | ChangeTodolistFilter
export const todolistReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            let newTodo: TodolistType = {id: action.todoListId, title: action.title, filter: 'all'}
            return [...state,newTodo]
        }
        case "UPDATE-TODOLIST":{
            return state.map(t=> t.id === action.todoListId? {...t, title: action.title}: t)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(t=> t.id === action.todoListId? {...t, filter:action.filter}: t)
        }
        default:
            throw new Error('There is on such action type')
    }
}


export const RemoveTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todoListId}as const
}
export const AddTodolistAC = (title: string, todoListId: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todoListId}as const
}
export const UpdateTodolistAC= ( todoListId: string, title: string): UpdateTodolistActionType => {
    return {type: "UPDATE-TODOLIST", todoListId, title}as const
}
export const ChangeTodolistFilter =( filter: FilterValuesType, todoListId: string):ChangeTodolistFilter=>{
    return {type: "CHANGE-TODOLIST-FILTER", filter, todoListId} as const
}