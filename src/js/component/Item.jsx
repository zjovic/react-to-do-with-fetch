import React, { useState } from "react";
import PropTypes from 'prop-types';

const Item = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleClick = () => {
        props.emitHandleClick(props.id);
    }

	return (
		<li onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            {props.todo}
            {isHovering && (
                <button onClick={handleClick}>x</button>
            )}
        </li>
	);
};

Item.propTypes = {
    todos: PropTypes.string,
    id: PropTypes.number,
};

export default Item;
