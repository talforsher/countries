import { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "./constants";
import "./styles.css";
import Placeholder from "../public/PH.png";

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

  const fetch = () => {
    axios.get(Api.countries).then((response) => {
      const NameAndFlag: Country[] = response.data.map(
        ({ name: { common: name }, flags: { svg: flag } }: Countries) => ({
          name,
          flag
        })
      );
      setCountries((curr) => [
        ...curr,
        { name: "a Counry", flag: null },
        ...NameAndFlag
      ]);
    });
  };

  useEffect(() => {
    fetch();
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
              <button onClick={fetch}>
                <img className="flag" src={Placeholder} alt={name} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
