import React from "react";

class SearchBar extends React.Component {
  render() {
    const { searchQuery, handleSearchChange } = this.props;
    return (
      <div className="search-bar">
        <input className="searc"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Поиск"
        />
      </div>
    );
  }
}

export default SearchBar;