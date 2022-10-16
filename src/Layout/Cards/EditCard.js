import React, { useState, useEffect } from "react";
import CardForm from "../Forms/CardForm";
import { readCard, readDeck, updateCard } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function EditCard() {
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await readDeck(deckId);
      setDeck(() => data);
    };
    fetchData();
  }, [deckId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readCard(cardId);
      setFormData(() => data);
    };
    fetchData();
  }, [cardId]);

  async function handleUpdateCard(event) {
    event.preventDefault();
    await updateCard(formData);
    history.push(`/decks/${deckId}`);
  }

  if (!deck || !formData) {
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}> {`Deck ${deck.name}`}</Link>
            </li>
            <li className="breadcrumb-item">{`Edit Card ${cardId}`}</li>
          </ol>
        </nav>
        <CardForm
          cardTitle="Edit Card"
          onSubmit={handleUpdateCard}
          onCancel={() => history.go(-1)}
          submitLabel="Save"
          cancelLabel="Cancel"
          formData={formData}
          setFormData={setFormData}
          placeHolderFront={formData.front}
          placeHolderBack={formData.back}
        />
      </div>
    );
  }
}

export default EditCard;
