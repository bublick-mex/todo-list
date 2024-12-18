import React from "react";
import TodoList from "./TodoList";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import InputGroup from "./InputGroup";
import "./style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      valueTwo: "",
      todos: [],
      showOnlyUnchecked: false,
      searchQuery: "",
      selectedSeverities: [],
      selectedSeverity: "Срочно",
    };
    this.generateRandomTodos = this.generateRandomTodos.bind(this);
  }

  generateRandomTodos = () => {
    const newTodos = [];
    for (let i = 0; i < 1000; i++) {
      const todo = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Todo ${i + 1}`,
        description: `Description ${i + 1}`,
        done: Math.random() < 0.5,
        severity: ["Срочно", "Средне", "Не срочно"][Math.floor(Math.random() * 3)],
        createdAt: new Date().toLocaleString(),
      };
      newTodos.push(todo);
    }
    this.setState((prevState) => ({
      todos: [...prevState.todos, ...newTodos],
    }));
  };

  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleInputChangeTwo = (e) => {
    this.setState({ valueTwo: e.target.value });
  };

  handleTodoAdd = () => {
    const name = this.state.value.trim();
    if (name && !name.startsWith(" ") && !name.endsWith(" ")) {
      const newTodo = {
        name,
        description: this.state.valueTwo,
        checked: false,
        severity: this.state.selectedSeverity,
        createdAt: new Date().toLocaleString(),
      };
      this.setState((prevState) => ({
        value: "",
        valueTwo: "",
        todos: [newTodo, ...prevState.todos],
      }));
    }
  };

  handleTodoChecked = (index) => (e) => {
    const newTodo = { ...this.state.todos[index], done: e.target.checked };
    const newTodos = [...this.state.todos];
    newTodos[index] = newTodo;
    newTodos.sort((a, b) => {
      if (a.done && !b.done) return 1;
      if (!a.done && b.done) return -1;
      return 0;
    });
    this.setState({ todos: newTodos });
  };

  handleTodoDelete = (index) => () => {
    const newTodos = this.state.todos.filter((todo, i) => i !== index);
    this.setState({ todos: newTodos });
  };

  handleFilterChange = (e) => {
    this.setState({ showOnlyUnchecked: e.target.checked });
  };

  handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    this.setState({ searchQuery });
  };

  handleSeverityChangeInput = (severity) => {
    this.setState({ selectedSeverity: severity });
  };

  handleSeverityChangeFilter = (severity) => {
    const newSelectedSeverities = this.state.selectedSeverities.includes(severity)
      ? this.state.selectedSeverities.filter((s) => s !== severity)
      : [...this.state.selectedSeverities, severity];
    this.setState({ selectedSeverities: newSelectedSeverities });
  };

  render() {
    const filteredTodos = this.state.todos.filter((todo) => {
      if (this.state.searchQuery) {
        const searchQueryLowercase = this.state.searchQuery.toLowerCase();
        if (
          todo.name.toLowerCase().includes(searchQueryLowercase) ||
          todo.description.toLowerCase().includes(searchQueryLowercase)
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (this.state.showOnlyUnchecked && todo.done) {
        return false;
      }
      if (this.state.selectedSeverities.length > 0) {
        if (!this.state.selectedSeverities.includes(todo.severity)) {
          return false;
        }
      }
      return true;
    });

    return (
      <div className="app">
        <h2>TODO LIST</h2>
        <SearchBar
          searchQuery={this.state.searchQuery}
          handleSearchChange={this.handleSearchChange}
        />
        <div className="content">
          <Filters showOnlyUnchecked={this.state.showOnlyUnchecked}
            handleFilterChange={this.handleFilterChange}
            selectedSeverities={this.state.selectedSeverities}
            handleSeverityChangeFilter={this.handleSeverityChangeFilter}
          />
          <TodoList
            todos={filteredTodos}
            handleTodoChecked={this.handleTodoChecked}
            handleTodoDelete={this.handleTodoDelete}
            searchQuery={this.state.searchQuery}
          />
        </div>
        <InputGroup
          value={this.state.value}
          valueTwo={this.state.valueTwo}
          handleInputChange={this.handleInputChange}
          handleInputChangeTwo={this.handleInputChangeTwo}
          handleTodoAdd={this.handleTodoAdd}
          generateRandomTodos={this.generateRandomTodos}
          selectedSeverity={this.state.selectedSeverity}
          handleSeverityChangeInput={this.handleSeverityChangeInput}
        />
      </div>
    );
  }
}

export default App;