import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );

        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountryDetails();
  }, [name]);

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

  if (!country) {
    return <div>Cargando...</div>;
  }

  return (
    

    <div className={`flex flex-col  w-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : ' text-black'}`}>
      
      
      
      
      
      <div className={`flex  justify-between items-center  p-4 border-b transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-[#edf2f7] text-gray-800'} `}>
        <p className="text-xl">Where in the world?</p>
        <button 
          onClick={() => setDarkMode(prevMode => !prevMode)}
          className={`p-2 rounded transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-[#edf2f7] text-gray-800'}`}
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>



    <div className="ml-10">
      <button 
        onClick={() => navigate(-1)} 
        className="mt-4 mb-4 px-4 py-2 bg-[#edf2f7] text-black rounded hover:bg-gray-300 font-bold"
      >
        Back
      </button>
      </div>






      <div className="flex items-center justify-center gap-8">
      <img src={country.flags.png} className="w-[500px] h-[300px]" alt={`Bandera de ${country.name.common}`} />
      <div>
      <h1>{country.name.common}</h1>
      <p>
        <strong>Nombre en idioma nativo:</strong>{" "}
        {Object.values(country.name.nativeName)
          .map((n) => n.common)
          .join(", ")}
      </p>
      <p>
        <strong>Población:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Región:</strong> {country.region}
      </p>
      <p>
        <strong>Subregión:</strong> {country.subregion}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Monedas:</strong>{" "}
        {Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")}
      </p>
      <p>
        <strong>Idiomas:</strong> {Object.values(country.languages).join(", ")}
      </p>
      <p>
        <strong>Países con los que hace frontera:</strong>{" "}
        {country.borders ? (
          country.borders.map((border, index) => (
            <span key={border}>
              <Link to={`/country/${border}`} className="text-blue-500 hover:underline">
                {border}
              </Link>
              {index < country.borders.length - 1 ? ", " : ""}
            </span>
          ))
        ) : (
          "N/A"
        )}
        
      </p>
      </div>
    </div>
    </div>

  );
}

export default CountryDetails;
