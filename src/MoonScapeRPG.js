const storeState = (inputState) => {
  let currentState = inputState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const player = storeState({ name: 'Player One', hp: 10, level: 1, attack: 1, exp: 0});

//changes the given property of the object
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// these all work
const levelUp = changeState("level")(1);
const gainExp = changeState("exp")(1);
const simpleDamage = changeState("hp")(-1);

// // ????
// const healthChange = changeState("hp");
// const damage = (damagePts) => healthChange(-damagePts);
// const heal = (healPts) => healthChange(healPts);


// change level of player
player(levelUp) 

// add experience
player(gainExp)