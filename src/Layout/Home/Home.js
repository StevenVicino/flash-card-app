import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  return (
    <div>
      <Link className="btn btn-lg btn-secondary mb-2" to="/decks/new">
        <i className="fa-solid fa-plus"></i> Create Deck
      </Link>
      <DeckList />
    </div>
  );
}

export default Home;
