import React from 'react'
import './TodoItem.css'
import { useTodoDispatch, Todo } from '../contexts/TodoContext';
import Dispatch from 'react';

type TodoItemProps = {
    todo: Todo
}

function TodoItem({todo}:TodoItemProps){
    const dispatch = useTodoDispatch()

    const onToggle = () => {
        dispatch({
            type: 'TOGGLE',
            id: todo.id
        })
    }
    const onRemove = () => {
        dispatch({
            type: 'REMOVE',
            id: todo.id
        })
    }
    return (
        <li className={`TodoItem ${todo.done? 'done' : ''}`}>
            <span className="text" onClick={onToggle}>{todo.text}</span>
            <span className="remove" onClick={onRemove}>(X)</span>
        </li>
    )
}

export default TodoItem