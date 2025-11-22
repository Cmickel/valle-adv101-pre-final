"use client";
import Head from 'next/head';
import { useState, useMemo } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Tabs from '../components/Tabs';
import SearchBar from '../components/SearchBar';

const initialTodos = [
  { id: Date.now() + 1, text: 'Plan NEXT.js architecture', completed: true },
  { id: Date.now() + 2, text: 'Implement all CRUD features', completed: false },
  { id: Date.now() + 3, text: 'Deploy to Vercel and submit', completed: false },
];

export default function HomePage() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all'); // 'all', 'todo', 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  // --- CRUD Operations ---

  // Create (5pts)
  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  // Update (5pts)
  const updateTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  // Delete (5pts)
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Mark as complete/done (5pts)
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // --- Filtering & Searching (5pts + 5pts) ---

  const finalTodos = useMemo(() => {
    // 1. Apply the tab filter
    let filtered = todos.filter((todo) => {
      if (filter === 'todo' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      return true;
    });

    // 2. Apply the search filter
    if (searchTerm.trim() !== '') {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    return filtered;
  }, [todos, filter, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Cmickel To-Do App</title>
        <meta name="description" content="Cmickel's simple To-Do app built with Next.js" />
      </Head>
      <div className="w-[56vw] h-[82vh] mx-auto p-12 bg-white shadow-2xl rounded-2xl flex flex-col">
        <h1 className="text-5xl font-bold text-center text-indigo-700 mb-6 flex-none">
          Cmickel To-Do App
        </h1>

        {/* CREATE Component */}
        <TodoForm addTodo={addTodo} />

        <div className="mt-8 space-y-4">
          {/* TABS Component */}
          <Tabs currentFilter={filter} setFilter={setFilter} />

          {/* SEARCH Component */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="border-t pt-4">
            {/* LIST Component */}
            {finalTodos.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No tasks found for the current filters.</p>
            )}
            <TodoList
              todos={finalTodos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}