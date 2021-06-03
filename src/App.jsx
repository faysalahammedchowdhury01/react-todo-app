import { useState } from 'react';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import TodoContext from './contexts/TodoContext';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Demo 1', isComplete: false },
        { id: 2, title: 'Demo 2', isComplete: false },
        { id: 3, title: 'Demo 3', isComplete: false },
    ]);

    return (
        <div
            style={{ maxWidth: '460px' }}
            className="App mx-auto bg-gray-800 my-10 p-5 pb-4 text-white rounded"
        >
            <TodoContext.Provider value={[todos, setTodos]}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h1 className="text-center font-bold text-3xl">What's the plan for today?</h1>
                <AddTodo space="mt-8" />
                <Todos space="mt-10 mb-5" />
                <p className="text-center font-semibold">Copyright © 2021 Faysal</p>
            </TodoContext.Provider>
        </div>
    );
}

export default App;
