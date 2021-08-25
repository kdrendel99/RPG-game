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
  var div = document.getElementById(prop);
  div.classList.remove(classname);
  void div.offsetWidth;
  div.classList.add(classname);
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
  //should the player be able to heal outside combat? if not, comment out like 33 below.
  $('#healbutton').show();
}

function getStats(player){
  $('.character').html(`${player().name}`);
  $('#playerHp').html(`Hit Points: ${player().hp}`);
  $('#playerHeals').html(`Available heals: ${player().heals}`);
  $('#playerLevel').html(`Level: ${player().level}`);
  $('#playerExp').html(`Experience: ${player().exp}`);
  $('#playerProgress').html(`Progress: ${player().progress}`);
}

//GET UPDATED PLAYER FUNCTION
function refreshPlayerStats(player){
  $(".charStats").html(getStats(player));
}

function playerDies(charName){
  $(".page").hide();
  $('.playerDeath').fadeIn('slow');
  $('.ripText').append(" " + charName);
  setTimeout(window.location.reload.bind(window.location), 4500);
}

function checkPlayerForDeath(thisPlayer, charName){
  if(thisPlayer.hp <= 0){
    setTimeout(() => playerDies(charName), 1100);
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
  printTerminal("You beheaded your enemy! They no longer pose a threat and you can continue advancing.");
  refreshMonsterStats(monster);
  $('.enemy').fadeOut('slow');
  showWalk();
  player(gainExp);
  rattle('playerExpRattle','classname2');
  checkExp(thisPlayer, player);
  refreshPlayerStats(player);
}

function checkProgWin(player){
  if (player.progress == 20){
    alert("Congrats! You made it to the castle and beat the game!");
  }
}

function checkExp(thisPlayer, player){
  if (thisPlayer["exp"] >= 10){
    player(levelUp);
    player(addOneHeal);
    player(resetExp);
    rattle('playerLevelUpRattle','classname2');
    rattle('playerHealRattle','classname2');
  } else {
    return player();
  }
}

function checkIfPlayerCanHeal(thisPlayer, player){
  if (thisPlayer.heals == 0){
    rattle('playerHealRattle','classname');
    alert("You're out of heals!");
  }
  else{
    player(heal(thisPlayer));
    player(removeOneHeal);
    refreshPlayerStats(player);
    rattle('playerHealRattle','classname');
    //below is green, above is red
    rattle('playerDamageRattle','classname2');
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
    rattle('playerProgressRatle','classname2');
    refreshPlayerStats(player);
    checkProgWin(thisPlayer);
  }
}
function attackRollOne(player, monster){
  monster(simpleDamage);
  printTerminal("You knicked the enemy with your sword!");
  rattle('enemyDamageRattle','classname');
  refreshMonsterStats(monster);
  refreshPlayerStats(player);
}

function attackRollTwo(player, thisPlayer){
  player(simpleDamage);
  printTerminal("You slipped while attacking, and the enemy took a swing at you! Oh no!");
  checkPlayerForDeath(thisPlayer, charName);
  rattle('playerDamageRattle','classname');
  refreshPlayerStats(player);
}

function attackRollThree(monster, thisPlayer, player){
  monster(maxDamage(thisPlayer));
  printTerminal("Critical hit! Nice shot!");
  rattle('enemyDamageRattle','classname');
  refreshMonsterStats(monster);
  refreshPlayerStats(player);
}

export {createUserCharacter, startGame, printTerminal, rattle, showAttack, showWalk, getStats, refreshPlayerStats, getMonsterStats, refreshMonsterStats, createNewRandomMonster, checkProgWin, checkExp, checkIfPlayerCanHeal, walkOrBattleRandomizer, checkPlayerForDeath, monsterDies, attackRollOne,attackRollTwo, attackRollThree};



