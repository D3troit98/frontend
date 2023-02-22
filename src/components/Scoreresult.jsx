import React from "react";

function Scoreresult({ score, selectedLGA, submited }) {
  if (score === 0 || !submited) {
    return (
      <div className="no-results">
        <p>
          {submited
            ? `${selectedLGA} has no score`
            : "No LGA unit has been selected"}
        </p>
      </div>
    );
  }

  return (
    <div className="party-results">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{selectedLGA}</h1>
        <div className="party-results">
          <div className="party-result">
            <h3 className="party-name">{score}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scoreresult;
