import React, { useState, useEffect } from "react";
import axios from "axios";
import { gameLogic, checkGameCompletion, sumOfAll } from "../utilities/GameLogic";
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
    "Ones": 0,
    "Twos": 0,
    "Threes": 0,
    "Fours": 0,
    "Fives": 0,
    "Sixes": 0,
    "Three of a Kind": 0,
    "Four of a Kind": 0,
    "Full House": 0,
    "Small Straight": 0,
    "Large Straight": 0,
    "Yahtzee": 0,
    "Chances": 0,
    "Current Score": 0,
  });
  const [check, setCheck] = useState({
    "Ones": false,
    "Twos": false,
    "Threes": false,
    "Fours": false,
    "Fives": false,
    "Sixes": false,
    "Three of a Kind": false,
    "Four of a Kind": false,
    "Full House": false,
    "Small Straight": false,
    "Large Straight": false,
    "Yahtzee": false,
    "Chances": false,
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
  const handleGameCompletion = () => {
    
  }
  const handlePick = (e) => {
    if (validPick) {
      const newCheck = { ...check };
      newCheck[e] = true;
      const newScore = { ...score };
      newScore[e] = gameLogic(e, nums);
      newScore["Current Score"] = sumOfAll(newScore);
      const newisGameCompleted = checkGameCompletion(check);
      setCheck(newCheck);
      setScore(newScore);
      setRolls(3);
      setValidPick(false);
      setIsGameCompleted(newisGameCompleted);
      if (isGameCompleted){
        handleGameCompletion();
      }

    }
  };
  return (
    <>
      <div className="row row-block mrg-bt">
        <div className="num-box">
          <div
            className="box font-big"
            style={{ backgroundColor: isFrozen[0] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(0)}
          >
            {nums[0]}
          </div>

          <div
            className="box font-big"
            style={{ backgroundColor: isFrozen[1] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(1)}
          >
            {nums[1]}
          </div>
          <div
            className="box font-big"
            style={{ backgroundColor: isFrozen[2] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(2)}
          >
            {nums[2]}
          </div>
          <div
            className="box font-big"
            style={{ backgroundColor: isFrozen[3] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(3)}
          >
            {nums[3]}
          </div>
          <div
            className="box font-big"
            style={{ backgroundColor: isFrozen[4] ? "#eb9898" : "white" }}
            onClick={() => handleButtonClick(4)}
          >
            {nums[4]}
          </div>
        </div>
      </div>

      <div className="row row-block mrg-bt">
        <div className="col-12">
          <button onClick={rollDice}>Roll Dice {rolls}</button>
        </div>
      </div>
      <div className="row row-block mrg-bt flex-dis">
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Ones"] ? "grey" : "aqua" }}
          onClick={
            check["Ones"]
              ? () => {}
              : () => {
                  handlePick("Ones");
                }
          }
        >
          Ones: {check["Ones"] ? score["Ones"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Twos"] ? "grey" : "aqua" }}
          onClick={
            check["Twos"]
              ? () => {}
              : () => {
                  handlePick("Twos");
                }
          }
        >
          Twos: {check["Twos"] ? score["Twos"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Threes"] ? "grey" : "aqua" }}
          onClick={
            check["Threes"]
              ? () => {}
              : () => {
                  handlePick("Threes");
                }
          }
        >
          Threes: {check["Threes"] ? score["Threes"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Fours"] ? "grey" : "aqua" }}
          onClick={
            check["Fours"]
              ? () => {}
              : () => {
                  handlePick("Fours");
                }
          }
        >
          Fours: {check["Fours"] ? score["Fours"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Fives"] ? "grey" : "aqua" }}
          onClick={
            check["Fives"]
              ? () => {}
              : () => {
                  handlePick("Fives");
                }
          }
        >
          Fives: {check["Fives"] ? score["Fives"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Sixes"] ? "grey" : "aqua" }}
          onClick={
            check["Sixes"]
              ? () => {}
              : () => {
                  handlePick("Sixes");
                }
          }
        >
          Sixes: {check["Sixes"] ? score["Sixes"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{
            backgroundColor: check["Three of a Kind"] ? "grey" : "aqua",
          }}
          onClick={
            check["Three of a Kind"]
              ? () => {}
              : () => {
                  handlePick("Three of a Kind");
                }
          }
        >
          Three of a Kind:{" "}
          {check["Three of a Kind"] ? score["Three of a Kind"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Four of a Kind"] ? "grey" : "aqua" }}
          onClick={
            check["Four of a Kind"]
              ? () => {}
              : () => {
                  handlePick("Four of a Kind");
                }
          }
        >
          Four of a Kind:{" "}
          {check["Four of a Kind"] ? score["Four of a Kind"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Full House"] ? "grey" : "aqua" }}
          onClick={
            check["Full House"]
              ? () => {}
              : () => {
                  handlePick("Full House");
                }
          }
        >
          Full House: {check["Full House"] ? score["Full House"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Small Straight"] ? "grey" : "aqua" }}
          onClick={
            check["Small Straight"]
              ? () => {}
              : () => {
                  handlePick("Small Straight");
                }
          }
        >
          Small Straight:{" "}
          {check["Small Straight"] ? score["Small Straight"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Large Straight"] ? "grey" : "aqua" }}
          onClick={
            check["Large Straight"]
              ? () => {}
              : () => {
                  handlePick("Large Straight");
                }
          }
        >
          Large Straight:{" "}
          {check["Large Straight"] ? score["Large Straight"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Yahtzee"] ? "grey" : "aqua" }}
          onClick={
            check["Yahtzee"]
              ? () => {}
              : () => {
                  handlePick("Yahtzee");
                }
          }
        >
          Yahtzee: {check["Yahtzee"] ? score["Yahtzee"] : ""}
        </div>
        <div
          className="col-xs-3 col-md-3"
          style={{ backgroundColor: check["Chances"] ? "grey" : "aqua" }}
          onClick={
            check["Chances"]
              ? () => {}
              : () => {
                  handlePick("Chances");
                }
          }
        >
          Chances: {check["Chances"] ? score["Chances"] : ""}
        </div>
        <div className="col-xs-3 col-md-3">
          Current Score: {score["Current Score"]}
        </div>
      </div>
    </>
  );
};

export default YahtzeeGame;
