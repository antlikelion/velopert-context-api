import React, { useState } from 'react'
import { useTodoDispatch } from '../contexts/TodoContext';


function TodoForm() {
    const [value, setValue] = useState('')
    const dispatch = useTodoDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            text: value
        })
        setValue('')
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value)
    }
    
    return (
        <form onSubmit={onSubmit}>
            <input 
            value={value} 
            placeholder="무엇을 하실 건가요?" 
            onChange={onChange} />
            <button>등록</button>
        </form>
    )
}

export default TodoForm