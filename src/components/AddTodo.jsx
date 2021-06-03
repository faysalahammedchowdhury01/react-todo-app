import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiPlusCircle } from 'react-icons/bi';
import TodoContext from '../contexts/TodoContext';

function AddTodo({ space }) {
    /* Get Todos and SetTodos using ContextAPI */
    const [todos, setTodos] = useContext(TodoContext);
    /* Get Title and SetTitle */
    const [title, setTitle] = useState('');

    /* Add Todo */
    const addTodo = (e) => {
        e.preventDefault();

        if (title.trim()) {
            const newArr = [...todos];
            const createTodo = {
                id: Math.random(),
                title,
                isComplete: false,
            };
            newArr.push(createTodo);

            setTodos(newArr);

            setTitle('');

            toast.success('New Task Added!', { position: 'top-center' });
        } else {
            toast.error('Fill in the title box', { position: 'top-center' });
        }
    };

    return (
        <>
            <Toaster reverseOrder={false} />
            <div className={`add-todo ${space}`}>
                <form onSubmit={addTodo} className="flex bg-white rounded overflow-hidden">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-grow bg-transparent p-2 text-gray-800"
                        type="text"
                        placeholder="Add Todo"
                        value={title}
                    />
                    <button className="bg-red-500 py-2 px-3" type="submit">
                        <BiPlusCircle fontSize="24px" />
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddTodo;
