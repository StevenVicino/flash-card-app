import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function Study() {
  const history = useHistory();
  const [flip, setFlip] = useState(true);
  const [deck, setDeck] = useState([]);
  const [cardNumber, setCardNumber] = useState(1);
  const { deckId } = useParams();
  const cards = deck.cards;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchData();
  }, [deckId]);

  const handleNext = (cardsId, cardslength) => {
    if (cardsId < cardslength) {
      setCardNumber(cardNumber + 1);
      setFlip(true);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page"
        )
      ) {
        setCardNumber(1);
        setFlip(true);
      } else {
        history.push("/");
      }
    }
  };

  if (!deck.cards) {
    return <h1>Loading...</h1>;
  } else if (cards.length > 2) {
    return (
      <div>
        <nav label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa-solid fa-house"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}> {deck.name}</Link>
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        {cards.map((card, index) => {
          if (index === cardNumber - 1) {
            return (
              <div key={index}>
                <h1>Study: {deck.name}</h1>
                <div className="border border-secondary p-2 rounded">
                  <h3>
                    Card {cardNumber} of {cards.length}
                  </h3>
                  <p className="front-back">{flip ? card.front : card.back}</p>
                  <div>
                    {flip ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setFlip(!flip)}
                      >
                        Flip
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleNext(card.id, cards.length)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}> {deck.name}</Link>
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
          <i className="fa-solid fa-plus"></i> Add Cards
        </Link>
      </div>
    );
  }
}

export default Study;
