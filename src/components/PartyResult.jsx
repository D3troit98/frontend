import React from "react";

function PartyResults({ results, selectedPollingUnit, submited }) {
  if (results.length === 0 || !submited) {
    return (
      <div className="no-results">
        <p>
          {submited
            ? `${selectedPollingUnit} has no data`
            : "No polling unit has been selected"}
        </p>
      </div>
    );
  }

  return (
    <div className="party-results">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{selectedPollingUnit}</h1>
        <div className="party-results">
          {results.map((result) => (
            <div key={result.result_id} className="party-result">
              <h3 className="party-name">{result.party_abbreviation}</h3>
              <p className="party-score">{result.party_score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartyResults;
