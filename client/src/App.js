import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
    </BrowserRouter>
  );
}

export default App;
