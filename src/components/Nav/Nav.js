import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";

import "./Nav.scss";

const Nav = (props) => {
  const [query, setQuery] = useState('');

  const queryParams = new URLSearchParams(props.location.search);
  const querySearch = queryParams.get('search');

  useEffect(() => {
    if (querySearch) {
      setQuery(querySearch);
    }
  }, [querySearch]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    props.history.push({
      pathname: '/items',
      search: `?search=${query}`,
    });
  };

  return (
    <nav className="nav-search">
      <img src={logo} alt="Logo" className="nav-search__logo" />
      <form name="search-form" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          name="searchField"
          placeholder="Nunca dejes de buscar"
          maxLength="100"
          autoFocus
          className="nav-search__field"
          onChange={(e) => setQuery(e.target.value)}
          defaultValue={query || ""}
        />
        <button type="submit" className="nav-search__button">
          <img src={search} alt="Search" />
        </button>
      </form>
    </nav>
  );
};

export default withRouter(Nav);
