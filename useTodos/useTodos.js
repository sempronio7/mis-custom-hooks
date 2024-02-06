import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = [
    {
        id: new Date().getTime(),
        description: 'Recolectar la piedra del alma',
        done: false
    },
    {
        id: new Date().getTime() + 1,
        description: 'Recolectar la piedra del tiempo',
        done: false
    },
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [] //el parse es el opuesto al stringify
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToogleTodo = (id) => {
        dispatch({
            type: '[TODO] Toogle Todo',
            payload: id
        })
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToogleTodo,
        todosCount: todos.length,
        todosPendingCount: todos.filter(todo => !todo.done).length
    }
}
