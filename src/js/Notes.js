
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

//REDESIGNING COMBAT TO USE DIFFERENT MONSTERS, AND INCORPORATE TURN SYSTEMS


$('#attack').click(function(){

  function playerDies(){
    $(".page").hide();
    $('.playerDeath').fadeIn('slow');
    $('.ripText').append(" " + charName);
    setTimeout(window.location.reload.bind(window.location), 4500);
  }

  function checkPlayer(){
    if(player().hp <= 0){
      setTimeout(playerDies, 1100);
    } 
  }

  function checkMonster(){
    if (monster1().hp <= 0){
      $('.actionOutput').html("You beheaded your enemy! They no longer pose a threat and you can continue advancing.");
      refreshMonsterStats(monster1);
      $('.enemy').fadeOut('slow');
      showWalk();
      player(gainExp);
      rattle('playerExpRattle','classname2');
      checkExp(player);
      refreshPlayerStats(player);
    } 
    else {
      return;
    }
  }

  $('.actionOutput').fadeOut();

  function attackRandomizer(player,monster){
    checkMonster();
    let attackRoll = Math.floor(Math.random() * (4-1) + 1);
    if (attackRoll === 1){
      monster(simpleDamage);
      $('.actionOutput').html("You knicked the enemy with your sword!");
      $('.actionOutput').fadeIn('slow');
      checkMonster();
      rattle('enemyDamageRattle','classname');
      refreshMonsterStats(monster);
      refreshPlayerStats(player);
    }
    if(attackRoll === 2){
      player(simpleDamage);
      $('.actionOutput').html("You slipped while attacking, and the enemy took a swing at you! Oh no!");
      $('.actionOutput').fadeIn('slow');
      checkPlayer();
      rattle('playerDamageRattle','classname');
      refreshPlayerStats(player);
    }
    else {
      monster(maxDamage(player()));
      $('.actionOutput').html("Critical hit! Nice shot!");
      $('.actionOutput').fadeIn('slow');
      checkMonster();
      rattle('enemyDamageRattle','classname');
      refreshMonsterStats(monster);
      refreshPlayerStats(player);
    }
    refreshMonsterStats(monster);
    refreshPlayerStats(player);
  }
  checkPlayer();
  attackRandomizer(player,monster1);
  // player(simpleDamage);
  // monster1(maxDamage(player()));
});