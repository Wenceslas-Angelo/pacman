import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
  /**
   *
   * @param {number} speed
   * @param {number} startPos
   */
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.direction = null;
    this.timer = 0;
    this.powerPill = false;
    this.ritation = true;
  }

  shouldMove() {
    if (!this.direction) return false;
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer += 1;
    return null;
  }

  getNextMove(objectExist) {
    let nextMovePos = this.pos + this.direction.movement;
    const wallIsExist = objectExist(nextMovePos, OBJECT_TYPE.WALL);
    const ghostLairIsExist = objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR);
    if (wallIsExist || ghostLairIsExist) {
      nextMovePos = this.pos;
    }
    return { nextMovePos, direction: this.direction };
  }

  // makeMove() {
  //   const classesToRemove = [OBJECT_TYPE.PACMAN];
  //   const classesToAdd = [OBJECT_TYPE.PACMAN];
  //   return { classesToRemove, classesToAdd };
  // }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handleKeyInput(e, objectExist) {
    let dir;
    if (e.key >= 37 && e.key <= 40) {
      dir = DIRECTIONS[e.key];
    } else {
      return;
    }
    const nextMovePos = this.pos + dir.movement;
    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
    this.direction = dir;
  }
}

export default Pacman;
