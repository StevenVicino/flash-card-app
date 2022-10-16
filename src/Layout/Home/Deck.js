import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function Deck({ deck, deckId }) {
  const history = useHistory();
  const handleDelete = async () => {
    const result = window.confirm(
      "Delete this deck?  You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };

  return (
    <div
      className="rounded container-fluid border border-secondary"
      key={deck.id}
    >
      <div className="row justify-content-between p-2">
        <h4>{deck.name}</h4>
        <h6>{deck.cards.length} cards</h6>
      </div>
      <div className="row">
        <p className="col">{deck.description}</p>
      </div>
      <div className="row justify-content-between p-2">
        <div>
          <Link
            className="btn btn-md btn-secondary mr-3"
            to={`/decks/${deckId}`}
          >
            <i className="fa-regular fa-eye"></i>&nbsp;View
          </Link>
          <Link
            className="btn btn-md btn-primary"
            to={`/decks/${deckId}/study`}
          >
            <i className="fa-solid fa-book-bookmark"></i>&nbsp; Study
          </Link>
        </div>
        <div>
          <button
            className="btn btn-md btn-danger p-2"
            type="delete"
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
