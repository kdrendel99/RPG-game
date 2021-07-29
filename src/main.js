import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState, levelUp, gainExp, resetExp, advance, healthChange, simpleDamage, checkExp } from "./js/MoonScapeRPG.js";


$("form#new-character").submit(function(event){
  event.preventDefault();

  //GET UPDATED MONSTER FUNCTION
  function refreshMonsterStats(monster){
    $('.enemyName').html(monster().name);
    $('.enemyStats').html(getMonsterStats(monster));
    console.log("updated MONSTER stats.")
  }

  function refreshPlayerStats(player){
    $(".charStats").html(getStats(player));
    console.log("updated PLAYER stats");
  }

  const charName = $("#name").val();

  const player = storeState({ name: charName, hp: 10, level: 1, exp: 0, progress: 0});

  const monster1 = storeState({ name: "Weak Troll", hp: 10, level: 1});

  $("form#new-character").hide();

  $('.actionOutput').html("Welcome, traveler. You are not prepared for what's in store. Best of luck!");

  $('.actionOutput').fadeIn('slow');

  function getStats(player){
    return `<ul> <li>Player name: ${player().name}</li> 
    <li>Hit Points: ${player().hp}</li> 
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


  $('#walk').click(function(){
    let roll = Math.floor(Math.random() * (3-1) + 1);
    if (roll === 1){
      console.log(roll);
      // [lbl] <Continue_Walking>
      player(advance);
      $('.actionOutput').html("You walked 1 mile. It was uneventful.");
      refreshPlayerStats(player);
    }
    else{
      // if (monster1().hp === 0){
      //   goto <Continue_Walking>
      // }
      $('.actionOutput').html("As you walked, you bumped into an enemy! Quick, prepare for battle!");
      refreshMonsterStats(monster1);
      $('#walk').hide();
      $('.enemy').fadeIn('slow');
      $('#attack').show();
    }    
  })

  $('#attack').click(function(){
    if (monster1().hp === 0){
      $('.actionOutput').html("You beheaded your enemy! They no longer pose a threat and you can continue advancing.");
      refreshMonsterStats(monster1);
      $('.enemy').fadeOut('slow');
      $('#attack').hide();
      $('#walk').show();
      player(gainExp);
      checkExp(player);
      refreshPlayerStats(player);
    } 
    else {
      monster1(simpleDamage);
      $('.actionOutput').html("You swung your sword at the enemy. Direct hit!");
      refreshMonsterStats(monster1);
    }
  })
});
