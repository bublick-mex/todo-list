import React from "react";

class InputGroup extends React.Component {
  render() {
    const {
      value,
      valueTwo,
      handleInputChange,
      handleInputChangeTwo,
      handleTodoAdd,
      generateRandomTodos,
      selectedSeverity,
      handleSeverityChangeInput,
    } = this.props;
    return (
      <div className="input-group">
        <textarea value={value}
          onChange={handleInputChange}
          placeholder="Введите название задачи"
        />
        <div className="input2">
          <textarea value={valueTwo}
            onChange={handleInputChangeTwo}
            placeholder="Введите описание задачи"
          />
        </div>
        <div>
          <span className="emerg">Важность:</span>
          {["Срочно", "Средне", "Не срочно"].map((severity) => (
            <button key={severity}
              onClick={() => handleSeverityChangeInput(severity)}
              className={selectedSeverity === severity ? "active" : ""}
            >
              {severity}
            </button>
          ))}
        </div>
        <div className="button-last">
          <button onClick={handleTodoAdd}>ДОБАВИТЬ</button>
          <button onClick={generateRandomTodos} style={{ height: "34px" }}>
            1000 РАНДОМНЫХ ЗАМЕТОК </button>
        </div>
      </div>
    );
  }
}

export default InputGroup;