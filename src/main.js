import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState, levelUp, gainExp, resetExp, heal, removeOneHeal, addOneHeal, advance, simpleDamage, maxDamage } from "./js/MoonScapeRPG.js";
// import { rattle, getStats, getMonsterStats, refreshMonsterStats, refreshPlayerStats } from "./js/GameFunctions.js";

$("#begin").click(function(){
  $('.rules').hide();
  $('#new-character').show();
});

$("form#new-character").submit(function(event){
  event.preventDefault();

  let randomMonster;

  function createNewRandomMonster(){
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
  }

  function printTerminal(str){
    $('.actionOutput').hide();
    $('.actionOutput').html(str);
    $('.actionOutput').fadeIn('slow');
  }

  const checkExp = (player) => {
    if (player()["exp"] >= 10){
      player(levelUp);
      player(addOneHeal);
      player(resetExp);
      rattle('playerLevelUpRattle','classname2');
      rattle('playerHealRattle','classname2');
    } else {
      return player();
    }
  };

  function rattle(prop, classname){
    var div = document.getElementById(prop);
    div.classList.remove(classname);
    void div.offsetWidth;
    div.classList.add(classname);
  }

  //GET UPDATED MONSTER FUNCTION
  function refreshMonsterStats(monster){
    $('.enemyName').html(monster().name);
    $('.enemyStats').html(getMonsterStats(monster));
  }
  //GET UPDATED PLAYER FUNCTION
  function refreshPlayerStats(player){
    $(".charStats").html(getStats(player));
  }

  function getStats(player){
    $('.character').html(`${player().name}`);
    $('#playerHp').html(`Hit Points: ${player().hp}`);
    $('#playerHeals').html(`Available heals: ${player().heals}`);
    $('#playerLevel').html(`Level: ${player().level}`);
    $('#playerExp').html(`Experience: ${player().exp}`);
    $('#playerProgress').html(`Progress: ${player().progress}`);
  }

  function getMonsterStats(monster){
    $('#enemyHp').html(`Hit Points: ${monster().hp}`);
    $('#enemyLevel').html(`Level: ${monster().level}`);
  }

  //SWITCH TO WALK
  function showWalk(){
    $('#walk').show();
    $('#attack').hide();
    //should the player be able to heal outside combat? if not, comment out like 33 below.
    $('#healbutton').show();
  }

  //SWITCH TO ATTACK
  function showAttack(){
    $('#walk').hide();
    $('#attack').show();
    $('#healbutton').show();
  }

  function checkProgWin(){
    if (player().progress == 20){
      alert("Congrats! You made it to the castle and beat the game!");
    }
  }

  //======================================GAME STARTS HERE============================================================================

  showWalk();
  createNewRandomMonster();

  const charName = $("#name").val();
  const player = storeState({ name: charName, hp: 10, heals: 3, level: 1, exp: 0, progress: 0});
  // const monster1 = storeState({ name: "Weak Troll", hp: 5, level: 1});
  // const randomMonster = storeState({ name: newRandomMonster.name, hp: newRandomMonster.hp, level: newRandomMonster.level});

  $("form#new-character").hide();
  printTerminal("Welcome, traveler. You are not prepared for what's in store. Best of luck!");
  $(".character").html(charName);
  $("#game").show();
  refreshPlayerStats(player);


  $('#healButton').click(function(){
    if (player().heals == 0){
      rattle('playerHealRattle','classname');
      alert("You're out of heals!");
    }
    else{
      player(heal(player()));
      player(removeOneHeal);
      refreshPlayerStats(player);
      rattle('playerHealRattle','classname');
      //below is green, above is red
      rattle('playerDamageRattle','classname2');
    }
  });

  $('#walk').click(function(){
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
      checkProgWin();
    }
  });

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
  
    function checkMonster(monster){
      if (monster().hp <= 0){
        printTerminal("You beheaded your enemy! They no longer pose a threat and you can continue advancing.");
        refreshMonsterStats(monster);
        $('.enemy').fadeOut('slow');
        showWalk();
        player(gainExp);
        rattle('playerExpRattle','classname2');
        checkExp(player);
        refreshPlayerStats(player);
        createNewRandomMonster();
      } 
      else {
        return;
      }
    }
  
  
    function attackRandomizer(player,monster){
      checkMonster(monster);
      let attackRoll = Math.floor(Math.random() * (4-1) + 1);
      if (attackRoll === 1){
        monster(simpleDamage);
        printTerminal("You knicked the enemy with your sword!");
        checkMonster(monster);
        rattle('enemyDamageRattle','classname');
        refreshMonsterStats(monster);
        refreshPlayerStats(player);
      }
      if(attackRoll === 2){
        player(simpleDamage);
        printTerminal("You slipped while attacking, and the enemy took a swing at you! Oh no!");
        checkPlayer();
        rattle('playerDamageRattle','classname');
        refreshPlayerStats(player);
      }
      else {
        monster(maxDamage(player()));
        printTerminal("Critical hit! Nice shot!");
        checkMonster(monster);
        rattle('enemyDamageRattle','classname');
        refreshMonsterStats(monster);
        refreshPlayerStats(player);
      }
      refreshMonsterStats(monster);
      refreshPlayerStats(player);
    }
  
    checkPlayer();
    //Below if statement checks players level, and gives them a premade easy monster ONLY the first round of combat
    // if (player().level == 1){
    //   attackRandomizer(player,monster1);
    // }
    // else{
      attackRandomizer(player,randomMonster);
    // }
    // player(simpleDamage);
    // monster1(maxDamage(player()));
  });
});