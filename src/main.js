import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { storeState } from "./js/MoonScapeRPG.js";
import {createUserCharacter, startGame, showWalk,refreshPlayerStats, refreshMonsterStats, createNewRandomMonster, checkIfPlayerCanHeal, walkOrBattleRandomizer, checkPlayerForDeath, monsterDies, attackRollOne,attackRollTwo, attackRollThree} from './js/GameFunctions';

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
  $('#healButton').click(() => checkIfPlayerCanHeal(player(), player));
  $('#walk').click(() => walkOrBattleRandomizer(randomMonster, player, player()));
  
  $('#attack').click(function(){
  
    function checkMonsterForDeath(monster){
      if (monster().hp <= 0){
        monsterDies(player(), player, monster);
        randomMonster = createNewRandomMonster(newRandomMonster);
      }
      else {
        return;
      }
    }

    function attackRandomizer(player,monster){
      checkMonsterForDeath(monster);
      let attackRoll = Math.floor(Math.random() * (4-1) + 1);
      if (attackRoll === 1){
        attackRollOne(player, monster);
        checkMonsterForDeath(monster);
      }
      if(attackRoll === 2){
        attackRollTwo(player, player());
        checkMonsterForDeath(monster);
      }
      else {
        attackRollThree(monster, player(), player);
        checkMonsterForDeath(monster);
      }
      refreshMonsterStats(monster);
      refreshPlayerStats(player);
    }
  
    checkPlayerForDeath(player(), charName);
    attackRandomizer(player,randomMonster);
  });
});
