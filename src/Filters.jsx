import React from "react";

class Filters extends React.Component {
  render() {
    const {
      showOnlyUnchecked,
      handleFilterChange,
      selectedSeverities,
      handleSeverityChangeFilter,
    } = this.props;
    return (
      <div className="filters">
        <div className="completed">
          <input type="checkbox"
            checked={showOnlyUnchecked}
            onChange={handleFilterChange}
          />
          <span>Скрыть выполненные</span>
        </div>
        <div className="emergency">
          <span>Важность:</span>
          {["Срочно", "Средне", "Не срочно"].map((severity) => (
            <label key={severity}>
              <input type="checkbox"
                checked={selectedSeverities.includes(severity)}
                onChange={() => handleSeverityChangeFilter(severity)}
              />
              {severity}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Filters;