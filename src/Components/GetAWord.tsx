import { useState } from "react";

import { request } from "../api/gql";

const GetAWord = () => {
  const [word, setWord] = useState("");

  const fetchWord = async () => {
    const response = await request(`query {
  slug
}`);
    const data = await response.json();
    console.log("data", data.slug);
    setWord(data.data.slug);
  };

  return (
    <div>
      <h1 style={{ color: "#41f5fbf4" }}>{word}</h1>
      <button style={{ color: "#f203ffde" }} onClick={fetchWord}>
        Get Word
      </button>
    </div>
  );
};

export default GetAWord;
