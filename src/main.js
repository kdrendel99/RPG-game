import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState } from "./js/MoonScapeRPG.js";
import {createUserCharacter, startGame, showWalk,refreshPlayerStats, refreshMonsterStats, createNewRandomMonster, checkIfPlayerCanHeal, checkPlayerWin, walkOrBattleRandomizer, checkPlayerForDeath, monsterDies, attackRollOne,attackRollTwo, attackRollThree} from './js/GameFunctions';


createUserCharacter();
$("form#new-character").submit(function(event){
  event.preventDefault();
  let newRandomMonster;
  let randomMonster;
  const charName = $("#name").val();
  const player = storeState({ name: charName, hp: 10, heals: 3, level: 1, exp: 0, progress: 0});
  showWalk();
  randomMonster = createNewRandomMonster(newRandomMonster);
  startGame(charName, player);
  $('#restart').click(() => location.reload());
  $('#healButton').click(() => checkIfPlayerCanHeal(player(), player));
  $('#walk').click(() => {
    checkPlayerWin(player(), charName);
    walkOrBattleRandomizer(randomMonster, player, player());
    checkPlayerWin(player(), charName);
  });
  
  $('#attack').click(function(){
  
    function checkMonsterForDeath(monster){
      if (monster().hp <= 0){
        monsterDies(player(), player, monster);
        randomMonster = createNewRandomMonster(newRandomMonster);
      }
    }

    function attackRandomizer(player,monster){
      checkMonsterForDeath(monster);
      let attackRoll = Math.floor(Math.random() * (4-1) + 1);
      //simple damage to enemy
      if (attackRoll === 1){
        attackRollOne(player, monster);
      }
      //simple damage to player
      if(attackRoll === 2){
        attackRollTwo(player, player());
      }
      // critical hit to enemy
      else {
        attackRollThree(monster, player(), player);
      }
      checkPlayerForDeath(player(), charName);
      checkMonsterForDeath(monster);
      refreshMonsterStats(monster);
      refreshPlayerStats(player);
    }
  
    checkPlayerForDeath(player(), charName);
    attackRandomizer(player,randomMonster);
  });
});
