import { DIRECTIONS, OBJECT_TYPE } from './setup';

class Ghost {
  constructor(startPos, movement, name, speed) {
    this.name = name;
    this.movement = movement;
    this.startPos = startPos;
    this.pos = startPos;
    this.direction = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  shouldMove() {
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer += 1;
    return false;
  }

  getNextMove(objectExist) {
    const { nextMovePos, direction } = this.movement(
      this.pos,
      this.direction,
      objectExist
    );
    return { nextMovePos, direction };
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];
    if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];
    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovPos, direction) {
    this.pos = nextMovPos;
    this.direction = direction;
  }
}

export default Ghost;
