import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState, levelUp, gainExp, resetExp, advance, healthChange, simpleDamage } from "./js/MoonScapeRPG.js";


$("form#new-character").submit(function(event){
  event.preventDefault();
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
  $(".charStats").html(getStats(player));


  $('#walk').click(function(){
    let roll = Math.floor(Math.random() * (3-1) + 1);
    if (roll === 1){
      console.log(roll);
      player(advance);
      $('.actionOutput').html("You walked 1 mile. It was uneventful.");
      $(".charStats").html(getStats(player));
    }
    else{
      console.log(roll);
      $('.actionOutput').html("As you walked, you bumped into an enemy! Quick, prepare for battle!");
      $('.enemyName').html(monster1().name);
      $('.enemyStats').html(getMonsterStats(monster1));
      $('#walk').hide();
      $('.enemy').fadeIn('slow');
    }    
  })

  $('#attack').click(function(){
    monster1(simpleDamage);
    $('.actionOutput').html("You swung your sword at the enemy. Direct hit!");
    $('.enemyName').html(monster1().name);
    $('.enemyStats').html(getMonsterStats(monster1));
  })
});
