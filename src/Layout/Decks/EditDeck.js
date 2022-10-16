import React, { useState, useEffect } from "react";
import DeckForm from "../Forms/DeckForm";
import { readDeck, updateDeck } from "../../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const data = await readDeck(deckId, abortController.signal);
      setFormData(() => data);
    };
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  async function handleEditDeck(event) {
    event.preventDefault();
    const result = await updateDeck(formData);
    history.push(`/decks/${result.id}`);
  }

  if (!formData) {
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
              <Link to={`/decks/${deckId}`}>{formData.name}</Link>
            </li>
            <li className="breadcrumb-item">Edit Deck</li>
          </ol>
        </nav>
        <DeckForm
          cardTitle="Edit Deck"
          onSubmit={handleEditDeck}
          onCancel={() => history.push(`/decks/${deckId}`)}
          submitLabel="Submit"
          cancelLabel="Cancel"
          formData={formData}
          setFormData={setFormData}
          placeHolderName={formData.name}
          placeHolderDescription={formData.description}
        />
      </div>
    );
  }
}

export default EditDeck;
