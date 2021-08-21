import React, {useState} from 'react';

import './todo-list-item.css';

const TodoListItem = (props) => {

	let ItemStyle = 'todo-list-item'
	if (props.done) {
		ItemStyle += ' done';
	}
	if(props.important) {
		ItemStyle += ' important';
	}


	return (
		<div className={ItemStyle}>
      <div className="todo-list-item-label"
            onClick={props.onToggleDone}
      >
        {props.label}
      </div>
			<div className="buttons">
				 <button type="button"
				         className="btn btn-outline-success btn-sm float-right"
				         onClick={props.onToggleImportant}
				 >
        <i className="fa fa-exclamation" />
				 </button>

	      <button type="button"
	              className="btn btn-outline-danger btn-sm float-right"
	              onClick={props.onDeleted}>
	        <i className="fa fa-trash-o" />
	      </button>
			</div>
    </div>
	);
};

export default TodoListItem;
