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
  flags: string;
}

const App = () => {
  const [countries, setCountries] = useState<Country[] | []>([]);

  useEffect(() => {
    axios.get(Api.countries).then((response) =>
      setCountries(
        response.data.map(
          ({ name: { common: name }, flags: { svg: flag } }: Countries) => ({
            name,
            flag
          })
        )
      )
    );
  }, []);

  return <div className="App">{JSON.stringify(countries)}</div>;
};

export default App;
