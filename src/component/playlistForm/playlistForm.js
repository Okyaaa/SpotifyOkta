import React from "react";
import "./PlaylistForm.css";

function PlaylistForm({ onCreate, handleChangeDesc, handleChangeTitle }) {
  return (
    <form className="form" onSubmit={onCreate}>
      <div className="form-text">
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChangeTitle}
            minLength={10}
            required
          />
        </label>
        <br />
      </div>
      <div className="form-text">
        <label htmlFor="description">
          Description
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChangeDesc}
            required
          />
        </label>
        <br />
      </div>
      <button type="submit" value="submit">
        Create playlist
      </button>
    </form>
  );
}

export default PlaylistForm;
