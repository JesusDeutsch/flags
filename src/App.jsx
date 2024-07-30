import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

function App() {
  return (
    <Router>
      <div className="flex flex-col w-full ">
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:name" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
