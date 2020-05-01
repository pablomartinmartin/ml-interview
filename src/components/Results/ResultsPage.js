import React from "react";
const ResultsPage = (props) => {
  const queryParams = new URLSearchParams(props.location.search);
  const querySearch = queryParams.get("q");

  const resultsBuilder = () => {
    const resultsComponent = querySearch ? (
      <div>
        <h1>I'm Results of {querySearch}</h1>
      </div>
    ) : (
      <div>
        <h1>No Results</h1>
      </div>
    );

    return resultsComponent;
  };

  return <div>{resultsBuilder()}</div>;
};

export default ResultsPage;
