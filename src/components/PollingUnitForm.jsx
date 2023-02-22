import React, { useState } from "react";
import axios from "axios";

export default function PollingUnitForm() {
  const [pdpScore, setPdpScore] = useState("");
  const [dppScore, setDppScore] = useState("");
  const [acnScore, setAcnScore] = useState("");
  const [ppaScore, setPpaScore] = useState("");
  const [cdcScore, setCdcScore] = useState("");
  const [jpScore, setJpScore] = useState("");
  const [polling_unit_id, setpolling_unit_id] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      polling_unit_id: polling_unit_id,
      party_scores: {
        PDP: pdpScore,
        DPP: dppScore,
        ACN: acnScore,
        PPA: ppaScore,
        CDC: cdcScore,
        JP: jpScore,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/polls/polling_units",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Polling unit data submitted successfully!");
      } else {
        alert("Failed to submit polling unit data!");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while submitting polling unit data!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pdpScore">Polling unit id</label>
        <input
          type="number"
          id="pdpScore"
          value={polling_unit_id}
          onChange={(e) => setpolling_unit_id(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pdpScore">PDP Score:</label>
        <input
          type="text"
          id="pdpScore"
          value={pdpScore}
          onChange={(e) => setPdpScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dppScore">DPP Score:</label>
        <input
          type="text"
          id="dppScore"
          value={dppScore}
          onChange={(e) => setDppScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="acnScore">ACN Score:</label>
        <input
          type="text"
          id="acnScore"
          value={acnScore}
          onChange={(e) => setAcnScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ppaScore">PPA Score:</label>
        <input
          type="text"
          id="ppaScore"
          value={ppaScore}
          onChange={(e) => setPpaScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cdcScore">CDC Score:</label>
        <input
          type="text"
          id="cdcScore"
          value={cdcScore}
          onChange={(e) => setCdcScore(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="jpScore">JP Score:</label>
        <input
          type="text"
          id="jpScore"
          value={jpScore}
          onChange={(e) => setJpScore(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
