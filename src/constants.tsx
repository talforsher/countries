interface API {
  countries: string;
}

const Api: API = {
  countries: "https://restcountries.com/v3.1/all"
};

const Placeholder = "../public/PH.png";

export { Api, Placeholder };
