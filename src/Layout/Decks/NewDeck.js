import React, { useState } from "react";
import DeckForm from "../Forms/DeckForm";
import { createDeck } from "../../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function NewDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  async function handleCreateDeck(event) {
    event.preventDefault();
    const result = await createDeck(formData);
    history.push(`/decks/${result.id}`);
  }
  return (
    <div>
      <nav label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <DeckForm
        deckTitle="Create Deck"
        onSubmit={handleCreateDeck}
        onCancel={() => history.push("/")}
        submitLabel="Save"
        cancelLabel="Cancel"
        formData={formData}
        setFormData={setFormData}
        placeHolderName="Deck Name"
        placeHolderDescription="Brief description of deck"
      />
    </div>
  );
}

export default NewDeck;
