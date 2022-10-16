import React, { useState, useEffect } from "react";
import CardForm from "../Forms/CardForm";
import { readDeck, createCard } from "../../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function AddCard() {
  const blankCard = { front: "", back: "" };
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState(blankCard);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(() => data);
    };
    fetchData();
  }, [deckId]);

  async function handleCreateCard(event) {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(blankCard);
    history.push(`/decks/${deckId}/cards/new`);
  }
  if (!deck) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <nav label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa-solid fa-house"></i>&nbsp; Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item">Add Card</li>
          </ol>
        </nav>
        <CardForm
          cardTitle={`${deck.name}: Add Card`}
          onSubmit={handleCreateCard}
          onCancel={() => history.push(`/decks/${deckId}`)}
          submitLabel="Save"
          cancelLabel="Done"
          formData={formData}
          setFormData={setFormData}
          placeHolderFront="Front side of card"
          placeHolderBack="Back side of card"
        />
      </div>
    );
  }
}

export default AddCard;
