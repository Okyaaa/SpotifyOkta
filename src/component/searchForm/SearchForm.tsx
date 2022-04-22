import React, { FormEventHandler } from "react";
import "./SearchForm.css";

type Props = {
  onSearch: FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

function SearchForm(props: Props) {
  return (
    <form data-testid="form" className="searchBar" onSubmit={props.onSearch}>
      <input
        type="text"
        id="inpuText"
        data-testid="search-input"
        onChange={props.handleChange}
        placeholder="Search..."
        required
      />
      <button className="buttonSearch" type="submit" value="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
