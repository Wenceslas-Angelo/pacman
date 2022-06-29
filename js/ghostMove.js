import { DIRECTIONS, OBJECT_TYPE } from './setup';

function randomMovement(position, direction, objectExist) {
  let dir = direction;
  let nextMovePos = position + dir.movement;

  const keys = Object.keys(DIRECTIONS);

  let wallIsExist = objectExist(nextMovePos, OBJECT_TYPE.WALL);
  let ghostIsExist = objectExist(nextMovePos, OBJECT_TYPE.GHOST);
  while (wallIsExist || ghostIsExist) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    dir = DIRECTIONS[key];
    nextMovePos = position + dir.movement;
    wallIsExist = objectExist(nextMovePos, OBJECT_TYPE.WALL);
    ghostIsExist = objectExist(nextMovePos, OBJECT_TYPE.GHOST);
  }

  return { nextMovePos, direction: dir };
}

export default randomMovement;
