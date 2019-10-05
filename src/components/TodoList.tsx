import React from 'react';
import TodoItem from './TodoItem';
import { useTodoState } from '../contexts/TodoContext';

function TodoList() {
    const todos = useTodoState();
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
                // 반복되는 엘리먼트를 구분하기 위해 key값 필요
            ))}
        </ul>
    )
}

export default TodoList