export function sumOfAll(dic){
  var total = 0;
  for (let key in dic){
    if (dic.hasOwnProperty(key)){
      if (key !== "Current Score"){
        total += dic[key];
      }
    }
  }
  return total
}

export function checkGameCompletion(dic){
  var counter = 0;
  for (let key in dic){
    if (dic.hasOwnProperty(key)){
      if (dic[key]){
        counter += 1;
      }
    }
  }
  if (counter === 13){
    return true;
  }
  return false;
}


export function gameLogic(s, arr){
  if (s === "Ones"){
    return countNums(arr, 1);
  }
  if (s === "Twos"){
    return countNums(arr, 2);
  }
  if (s === "Threes"){
    return countNums(arr, 3);
  }
  if (s === "Fours"){
    return countNums(arr, 4);
  }
  if (s === "Fives"){
    return countNums(arr, 5);
  }
  if (s === "Sixes"){
    return countNums(arr, 6);
  }
  if (s === "Three of a Kind"){
    return aKind(arr, 3);
  }
  if (s === "Four of a Kind"){
    return aKind(arr, 4);
  }
  if (s === "Full House"){
    return fullHouse(arr);
  }
  if (s === "Small Straight"){
    return smallStraight(arr);
  }
  if (s === "Large Straight"){
    return largeStraight(arr);
  }
  if (s === "Yahtzee"){
    return yahtzeeCheck(arr);
  }
  if (s === "Chances"){
    return chance(arr);
  }
}


function countNums(arr, x) {
  var total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      total += x;
    }
  }
  return total;
}

function chance(arr) {
  var total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

function yahtzeeCheck(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      return 0;
    }
  }
  return 5 * arr[0];
}

function largeStraight(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return 0;
    }
  }
  return 40;
}

function smallStraight(arr) {
  var checked = true;
  arr.sort(function (a, b) {
    return a - b;
  });
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      checked = false;
      break;
    }
  }
  if (checked) {
    return 30;
  } else {
    checked = true;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] !== arr[i - 1] + 1) {
      checked = false;
      break;
    }
  }
  if (checked) {
    return 30;
  }

  return 0;
}

function aKind(arr, x) {
  var counter = [0, 0, 0, 0, 0, 0, 0];
  var sum = 0;
  for (let i = 0; i < arr.length; i++) {
    counter[arr[i]] += 1;
    sum += arr[i];
  }
  
  if (counter.includes(x)) {
    return sum;
  } else {
    return 0;
  }
}

function fullHouse(arr) {
  var counter = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < arr.length; i++) {
    counter[arr[i]] += 1;
  }

  if (counter.includes(2) && counter.includes(3)) {
    return 25;
  } else {
    return 0;
  }
}



