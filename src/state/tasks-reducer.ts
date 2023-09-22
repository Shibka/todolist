import {FilterValuesType, TasksStateType} from "../App";


// type ActionTypes =
export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case '' : {
            return state
        }
        case '': {
            return state
        }
        default:
            throw new Error('There is on such action type')
    }
}

