import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function Character(name, level, intelligence, strength, charisma, inventory) {
  this.name = name;
  this.level = level;
  this.intelligence = intelligence;
  this.strength = strength;
  this.charisma = charisma;
  this.inventory = [];

};

let newCharacter = new Character("nick", 20, 10000, 9999999, 9999);

console.log(newCharacter);