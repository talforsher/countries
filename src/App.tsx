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
  flag?: string | null;
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
      setCountries([{ name: "a Counry", flag: null }, ...NameAndFlag]);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {countries.map(({ name, flag }) => (
          <li className="list-item" key={name}>
            {name}
            {flag ? (
              <img className="flag" src={flag} alt={name} />
            ) : (
              <button style={{ width: "5rem" }}>refetch</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
