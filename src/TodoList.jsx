import React from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
  render() {
    const { todos, handleTodoChecked, handleTodoDelete, searchQuery } = this.props;
    return (
      <div className="todo-list">
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, index) => (
              <Todo key={index}
                todo={todo}
                onTodoChecked={handleTodoChecked(index)}
                onTodoDelete={handleTodoDelete(index)}
              />
            ))}
          </ul>
        ) : searchQuery ? (
          <p>По вашим критериям ничего не найдено</p>
        ) : (
          <p>Добавьте задачу...</p>
        )}
      </div>
    );
  }
}

export default TodoList;