import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import TodoContext from '../contexts/TodoContext';

function Todos({ space }) {
    /* Get Todos and SetTodos using ContextAPI */
    const [todos, setTodos] = useContext(TodoContext);

    /* Toggle Complete Todo */
    const toggleComplete = (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        const newArr = [...todos];
        newArr[index].isComplete = !newArr[index].isComplete;
        setTodos(newArr);
        if (newArr[index].isComplete) {
            toast.success('Task Completed!', { position: 'bottom-center' });
        } else {
            toast.error('Incomplete Task!', { position: 'bottom-center' });
        }
    };

    /* Delete Todo */
    const deleteTodo = (index) => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this todo item!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const newArr = [...todos];
                newArr.splice(index, 1);
                setTodos(newArr);
                swal({
                    text: 'Poof! Your todo item has been deleted!',
                    icon: 'success',
                });
            }
        });
    };

    /* Edit Todo */
    const editTodo = (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        swal('Edit Todo:', {
            content: {
                element: 'input',
                attributes: {
                    defaultValue: todos[index].title,
                },
            },
            inputValue: 'input value',
            buttons: ['Cencel', 'Update'],
            dangerMode: true,
        }).then((value) => {
            if (value) {
                if (value.trim()) {
                    const newArr = [...todos];
                    newArr[index].title = value;
                    console.log(value);
                    setTodos(newArr);
                    swal({
                        text: 'Edited!',
                        icon: 'success',
                    });
                }
            }
        });
    };

    return (
        <>
            <Toaster reverseOrder={false} />
            <div
                className={`todos h-96 overflow-auto ${
                    todos.length ? null : 'grid items-center'
                } ${space}`}
            >
                {todos.length ? (
                    todos.map((todo, index) => (
                        <div
                            false
                            key={todo.id}
                            className={`todo-item flex items-center bg-white p-2 my-3 rounded ${
                                todo.isComplete ? 'bg-green-500' : 'text-gray-800'
                            }`}
                        >
                            <input
                                onClick={() => toggleComplete(todo.id)}
                                className="mr-2"
                                type="checkbox"
                                checked={todo.isComplete}
                            />
                            <div>{todo.title}</div>
                            <div className="controls ml-auto">
                                {todo.isComplete ? (
                                    ''
                                ) : (
                                    <button onClick={() => editTodo(todo.id)} type="button">
                                        <FaRegEdit fontSize="20px" className=" mr-2" />
                                    </button>
                                )}
                                <button onClick={() => deleteTodo(index)} type="button">
                                    <FaTrashAlt fontSize="20px" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center font-bold">Nothing to do!</div>
                )}
            </div>
        </>
    );
}

export default Todos;
