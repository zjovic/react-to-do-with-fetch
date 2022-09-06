import React from "react";
import PropTypes from 'prop-types';
import Item from './Item.jsx'

const List = (props) => {
    const emitHandleClick = (id) => {
        props.removeTodo(id)
    }

    const todos = props.todos.map((todo, index) =>
        <Item key={index} id={index} todo={todo} emitHandleClick={emitHandleClick}/>
    );

	return (
        <ul>
            {todos}
        </ul>
	);
};

List.propTypes = {
    todos: PropTypes.array
};

export default List;
