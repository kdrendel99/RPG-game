
//ORIGINAL FUNCTION
function randomMonsterGenerator(){
  let randomLevel = Math.floor(Math.random() * (6-1) + 1);
  let monsterType = Math.floor(Math.random() * (4-1) + 1);
  let monsterHp = randomLevel * 5;
  monsterName = namePrefix = nameSuffix = "";
    if (randomLevel == 1){
      namePrefix = "Weak ";
    }
    if (randomLevel == 2){
      namePrefix = "Small ";
    }
    if (randomLevel == 3){
      namePrefix = "";
    }
    if (randomLevel == 4){
      namePrefix = "Large ";
    }
    if (randomLevel == 5){
      namePrefix = "Huge ";
    }
  if (monsterType == 1){
    nameSuffix = "Troll";
  }
  if (monsterType == 2){
    nameSuffix = "Goblin";
  }
  if (monsterType == 3){
    nameSuffix = "Beast";
  }
  monsterName = namePrefix + nameSuffix;
  const randomMonster = {
    name: monsterName,
    hp: monsterHp,
    level: randomLevel
  }
  console.log(randomMonster);
};


//////SAME FUNCTION JUST USING SWITCH STATEMENTS

function randomMonsterGenerator(){
  let randomLevel = Math.floor(Math.random() * (6-1) + 1);
  let monsterType = Math.floor(Math.random() * (4-1) + 1);
  let monsterHp = randomLevel * 5;
  monsterName = namePrefix = nameSuffix = "";
  switch (randomLevel){
    case 1:
      namePrefix = "Weak "
      break
    case 2:
      namePrefix = "Small "
      break
    case 3:
      namePrefix = ""
      break
    case 4:
      namePrefix = "Large "
      break
    case 5:
      namePrefix = "Huge "
      break
  }
  switch (monsterType){
    case 1:
      nameSuffix = "Troll"
      break
    case 2:
      nameSuffix = "Goblin"
      break
    case 3:
      nameSuffix = "Beast"
      break
  }
  monsterName = namePrefix + nameSuffix;
  const randomMonster = {
    name: monsterName,
    hp: monsterHp,
    level: randomLevel
  }
  return randomMonster;
};

//DRY UP FUNCTION USING AN ARRAY TO HOLD VALUES LIKE A DICTIONARY
function randomMonsterGenerator(){
  let randomLevel = Math.floor(Math.random() * (6-1) + 1);
  let monsterType = Math.floor(Math.random() * (4-1) + 1);
  let monsterHp = randomLevel * 5;
  monsterName = "";
  prefixDictionary = {
    1:"Weak ",
    2:"Small ",
    3:"",
    4:"Large ",
    5:"Huge "
  }
  suffixDictionary = {
    1:"Troll",
    2:"Goblin",
    3:"Beast"
  }
  monsterName = prefixDictionary[randomLevel] + suffixDictionary[monsterType];
  const randomMonster = {
    name: monsterName,
    hp: monsterHp,
    level: randomLevel
  }
  return randomMonster;
};