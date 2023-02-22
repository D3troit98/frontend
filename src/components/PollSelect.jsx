import React, { useState, useEffect } from "react";
import axios from "axios";
import PartyResults from "./PartyResult";

function PollSelect() {
  const [pollingUnits, setPollingUnits] = useState([]);
  const [selectedPollingUnit, setSelectedPollingUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [pollingResult, setPollingResult] = useState([]);
  const [submited, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/polls/polling_units")
      .then((response) => {
        setPollingUnits(
          response.data.filter((item) => item.polling_unit_name !== "")
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);
  function handlePollingUnitChange(event) {
    setSelectedPollingUnit(event.target.value);
    setSubmitted(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submit here, such as making an API call with selectedPollingUnit
    setSubmitted(true);
    const selectedPollingUnitObj = pollingUnits.find(
      (pollingUnit) => pollingUnit.polling_unit_name === selectedPollingUnit
    );
    if (!selectedPollingUnitObj) return;
    const uniqueid = selectedPollingUnitObj.uniqueid;
    axios
      .post("http://localhost:5000/polls/polling_unit", { uniqueid })
      .then((response) => {
        setPollingResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading || pollingUnits.length < 1) {
    return <div className="polling-unit-con">Loading numbers...</div>;
  }

  return (
    <div className="polling-unit-con">
      <form onSubmit={handleSubmit}>
        <div className="polling-unit-dropdown">
          <label htmlFor="polling-unit">Polling Unit:</label>
          <select
            id="polling-unit"
            value={selectedPollingUnit}
            onChange={handlePollingUnitChange}
          >
            <option value="">Select a polling unit</option>
            {pollingUnits.map((pollingUnit) => (
              <option
                key={pollingUnit.uniqueid}
                value={pollingUnit.polling_unit_name}
              >
                {pollingUnit.polling_unit_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <PartyResults
        results={pollingResult}
        selectedPollingUnit={selectedPollingUnit}
        submited={submited}
      />
    </div>
  );
}

export default PollSelect;
