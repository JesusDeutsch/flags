import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
      <div className={`flex justify-between items-center w-full p-4 border-b transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#edf2f7] text-black'}`}>
        <p className="text-xl">Where in the world?</p>
        <button 
          onClick={() => setDarkMode(prevMode => !prevMode)}
          className={`p-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`mb-4 p-2 border rounded transition-colors duration-300 ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'}`}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className={`border p-4 rounded transition-colors duration-300 ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}>
            <img
              className="w-[300px] border rounded"
              src={country.flags.png}
              alt={`Bandera de ${country.name.common}`}
            />
            <h2 className="text-xl font-bold">{country.name.common}</h2>
            <p>Población: {country.population}</p>
            <p>Región: {country.region}</p>
            <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
            <Link to={`/country/${country.name.common}`}>
              <button className={`border rounded-md p-2 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-gray-200' : 'border-black text-black'}`}>
                More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
