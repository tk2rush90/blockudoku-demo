import {RandomUtil} from '@tk-ui/utils/random.util';

export type Board = [
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
  [number, number, number, number, number, number, number, number, number],
];

export class GameUtil {
  /**
   * Create the initial board state.
   */
  static getInitialBoard(): Board {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  /**
   * Create the random block.
   */
  static createBlock(): number[][] {
    const rand = RandomUtil.number(0, 35);

    switch (rand) {
      case 0: {
        return [
          [1],
        ];
      }

      case 1: {
        return [
          [1, 1],
        ];
      }

      case 2: {
        return [
          [1, 1, 1],
        ];
      }

      case 3: {
        return [
          [1, 1, 1, 1],
        ];
      }

      case 4: {
        return [
          [1, 1, 1, 1, 1],
        ];
      }

      case 5: {
        return [
          [1],
          [1],
        ];
      }

      case 6: {
        return [
          [1],
          [1],
          [1],
        ];
      }

      case 7: {
        return [
          [1],
          [1],
          [1],
          [1],
        ];
      }

      case 8: {
        return [
          [1],
          [1],
          [1],
          [1],
          [1],
        ];
      }

      case 9: {
        return [
          [1, 0],
          [1, 1],
          [1, 0],
        ];
      }

      case 10: {
        return [
          [0, 1],
          [1, 1],
          [0, 1],
        ];
      }

      case 11: {
        return [
          [0, 1, 0],
          [1, 1, 1],
        ];
      }

      case 12: {
        return [
          [1, 1, 1],
          [0, 1, 0],
        ];
      }

      case 13: {
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0],
        ];
      }

      case 14: {
        return [
          [1, 1],
          [1, 1],
        ];
      }

      case 15: {
        return [
          [1, 0],
          [1, 0],
          [1, 1],
        ];
      }

      case 16: {
        return [
          [0, 0, 1],
          [1, 1, 1],
        ];
      }

      case 17: {
        return [
          [1, 1],
          [0, 1],
          [0, 1],
        ];
      }

      case 18: {
        return [
          [1, 1, 1],
          [1, 0, 0],
        ];
      }

      case 19: {
        return [
          [0, 1],
          [0, 1],
          [1, 1],
        ];
      }

      case 20: {
        return [
          [1, 1, 1],
          [0, 0, 1],
        ];
      }

      case 21: {
        return [
          [1, 1],
          [1, 0],
          [1, 0],
        ];
      }

      case 22: {
        return [
          [1, 0, 0],
          [1, 1, 1],
        ];
      }

      case 23: {
        return [
          [1, 1],
          [1, 0],
          [1, 1],
        ];
      }

      case 24: {
        return [
          [1, 0, 1],
          [1, 1, 1],
        ];
      }

      case 25: {
        return [
          [1, 1],
          [0, 1],
          [1, 1],
        ];
      }

      case 26: {
        return [
          [1, 1, 1],
          [1, 0, 1],
        ];
      }

      case 27: {
        return [
          [1, 0],
          [0, 1],
        ];
      }

      case 28: {
        return [
          [0, 1],
          [1, 0],
        ];
      }

      case 29: {
        return [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ];
      }

      case 30: {
        return [
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
        ];
      }

      case 31: {
        return [
          [1, 0],
          [1, 1],
        ];
      }

      case 32: {
        return [
          [0, 1],
          [1, 1],
        ];
      }

      case 33: {
        return [
          [1, 1],
          [0, 1],
        ];
      }

      case 34: {
        return [
          [1, 1],
          [1, 0],
        ];
      }

      default: {
        throw new Error('Invalid block code');
      }
    }
  }
}
