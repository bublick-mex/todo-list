import React from "react";

class Todo extends React.Component {
  render() {
    const { todo, onTodoChecked, onTodoDelete } = this.props;
    return (
      <li className={`todo-item ${todo.done ? 'checked' : ''}`}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={onTodoChecked}
          className="todo-checkbox"
        />
        <div className="todo-info">
          <div className="todo-name">{todo.name}</div>
          {todo.description && (
            <div className="todo-description">{todo.description}</div>
          )}
          <div className="todo-created-at">{todo.createdAt}</div>
          <div className="todo-severity">Важность: {todo.severity}</div>
        </div>
        <button onClick={onTodoDelete} className="todo-delete-button">
          УДАЛИТЬ
        </button>
      </li>
    );
  }
}

export default Todo;