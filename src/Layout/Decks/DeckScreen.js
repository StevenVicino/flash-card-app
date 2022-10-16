import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck, deleteCard, readDeck } from "../../utils/api";

function DeckScreen() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const { cards } = deck;
  const history = useHistory();

  const handleDeleteDeck = async () => {
    const result = window.confirm(
      "Delete this deck?  You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deck.id);
      history.push("/");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const data = await readDeck(deckId, abortController.signal);
      setDeck(data);
    };
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  if (!deck || !cards) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <nav label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa-solid fa-house"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
            </div>
          </div>
          <div className="row justify-content-between p-2">
            <div>
              <Link
                className="btn btn-md btn-secondary p-2 mr-2"
                to={`/decks/${deckId}/edit`}
              >
                <i className="fa-solid fa-pen"></i> Edit
              </Link>
              <Link
                className="btn btn-md btn-primary mr-2"
                to={`/decks/${deckId}/study`}
              >
                <i className="fa-solid fa-book-bookmark"></i>&nbsp;Study
              </Link>
              <Link
                className="btn btn-md btn-primary mr-2"
                to={`/decks/${deckId}/cards/new`}
              >
                <i className="fa-solid fa-plus"></i>
                Add Cards
              </Link>
            </div>
            <div>
              <button
                className="btn btn-md btn-danger p-2"
                type="delete"
                onClick={handleDeleteDeck}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>

          <div className="row p-2">
            <h1>Cards</h1>
            {cards.map((card) => {
              return (
                <div
                  className="container border border-secondary rounded"
                  key={card.id}
                >
                  <div className="row">
                    <div className="col">
                      <p>{card.front}</p>
                    </div>
                    <div className="col">
                      <p>{card.back}</p>
                      <div className="row>">
                        <Link
                          className="btn btn-md btn-secondary p-2 mr-2"
                          to={`/decks/${deckId}/cards/${card.id}/edit`}
                        >
                          <i className="fa-solid fa-pen"></i>
                          Edit
                        </Link>
                        <button
                          className="btn btn-md btn-danger p-2"
                          type="delete"
                          onClick={async () => {
                            const result = window.confirm(
                              "Delete this deck?  You will not be able to recover it."
                            );
                            if (result) {
                              await deleteCard(card.id);
                              history.go(0);
                            }
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DeckScreen;
