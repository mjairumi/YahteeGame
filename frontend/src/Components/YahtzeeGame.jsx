import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  gameLogic,
  checkGameCompletion,
  sumOfAll,
} from "../utilities/GameLogic";
const YahtzeeGame = () => {
  const [nums, setNums] = useState([0, 0, 0, 0, 0]);
  const [isFrozen, setFrozen] = useState([false, false, false, false, false]);
  const handleButtonClick = (e) => {
    const newFrozen = [...isFrozen];
    newFrozen[e] = !newFrozen[e];
    setFrozen(newFrozen);
  };
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [validPick, setValidPick] = useState(true);
  const [rolls, setRolls] = useState(3);
  const [score, setScore] = useState({
    Ones: 0,
    Twos: 0,
    Threes: 0,
    Fours: 0,
    Fives: 0,
    Sixes: 0,
    "Three of a Kind": 0,
    "Four of a Kind": 0,
    "Full House": 0,
    "Small Straight": 0,
    "Large Straight": 0,
    Yahtzee: 0,
    Chances: 0,
    "Current Score": 0,
  });
  const [check, setCheck] = useState({
    Ones: false,
    Twos: false,
    Threes: false,
    Fours: false,
    Fives: false,
    Sixes: false,
    "Three of a Kind": false,
    "Four of a Kind": false,
    "Full House": false,
    "Small Straight": false,
    "Large Straight": false,
    Yahtzee: false,
    Chances: false,
    "Current Score": false,
  });

  const generateRandom = () => {
    const newNums = [...nums];
    for (let i = 0; i < 5; i++) {
      if (!isFrozen[i]) {
        newNums[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
    setNums(newNums);
  };
  const rollDice = () => {
    setValidPick(true);
    if (rolls > 0) {
      const newRolls = rolls - 1;
      setRolls(newRolls);
      generateRandom();
    } else {
      return;
    }
  };
  const handleGameCompletion = () => {};
  const handlePick = (e) => {
    if (validPick) {
      const newCheck = { ...check };
      newCheck[e] = true;
      const newScore = { ...score };
      newScore[e] = gameLogic(e, nums);
      newScore["Current Score"] = sumOfAll(newScore);
      const newisGameCompleted = checkGameCompletion(check);
      const newFrozen = [false, false, false, false, false];
      setFrozen(newFrozen);
      setCheck(newCheck);
      setScore(newScore);
      setRolls(3);
      setValidPick(false);
      setNums([0, 0, 0, 0, 0]);
      setIsGameCompleted(newisGameCompleted);
      if (isGameCompleted) {
        handleGameCompletion();
      }
    }
  };
  return (
    <>
      <div className="row row-block mrg-bt">
        <div className="num-box">
          {nums.map((num, index) => {
            return (
              <div
                key={index}
                className="box font-big"
                style={{
                  backgroundColor: isFrozen[index] ? "#eb9898" : "white",
                }}
                onClick={() => handleButtonClick(index)}
              >
                {num}
              </div>
            );
          })}
          {/* <div
            className="box font-big"
            style={{ color: isFrozen[0] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(0)}
          >
            {nums[0]}
          </div>

          <div
            className="box font-big"
            style={{ color: isFrozen[1] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(1)}
          >
            {nums[1]}
          </div>
          <div
            className="box font-big"
            style={{ color: isFrozen[2] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(2)}
          >
            {nums[2]}
          </div>
          <div
            className="box font-big"
            style={{ color: isFrozen[3] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(3)}
          >
            {nums[3]}
          </div>
          <div
            className="box font-big"
            style={{ color: isFrozen[4] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(4)}
          >
            {nums[4]}
          </div> */}
        </div>
      </div>

      <div className="row row-block mrg-bt">
        <div className="col-12">
          <button className="btn btn-secondary" onClick={rollDice}>
            Roll Dice {rolls}
          </button>
        </div>
      </div>
      <div className="row row-block mrg-bt flex-dis">
        {["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes","Three of a Kind","Four of a Kind","Full House","Small Straight","Large Straight","Yahtzee","Chances"].map(
          (s, index) => {
            return (
              <div key={index} className="col-xs-6 col-md-6">
                <button 
                  className="col-xs-12 btn btn-secondary"
                  style={{ color: check[s] ? "lightgreen" : "white" }}
                  onClick={
                    check[s]
                      ? () => {}
                      : () => {
                          handlePick(s);
                        }
                  }
                >
                  {s}: {check[s] ? score[s] : ""}
                </button>
              </div>
            );
          }
        )}
        
        
        
        <div className="col-xs-6 col-md-6">
          Current Score: {score["Current Score"]}
        </div>
      </div>
    </>
  );
};

export default YahtzeeGame;
