const storeState = (inputState) => {
  let currentState = inputState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

// const player = storeState({ name: 'Player One', hp: 10, level: 1, exp: 0, progress: 0});

// const player2 = storeState({ name: 'Player Two', hp: 10, level: 1, exp: 20, progress: 0});

// const monster = storeState({ name: 'lowLevelMonster', hp: 1, level: 1});

// const weakMonster = monster();

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
const gainExp = changeState("exp")(5);
const advance = changeState("progress")(+1);
const resetExp = changeState("exp")(-10);
const heal = (player) => {
  return changeState("hp")(player.level * +5);
};
const removeOneHeal = changeState("heals")(-1);
const addOneHeal = changeState("heals")(+1);

//attacking
const simpleDamage = changeState("hp")(-1);
const maxDamage = (player) => {
  return changeState("hp")(player.level * -2);
}

// const heal = changeState("hp")(player()["level"]*5);

const healthChange = (value) => {
	return changeState("hp")(value);
};


// // change level of player
// player(levelUp) 

// // add experience
// player(gainExp)

// // add progress to player
// player(advance)

// // change player health
// player(healthChange(2));

export {
  storeState, changeState, levelUp, gainExp, resetExp, heal, removeOneHeal, addOneHeal, advance, simpleDamage, maxDamage
}

