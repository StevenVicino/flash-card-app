import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import NewDeck from "./Decks/NewDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import DeckScreen from "./Decks/DeckScreen";
import Study from "./Cards/Study";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <NewDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
