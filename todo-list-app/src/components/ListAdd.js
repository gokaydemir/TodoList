import React, { useState, useEffect } from 'react';
import ListArray from './ListArray';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function ListAdd() {


    const [newTodo, setNewTodo] = useState('');
    const [todoList, setTodoList] = useState([]);

    // Api den veri çekip ekrana basmak için kullanıyorum
    useEffect(() => {
        axios.get('http://localhost:3004/tasks')
            .then(response => {
                setTodoList(response.data)
            })
            .catch(function (error) {

                console.log(error);
            });

    }, []);

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTodo.trim() !== '') {

            // uuidv4 kütüphanesi kullanmamın sebebi benzersiz bir id oluşturması ve işlem yaparken hata oluşmaması için.
            const newItem = { todo: newTodo, id: uuidv4() };

            // Api ye veri göndermek için kullanıyorum
            axios.post('http://localhost:3004/tasks', newItem)
                .then(response => {
                    setTodoList([...todoList, newItem]);
                    setNewTodo('');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleItemDelete = (id) => {

        // Api'deki veriyi silmek için kullanıyorum
        axios.delete(`http://localhost:3004/tasks/${id}`)
            .then(response => {
                const updatedList = todoList.filter(item => item.id !== id);
                setTodoList(updatedList);
            })
            .catch(function (error) {
                console.log(error);
            })

    };

    const handleItemUpdate = (id, value) => {

        const updatedItem = { id, todo: value };

        // Api'deki veriyi güncellemek için kullanıyorum
        axios.put(`http://localhost:3004/tasks/${id}`, updatedItem)
            .then(response => {
                const updatedList = todoList.map(item => {
                    if (item.id === id) {
                        return updatedItem;
                    }
                    return item;
                });
                setTodoList(updatedList);
            })
            .catch(function (error) {
                console.log(error);
            })

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-full sm:w-1/3 mx-auto mb-5 flex">
                    <span className="inline-flex items-center px-3 text-sm text-blue-800 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                            <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </span>
                    <input value={newTodo} placeholder={"Add New Item"} onChange={handleInputChange} type="text" id="small-input" className="block w-full p-2 text-gray-900 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none border" />
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 dark:bg-blue-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                </div>
            </form>
            <ListArray items={todoList} handleValueDelete={handleItemDelete} handleUpdateItem={handleItemUpdate} />
        </div>
    );
}

export default ListAdd;
