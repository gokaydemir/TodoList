import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function ListArray({ items, handleValueDelete, handleUpdateItem }) {
    const [editingItemId, setEditingItemId] = useState(null);
    const [updatedValue, setUpdatedValue] = useState('');

    const handleItemDelete = (id) => {
        handleValueDelete(id);
    };

    const handleEditClick = (id, value) => {
        setEditingItemId(id);
        setUpdatedValue(value);
    };

    const handleDone = (e, id) => {
        e.preventDefault();
        handleUpdateItem(id, updatedValue);
        setEditingItemId(null);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setEditingItemId(null);
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">My Item List</h2>
            <ul className="divide-y divide-gray-200 dark:divide-blue-500">
                {items.map((item) => (
                    <li key={item.id} className="py-4">
                        <div className="flex items-center border p-3 rounded-xl border-gray-100">
                            {editingItemId === item.id ? (
                                <>
                                    <input
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                        className="block w-80 p-2 text-gray-900 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none border"
                                    />
                                    <FontAwesomeIcon
                                        className="ml-auto flex items-center cursor-pointer text-green-500"
                                        icon={faCheck}
                                        onClick={(e) => handleDone(e, item.id)}
                                    />
                                    <FontAwesomeIcon
                                        className="ml-5 cursor-pointer text-red-500"
                                        icon={faXmark}
                                        onClick={handleClose}
                                    />
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-3 text-blue-500 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-lg capitalize">{item.todo}</span>
                                    <FontAwesomeIcon
                                        onClick={() => handleEditClick(item.id, item.todo)}
                                        className="ml-auto flex items-center cursor-pointer text-green-500"
                                        icon={faPenToSquare}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => handleItemDelete(item.id)}
                                        className="ml-5 cursor-pointer text-red-500"
                                        icon={faTrash}
                                    />
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListArray;
