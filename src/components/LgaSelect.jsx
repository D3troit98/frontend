import React, { useState, useEffect } from "react";
import axios from "axios";
import Scoreresult from "./Scoreresult";
function LgaSelect() {
  const [lgaunits, setLgaunits] = useState([]);
  const [selectedLGA, setselectedLGA] = useState("");
  const [loading, setLoading] = useState(true);
  const [submited, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/polls/lga")
      .then((response) => {
        setLgaunits(response.data.filter((item) => item.lga_name !== ""));
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);
  function handlePollingUnitChange(event) {
    setselectedLGA(event.target.value);
    setSubmitted(false);
  }
  useEffect(() => {}, [score]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submit here, such as making an API call with selectedPollingUnit
    setSubmitted(true);
    const selectedPollingUnitObj = lgaunits.find(
      (pollingUnit) => pollingUnit.lga_name === selectedLGA
    );
    if (!selectedPollingUnitObj) return;
    const lga_id = selectedPollingUnitObj.lga_id;
    axios
      .post("http://localhost:5000/polls/lga", { lga_id })
      .then((response) => {
        let totalScore = 0;

        for (let i = 0; i < response.data.length; i++) {
          const announcedResults = response.data[i].announcedResults;
          for (let j = 0; j < announcedResults.length; j++) {
            totalScore += announcedResults[j].party_score;
          }
        }

        console.log("Total score:", totalScore);
        setScore(totalScore);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading || lgaunits.length < 1) {
    return <div className="polling-unit-con">Loading LGA...</div>;
  }

  return (
    <div className="polling-unit-con">
      <form onSubmit={handleSubmit}>
        <div className="polling-unit-dropdown">
          <label htmlFor="polling-unit">LGA:</label>
          <select
            id="lga-unit"
            value={selectedLGA}
            onChange={handlePollingUnitChange}
          >
            <option value="">Select a LGA</option>
            {lgaunits.map((pollingUnit) => (
              <option key={pollingUnit.lga_id} value={pollingUnit.lga_name}>
                {pollingUnit.lga_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <Scoreresult
        submited={submited}
        score={score}
        selectedLGA={selectedLGA}
      />
    </div>
  );
}

export default LgaSelect;
