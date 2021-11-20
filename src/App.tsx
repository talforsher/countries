import { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "./constants";
import "./styles.css";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(Api.countries).then((response) => setCountries(response.data));
  }, []);

  return <div className="App">{JSON.stringify(countries)}</div>;
};

export default App;
