import React, { useState, useEffect } from 'react';
import List from './List.jsx'

const App = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);
	const [count, setCount] = useState(todos.length);
	const [initialLoad, setInitialLoad] = useState(true);

	const user = 'zjovic';

	const handleKeyDown = async (e) =>{
		if(e.key === 'Enter' && inputValue !== ''){
			const todo = inputValue;
			setTodos([...todos, todo])
			setInputValue('');
		}
	};

	const updateToDos = async () => {
		await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "PUT",
			body: JSON.stringify(todos.map((todo) => {
				return {
					label: todo,
					done: false
				}
			})),
			headers: {
			  "Content-Type": "application/json"
			}
	});
	}

	const handleRemoveTodo = (id) => {
		setTodos(todos => todos.filter((todo, index) => {
			return index !== id;
		}));
	};

	const initialRequest = async () => {
		await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
				  "Content-Type": "application/json"
				}
		});

		const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		});

		const data = await response.json();

		setTodos([...todos, ...data.map(({ label }) => label)]);

	};

    useEffect(() => {
        if(initialLoad) {
            initialRequest();
			setInitialLoad(false);
        }
    }, []);

	useEffect(() => {
		updateToDos();
		setCount(todos.length);
    }, [todos]);
    
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
