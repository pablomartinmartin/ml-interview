import React from "react";
import "./Nav.scss";

import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";

export default function Nav() {
  return (
    <nav className="nav-search">
      <img src={logo} alt="Logo" className="nav-search__logo" />
      <input
        type="text"
        placeholder="Nunca dejes de buscar"
        maxLength="100"
        autoFocus
      />
      <button>
        <img src={search} alt="Search" />
      </button>
    </nav>
  );
}
