import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState, levelUp, gainExp, resetExp, heal, removeOneHeal, advance, healthChange, simpleDamage, checkExp, maxDamage } from "./js/MoonScapeRPG.js";


$("form#new-character").submit(function(event){
  event.preventDefault();

  function rattle(){
    document.getElementById('rattleDiv').className = 'classname';
  }

  $('#animate').click(function(){
    rattle();
  });



  //GET UPDATED MONSTER FUNCTION
  function refreshMonsterStats(monster){
    $('.enemyName').html(monster().name);
    $('.enemyStats').html(getMonsterStats(monster));
    console.log("updated MONSTER stats.")
  }
  //GET UPDATED PLAYER FUNCTION
  function refreshPlayerStats(player){
    $(".charStats").html(getStats(player));
    console.log("updated PLAYER stats");
  }

  //SWITCH TO WALK
  function showWalk(){
    $('#walk').show();
    $('#attack').hide();
    //should the player be able to heal outside combat? if so, uncomment below.
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
      alert("Congrats! You made it to the castle and beat the game!")
    }
  }

  showWalk();

  const charName = $("#name").val();

  const player = storeState({ name: charName, hp: 10, heals: 3, level: 1, exp: 0, progress: 0});

  const monster1 = storeState({ name: "Weak Troll", hp: 1, level: 1});

  $("form#new-character").hide();

  $('.actionOutput').html("Welcome, traveler. You are not prepared for what's in store. Best of luck!");

  $('.actionOutput').fadeIn('slow');

  function getStats(player){
    return `<ul> <li>Player name: ${player().name}</li> 
    <li>Hit Points: ${player().hp}</li> 
    <li> Available heals: ${player().heals}</li>
    <li>Level: ${player().level}</li> 
    <li>Experience: ${player().exp}</li> 
    <li>Progress: ${player().progress}</li>
    </ul>`
  }

  function getMonsterStats(monster){
    return `<ul>  
    <li>Hit Points: ${monster().hp}</li> 
    <li>Level: ${monster().level}</li> 
    </ul>`
  }


  $(".character").html(charName);
  $("#game").show();
  refreshPlayerStats(player);

  $('#healButton').click(function(){
    if (player().heals == 0){
      alert("You're out of heals!");
    }
    else{
      player(heal);
      player(removeOneHeal);
      refreshPlayerStats(player);
    }
  });

  $('#walk').click(function(){
    let roll = Math.floor(Math.random() * (3-1) + 1);
    if (roll === 1 && monster1().hp >= 0){
        $('.actionOutput').html("As you walked, you bumped into an enemy! Quick, prepare for battle!");
        refreshMonsterStats(monster1);
        showAttack();
        $('.enemy').fadeIn('slow');
      }

      else {
        player(advance);
        $('.actionOutput').html("You walked 1 mile. It was uneventful.");
        refreshPlayerStats(player);
        checkProgWin();
      }
    });

  //ATTACK

  $('#attack').click(function(){
    function playerDies(){
      // $('.actionOutput').html("YOU DIED! Beter luck next time.");
      setTimeout(function(){ $("#game").fadeOut('slow'); }, 3000);
      alert("YOU DIED! Beter luck next time.");
      location.reload()
    }

    function checkPlayer(){
      if(player().hp <= 0){
        playerDies();
      } 
    }

    function checkMonster(){
      if (monster1().hp <= 0){
        $('.actionOutput').html("You beheaded your enemy! They no longer pose a threat and you can continue advancing.");
        refreshMonsterStats(monster1);
        $('.enemy').fadeOut('slow');
        showWalk();
        player(gainExp);
        checkExp(player);
        refreshPlayerStats(player);
      } 
      else {
        return;
      }
    }


    function attackRandomizer(player,monster){
      if (monster1().hp > 0){
        let attackRoll = Math.floor(Math.random() * (4-1) + 1);
        if (attackRoll === 1){
          monster(simpleDamage);
          $('.actionOutput').html("You knicked the enemy with your sword!");
          checkMonster();
        }
        if(attackRoll === 2){
          player(simpleDamage);
          $('.actionOutput').html("You slipped while attacking, and the enemy took a swing at you! Oh no!");
          checkPlayer();
        }
        else {
          monster(maxDamage(player()));
          $('.actionOutput').html("Critical hit! Nice shot!");
          checkMonster();
        }
        refreshMonsterStats(monster);
        refreshPlayerStats(player);
      }
      else {
        checkMonster();
        $('.actionOutput').html("This monster is dead. There's nothing to do.");
        showWalk();
      }
    }
    checkPlayer();
    attackRandomizer(player,monster1);
    // player(simpleDamage);
    // monster1(maxDamage(player()));
  })
});
