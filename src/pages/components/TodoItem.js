'use client';
import { useState } from 'react';

export default function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleUpdate = () => {
    if (newText.trim() && newText !== todo.text) {
      updateTodo(todo.id, newText);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm transition duration-150 hover:shadow-md">
      {/* Checkbox (Mark as complete/done) */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
      />

      {/* Task Text / Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleUpdate();
          }}
          className="flex-grow mx-4 p-1 border-b border-indigo-400 focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow mx-4 text-gray-800 ${
            todo.completed ? 'line-through text-gray-500 italic' : ''
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-500 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50"
            title="Edit Task"
          >
            {/* SVG for Pencil Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-5.464 5.464a1 1 0 000 1.414l7 7A1 1 0 0017 16V13.5l-7-7-1.414 1.414z" />
            </svg>
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
          title="Delete Task"
        >
            {/* SVG for Trash Can Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 100 2v6a1 1 0 100-2V8z" clipRule="evenodd" />
            </svg>
        </button>
      </div>
    </li>
  );
}