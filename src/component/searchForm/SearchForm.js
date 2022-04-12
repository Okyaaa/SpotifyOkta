import React from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, handleChange }) {
  return (
    <form className="searchBar" onSubmit={onSearch}>
      <input type="text" id="inpuText" onChange={handleChange} required />
      <button className="buttonSearch" type="submit" value="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
