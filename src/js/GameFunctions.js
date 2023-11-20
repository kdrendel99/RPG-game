//THIS IS WORKING AND PROPERLY ATTACHED TO MAIN.JS
import './../css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import { storeState, levelUp, gainExp, resetExp, heal, removeOneHeal, addOneHeal, advance, simpleDamage, maxDamage } from './MoonScapeRPG';

let charName = "";

function createUserCharacter(){
  $("#begin").click(function(){
    $('.rules').hide();
    $('#new-character').show();
  });
}

function startGame(characterName, player){
  $("form#new-character").hide();
  printTerminal("Welcome, traveler. You are not prepared for what's in store. Best of luck!");
  $(".character").html(characterName);
  $("#game").show();
  refreshPlayerStats(player);
  charName = characterName;
}

function printTerminal(str){
  $('.actionOutput').hide();
  $('.actionOutput').html(str);
  $('.actionOutput').fadeIn('slow');
}

function rattle(prop, classname){
  // var div = document.getElementById(prop);
  // div.classList.remove(classname);
  // void div.offsetWidth;
  // div.classList.add(classname);

  var div = document.getElementById(prop);

  div.classList.remove('heal');
  div.classList.remove('damage');

  div.classList.add(classname);
  setTimeout(() => {
    div.classList.remove(classname)
  }, 1000);
}

function showAttack(){
  $('#walk').hide();
  $('#attack').show();
  $('#healbutton').show();
}

//SWITCH TO WALK
function showWalk(){
  $('#walk').show();
  $('#attack').hide();
  //should the player be able to heal outside combat? if not, comment out below.
  $('#healbutton').show();
}

function getStats(player){
  $('.character').html(`${player().name}`);
  $('#playerHp').html(`Hit Points: ${player().hp}`);
  $('#playerHeals').html(`Available heals: ${player().heals}`);
  $('#playerLevel').html(`Level: ${player().level}`);
  $('#playerExp').html(`Experience: ${player().exp}`);
  $('#playerProgress').html(`Progress: ${player().progress}/20`);
}

//GET UPDATED PLAYER FUNCTION
function refreshPlayerStats(player){
  $(".charStats").html(getStats(player));
}

function playerDies(charName){
  $(".main").hide();
  $('.playerDeath').fadeIn('slow');
  $('.ripText').append(" " + charName);
  $('#restart').fadeIn('slow')
  setTimeout(window.location.reload.bind(window.location), 7000);
}

function playerWins(charName){
  $(".main").hide();
  $('.playerWin').fadeIn('slow');
  $('.winText').prepend(`Congrats, ${charName}! You made it to the end!`);
  setTimeout(() => $('#restart').fadeIn('slow'), 1500);
}

function checkPlayerWin(thisPlayer, charName){
  if (thisPlayer.progress >= 20){
    playerWins(charName);
  }
}

function checkPlayerForDeath(thisPlayer, charName){
  if(thisPlayer.hp <= 0){
    setTimeout(() => playerDies(charName), 1000);
  } 
}

function createNewRandomMonster(randomMonster){
  let randomLevel = Math.floor(Math.random() * (6-1) + 1);
  let monsterType = Math.floor(Math.random() * (4-1) + 1);
  let monsterHp = randomLevel * 5;
  let monsterName = "";
  let prefixDictionary = {
    1:"Weak ",
    2:"Small ",
    3:"",
    4:"Large ",
    5:"Huge "
  };
  let suffixDictionary = {
    1:"Troll",
    2:"Goblin",
    3:"Beast"
  };
  monsterName = prefixDictionary[randomLevel] + suffixDictionary[monsterType];
  let newMonster = {
    name: monsterName,
    hp: monsterHp,
    level: randomLevel
  };
  randomMonster = storeState({ name: newMonster.name, hp: newMonster.hp, level: newMonster.level});
  return randomMonster;
}

function getMonsterStats(monster){
  $('#enemyHp').html(`Hit Points: ${monster().hp}`);
  $('#enemyLevel').html(`Level: ${monster().level}`);
}
// GET UPDATED MONSTER FUNCTION
function refreshMonsterStats(monster){
  $('.enemyName').html(monster().name);
  $('.enemyStats').html(getMonsterStats(monster));
}

function monsterDies(thisPlayer, player, monster){
  let messageRoll = Math.floor(Math.random() * (4-1) + 1);
  let message = ''
  if (messageRoll === 1) message = 'You beheaded your enemy! They no longer pose a threat and you can continue advancing.'
  if (messageRoll === 2) message = 'Your foe releases a low groan, and topples to the ground defeated. Excellent work!'
  else {message = "With one final blow, your enemy is vanquished! You catch your breath, and prepare to venture onward."}

  printTerminal(message);
  refreshMonsterStats(monster);
  $('.enemy').fadeOut('slow');
  showWalk();
  player(gainExp);
  rattle('playerExpRattle','heal');
  checkExp(thisPlayer, player);
  refreshPlayerStats(player);
}

function checkExp(thisPlayer, player){
  if (thisPlayer["exp"] >= 10){
    player(levelUp);
    player(addOneHeal);
    player(resetExp);
    rattle('playerLevelUpRattle','heal');
    rattle('playerHealRattle','heal');
  } else {
    return player();
  }
}

function checkIfPlayerCanHeal(thisPlayer, player){
  if (thisPlayer.heals == 0){
    rattle('playerHealRattle','damage');
    alert("You're out of heals!");
  }
  else{
    player(heal(thisPlayer));
    player(removeOneHeal);
    refreshPlayerStats(player);
    rattle('playerHealRattle','damage');
    rattle('playerDamageRattle','heal');
  }
}

function walkOrBattleRandomizer(randomMonster, player, thisPlayer){
  let roll = Math.floor(Math.random() * (3-1) + 1);
  if (roll === 1){
    printTerminal("As you walked, you bumped into an enemy! Quick, prepare for battle!");
    refreshMonsterStats(randomMonster);
    showAttack();
    $('.enemy').fadeIn('slow');
  }
  else {
    printTerminal("You walked 1 mile. It was uneventful.");
    player(advance);
    rattle('playerProgressRatle','heal');
    refreshPlayerStats(player);
  }
}
function attackRollOne(player, monster){
  //simple damage to monster
  monster(simpleDamage);
  printTerminal("You knicked the enemy with your sword!");
  rattle('enemyDamageRattle','damage');
  refreshMonsterStats(monster);
  refreshPlayerStats(player);
}

function attackRollTwo(player, thisPlayer){
  //simple damage to player
  let messageRoll = Math.floor(Math.random() * (4-1) + 1);
  let message = ''
  if (messageRoll === 1) message = 'You missed your attack, and the enemy took a swing at you! Oh no!'
  if (messageRoll === 2) message = 'Your foe retaliated with a menacing blow. Ouch!'
  else {message = 'Your enemy was faster on the draw, and knocked you to you the ground. Think fast!'}

  player(simpleDamage);
  printTerminal(message);
  checkPlayerForDeath(thisPlayer, charName);
  rattle('playerDamageRattle','damage');
  refreshPlayerStats(player);
}

function attackRollThree(monster, thisPlayer, player){
  //critical hit to monster
  let messageRoll = Math.floor(Math.random() * (4-1) + 1);
  let message = ''
  if (messageRoll === 1) message = 'Critical hit! Nice shot!'
  if (messageRoll === 2) message = 'Your quick action dazed your foe. Quick, attack again!'
  else {message = "You delivered a substantial blow to your fiend. Don't lose your momentum! Attack!"}

  
  monster(maxDamage(thisPlayer));
  printTerminal(message);
  rattle('enemyDamageRattle','damage');
  refreshMonsterStats(monster);
  refreshPlayerStats(player);
}

export {createUserCharacter, startGame, printTerminal, rattle, showAttack, showWalk, getStats, refreshPlayerStats, getMonsterStats, refreshMonsterStats, createNewRandomMonster, checkExp, checkIfPlayerCanHeal, checkPlayerWin, walkOrBattleRandomizer, checkPlayerForDeath, monsterDies, attackRollOne,attackRollTwo, attackRollThree};



