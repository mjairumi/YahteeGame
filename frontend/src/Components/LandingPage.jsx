import React, { useState, useEffect } from "react";
import LeaderBoard from "./LeaderBoard";
import YahtzeeGame from "./YahtzeeGame";

const LandingPage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  var flip = 0;
  const handleShowLeaderboard = () => {
    flip = 1 - flip;
    if (flip === 1) {
      setShowLeaderboard(true);
    } else {
      setShowLeaderboard(false);
    }
  };
  return (
    <>
      <div className="landing-page">
        <h1>Yahtzee</h1>
      </div>
      <div className="row row-block">
        <div className="col-xs-2 col-md-2"></div>
        <div className="col-xs-4 col-md-4">
          <button className="btn btn-secondary">Play Yahtzee</button>
        </div>

        <div className="col-xs-4 col-md-4">
          <button className="btn btn-secondary" onClick={handleShowLeaderboard}>Leaderboard</button>
        </div>
        <div className="col-xs-2 col-md-2"></div>
      </div>
      <section>
        <div className="container">
          <div className="row row-block">
            {showLeaderboard && <LeaderBoard />}
          </div>
          <div className="row row-block">
            <YahtzeeGame />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
