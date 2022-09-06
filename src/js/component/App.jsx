import React, { useState, useEffect } from 'react';
import List from './List.jsx'

const App = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);
	const [count, setCount] = useState(todos.length);

	const handleKeyDown = async (e) =>{
		if(e.key === 'Enter' && inputValue !== ''){
			const todo = inputValue;
			setTodos([...todos, todo])
			setInputValue('');
			setCount(count + 1);
		}
	}

	const handleRemoveTodo = (id) => {
		setTodos(todos => todos.filter((todo, index) => {
			return index !== id;
		}));
		setCount(count - 1);
	}

	useEffect(() => {
		setCount(todos.length);
	}, [count]);
    
	return (
		<div className="text-center">
			<h1>todos</h1>
			<input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleKeyDown} placeholder='What needs to be done' />
			<List todos={todos} removeTodo={handleRemoveTodo}/>
			<small>{count} items left</small>
		</div>
	);
};

export default App;
