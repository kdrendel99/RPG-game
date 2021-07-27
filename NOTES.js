const storeState = (inputState) => {
  let currentState = inputState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const player = storeState({ name: 'Player One', hp: 10, level: 1, attack: 1, exp: 0, progress: 0});

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
const gainExp = changeState("exp")(11);
const simpleDamage = changeState("hp")(-1);
const advance = changeState("progress")(+1);

const heal = changeState("hp")(player()["level"]*5);

// const levelUpCheck = changeState("level")(() => {
//   if (player()["exp"] >= 10){
//   levelUp();
//   }
// });
const levelUpCheck = changeState("level")(compare());

function compare(){
  if (player()["exp"] >= 10){
    changeState("level")(1);
  }
  else {
    return 0; 
  }
}