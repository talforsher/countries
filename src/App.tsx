import { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "./constants";
import "./styles.css";

interface Countries {
  name: { common: string };
  flags: { svg: string };
}

interface Country {
  name: string;
  flag: string;
}

const App = () => {
  const [countries, setCountries] = useState<Country[] | []>([]);

  useEffect(() => {
    axios.get(Api.countries).then((response) => {
      const NameAndFlag: Country[] = response.data.map(
        ({ name: { common: name }, flags: { svg: flag } }: Countries) => ({
          name,
          flag
        })
      );
      setCountries(NameAndFlag);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {countries.map(({ name, flag }) => (
          <li key={name}>
            name: {name} flag: <img src={flag} alt={name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
