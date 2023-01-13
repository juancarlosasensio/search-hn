import React, { useState, useRef } from "react";
import { useHN } from "./hooks/useHN";
import "./App.css";

const App = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
  const fetchOptions = useRef({
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  });
  const [query, setQuery] = useState("");
  const { status, data, error } = useHN(query, fetchOptions.current);

  const handleSubmit = e => {
    e.preventDefault();

    const search = e.target.search.value;
    if (search) {
      setQuery(search);
      e.target.search.value = "";
    }
  };

  return (
    <div className="App">
      <header> Hackernews Search </header>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          autoComplete="off"
          name="search"
          placeholder="Search Hackernews"
        />
        <button> Search </button>
      </form>
      <main>
        {status === "idle" && (
          <div> Let's get started by searching for an article! </div>
        )}
        {status === "error" && <div>{error}</div>}
        {status === "fetching" && <div className="loading" />}
        {status === "fetched" && (
          <>
            <div className="query"> {query ? `Search results for ${query}` : 'Front page results'} </div>
            {data.length === 0 && <div> No articles found! :( </div>}
            {data.map(article => (
              <div className="article" key={article.objectID}>
                <a target="_blank" href={article.url} rel="noopener noreferrer">
                  {article.title}
                </a>{" "}
                by {article.author}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default App;