import React, {createContext, Dispatch, useReducer, useContext} from 'react'

// 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내는 것
export type Todo = {
    id: number
    text: string
    done: boolean
}

type TodosState = Todo[]

// 1.상태전용 context
const TodosStateContext = createContext<TodosState | undefined>(undefined)
// createContext의 generic을 사용하여 context에서 관리할 값의 상태를 설정 간으
// 추후 Provider를 사용하지 않을 때의 context의 값이 undefined가 되어야 하므로 위와 같이 선언

type Action = 
| {type:"CREATE"; text: string}
| {type:"TOGGLE"; id: number}
| {type:"REMOVE"; id: number}

// 2.dispatch용 context
type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined)
// Dispatch를 react패키지에서 불러와 generic으로 액션의 타입들을 넣어주면 추후 컴포넌트에서 액션을 디스패치할 때
// 액션들에 대한 타입 검사가 가능함.

function todosReducer(state:TodosState, action:Action): TodosState {
    switch (action.type) {
        case 'CREATE':
            const nextId = Math.max(...state.map(todo=>todo.id)) + 1
            // state.map으로 반환된 새 배열에 destructuring한 것
            return state.concat({
                id: nextId,
                text: action.text,
                done: false
            })
        case 'TOGGLE':
            return state.map(todo=>{
                return todo.id === action.id ? { ...todo, done: !todo.done} : todo
            })
        case 'REMOVE':
            return state.filter(todo=>todo.id!==action.id)
        default:
            throw new Error('Unhandled action')
    }
}

export function TodosContextProvider({children}: {children:React.ReactNode}) {
    const [todos, dispatch] = useReducer(todosReducer, [
        {
            id: 1,
            text: 'Context API 배우기',
            done: true
        },
        {
            id: 2,
            text: 'TypeScript 배우기',
            done: true
        },
        {
            id: 3,
            text: 'TypeScript와 Context API 함께 사용하기',
            done: false
        }
    ])
    return (
        <TodosDispatchContext.Provider value={dispatch}>
            <TodosStateContext.Provider value={todos}>
                {children}
            </TodosStateContext.Provider>
        </TodosDispatchContext.Provider>
    )
}

export function useTodoState() {
    const state = useContext(TodosStateContext)
    if(!state) throw new Error('TodosProvider not found')
    return state;
}

export function useTodoDispatch() {
    const dispatch = useContext(TodosDispatchContext);
    if(!dispatch) throw new Error('TodosProvider not found')
    return dispatch
}