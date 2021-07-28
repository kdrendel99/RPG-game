import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState, levelUp, gainExp, resetExp, advance, healthChange } from "./js/MoonScapeRPG.js";


$("form#new-character").submit(function(event){
  event.preventDefault();
  const charName = $("#name").val();

  const player = storeState({ name: charName, hp: 10, level: 1, exp: 0, progress: 0});

  $("form#new-character").hide();

  function getStats(player){
    return `<ul> <li>Player name: ${charName}</li> 
    <li>Hit Points: ${player().hp}</li> 
    <li>Level: ${player().level}</li> 
    <li>Experience: ${player().exp}</li> 
    <li>Progress: ${player().progress}</li>
    </ul>`
  }


  $(".character").html(charName);
  $("#game").show();
  $(".charStats").html(getStats(player));


  $('#walk').click(function(){
    player(advance);
    console.log(player()["progress"]);
    $('.actionOutput').html("You walked 1 mile. It was uneventful.");
    $(".charStats").html(getStats(player));
  })
});
