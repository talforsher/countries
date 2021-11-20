import { useState, useEffect } from "react";
import axios from "axios";
import UpdateImuutably from "./utils/Immut";
import { Api } from "./constants";
import "./styles.css";
import Placeholder from "../public/PH.png";

interface Countries {
  name: { common: string };
  flags: { svg: string };
}

interface Country {
  name: string;
  flag?: string | null | undefined;
}

const App = () => {
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [lastFetched, setLastFetched] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = (itemToRefetch: string | undefined) => {
    setIsLoading(true);
    axios.get(Api.countries).then((response) => {
      const NameAndFlag: Country[] = response.data.map(
        ({ name: { common: name }, flags: { svg: flag } }: Countries) => ({
          name,
          flag
        })
      );
      const newItemData: Country | undefined = NameAndFlag.find(
        (country) => country.name === itemToRefetch
      );
      setCountries((curr) =>
        newItemData ? UpdateImuutably(curr, newItemData) : NameAndFlag
      );
      setLastFetched((curr) => curr + 1);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetch(undefined);
  }, []);

  return (
    <div className="App">
      <h1>
        Times Fetched: {isLoading || lastFetched} | {countries.length}
      </h1>
      <ul>
        {countries.map(({ name, flag }) => (
          <li className="list-item" key={name}>
            {name}
            {flag ? (
              <img className="flag" src={flag} alt={name} />
            ) : (
              <button onClick={() => fetch(name)}>
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
