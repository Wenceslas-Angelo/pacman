import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
  /**
   * @param {HTMLElement} DOMGrid
   */
  constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  /**
   * @param {boolean} gameWin
   */
  showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'WIN' : 'GAME OVER'}`;
    this.DOMGrid.appendChild(div);
  }

  /**
   *@description game level
   * @param {array} level
   */
  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = '';
    this.DOMGrid.style.cssText = `
        grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
    `;

    level.forEach((square) => {
      const div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[square]);
      div.style.cssText = `
        width: ${CELL_SIZE}px;
        height: ${CELL_SIZE}px;
      `;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount += 1;
    });
  }

  /**
   *
   * @param {number} pos
   * @param {array} classes
   */
  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes);
  }

  /**
   *
   * @param {number} pos
   * @param {array} object
   */
  removeObject(pos, classes) {
    this.grid[pos].classList.remove(...classes);
  }

  /**
   *
   * @param {number} pos
   * @param {*} object
   */
  objectExist = (pos, object) => this.grid[pos].classList.contains(object);

  /**
   *
   * @param {number} pos
   * @param {number} deg
   */
  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  moveCharactere(charactere) {
    if (charactere.shouldMove()) {
      const { nextMovePos, direction } = charactere.getNextMove(
        this.objectExist
      );
      const { classesToRemove, classesToAdd } = charactere.makeMove();

      if (charactere.rotation && nextMovePos !== charactere.pos) {
        this.rotateDiv(nextMovePos, charactere.direction.rotation);
        this.rotateDiv(charactere.pos, 0);
      }

      this.removeObject(charactere.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);
      charactere.setNewPos(nextMovePos, direction);
    }
  }

  /**
   *
   * @param {HTMLElement} DOMGrid
   * @param {array} level
   */
  static createGameBoard(DOMGrid, level) {
    const board = new this(DOMGrid);
    board.createGrid(level);
    return board;
  }
}

export default GameBoard;
