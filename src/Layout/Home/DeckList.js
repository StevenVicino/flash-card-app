import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index";
import Deck from "./Deck";

function DeckList() {
  const initialDecks = [];
  const [decks, setDecks] = useState(initialDecks);

  useEffect(() => {
    const fetchData = async () => {
      const data = await listDecks();
      setDecks(data);
    };
    fetchData();
  }, []);

  return decks.map((deck) => (
    <Deck key={deck.id} deck={deck} deckId={deck.id} />
  ));
}

export default DeckList;
