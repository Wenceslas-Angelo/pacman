import { LEVEL, OBJECT_TYPE } from './setup';

// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';

// DOM elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

const startGame = () => {
  gameWin = false;
  powerPillActive = false;
  score = 0;
  startButton.classList.add('hide');
  gameBoard.createGrid(LEVEL);
  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', (e) => {
    pacman.handleKeyInput(e, gameBoard.objectExist);
  });
};

// initialize game
startButton.addEventListener('click', startGame);
