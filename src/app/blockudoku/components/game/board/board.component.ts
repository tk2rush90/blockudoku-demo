import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {BlockComponent} from '@blockudoku/components/game/block/block.component';
import {MathUtil} from '@tk-ui/utils/math.util';
import {NumberLike} from '@tk-ui/others/types';
import {ParsingUtil} from '@tk-ui/utils/parsing.util';
import {GameUtil} from '@blockudoku/utils/game.util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class BoardComponent implements OnInit {
  // Combo counts.
  @Input() comboCounts = 0;

  // Emitter to increase the points.
  @Output() increasePoint: EventEmitter<{ points: number, combos: number }> = new EventEmitter<{ points: number, combos: number }>();

  // Board block list.
  @ViewChildren('block') blockList!: QueryList<ElementRef<HTMLElement>>;

  // The game board.
  board = GameUtil.getInitialBoard();

  // The blocks that contain dragging block.
  containingBlocks: ElementRef<HTMLElement>[] = [];

  constructor(
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Track the block by index.
   * @param index Block index.
   */
  trackByBlock(index: number): number {
    return index;
  }

  checkTheBoard(): void {
    this._fillTheBoard();
  }

  checkTheBlockPosition(block: BlockComponent): void {
    this.containingBlocks = [];

    const blocks = block.blockList.filter(item => item.nativeElement.classList.contains('fill'));
    const checkableBlocks = this.blockList.filter(item => !item.nativeElement.classList.contains('fill'));

    blocks.forEach(_block => {
      const _blockRect = _block.nativeElement.getBoundingClientRect();

      checkableBlocks.forEach(__block => {
        const __blockRect = __block.nativeElement.getBoundingClientRect();

        this.renderer.removeClass(__block.nativeElement, 'contain');

        if (MathUtil.rectMostlyContainsRect(__blockRect, _blockRect)) {
          this.containingBlocks.push(__block);
        }
      });
    });

    if (blocks.length === this.containingBlocks.length) {
      this.containingBlocks.forEach(item => this.renderer.addClass(item.nativeElement, 'contain'));
    } else {
      this.containingBlocks = [];
    }
  }

  removeTheRemovables(): void {
    // 0
    // [0, 0], [0, 1], [0, 2]
    // [1, 0], [1, 1], [1, 2],
    // [2, 0], [2, 1], [2, 2],

    // 1
    // [0, 3], [0, 4], [0, 5],
    // [1, 3], [1, 4], [1, 5],
    // [2, 3], [2, 4], [2, 5],

    // 2
    // [0, 6], [0, 7], [0, 8],
    // [1, 6], [1, 7], [1, 8],
    // [2, 6], [2, 7], [2, 8],

    // 3
    // [3, 0], [3, 1], [3, 2]
    // [4, 0], [4, 1], [4, 2],
    // [5, 0], [5, 1], [5, 2],

    // 4
    // [3, 3], [3, 4], [3, 5],
    // [4, 3], [4, 4], [4, 5],
    // [5, 3], [5, 4], [5, 5],

    // 5
    // [3, 6], [3, 7], [3, 8],
    // [4, 6], [4, 7], [4, 8],
    // [5, 6], [5, 7], [5, 8],

    // 6
    // [6, 0], [6, 1], [6, 2]
    // [7, 0], [7, 1], [7, 2],
    // [8, 0], [8, 1], [8, 2],

    // 7
    // [6, 3], [6, 4], [6, 5],
    // [7, 3], [7, 4], [7, 5],
    // [8, 3], [8, 4], [8, 5],

    // 8
    // [6, 6], [6, 7], [6, 8],
    // [7, 6], [7, 7], [7, 8],
    // [8, 6], [8, 7], [8, 8],
    // Check the block removables.
    const blockRemovables: number[][][] = [];

    for (let blockIndex = 0; blockIndex < 9; blockIndex++) {
      const filled: number[][] = [];
      const rowStart = Math.floor((blockIndex / 3)) * 3;
      const colStart = (blockIndex % 3) * 3;

      for (let row = rowStart; row < rowStart + 3; row++) {
        for (let col = colStart; col < colStart + 3; col++) {
          // console.log(row, col);

          if (this.board[row][col] === 1) {
            filled.push([row, col]);
          }
        }
      }

      if (filled.length === 9) {
        blockRemovables.push(filled);
      }
    }

    // Check the horizontal line removables.
    for (let row = 0; row < 9; row++) {
      const filled: number[][] = [];

      this.board[row].forEach((item, col) => {
        if (item === 1) {
          filled.push([row, col]);
        }
      });

      if (filled.length === 9) {
        blockRemovables.push(filled);
      }
    }

    // Check the vertical line removables.
    for (let col = 0; col < 9; col++) {
      const filled: number[][] = [];

      for (let row = 0; row < 9; row++) {
        if (this.board[row][col] === 1) {
          filled.push([row, col]);
        }

        if (filled.length === 9) {
          blockRemovables.push(filled);
        }
      }
    }

    // Remove the removables.
    blockRemovables.forEach(filled => {
      filled.forEach(([x, y]) => this.board[x][y] = 0);
    });

    let combos = 0;

    // If there are some removable blocks,
    // add previous combo count with current combos.
    if (blockRemovables.length > 0) {
      combos = this.comboCounts + blockRemovables.length;
    }

    const points = combos * (9 + (combos - 1));

    this.increasePoint.emit({
      points,
      combos,
    });
  }

  private _fillTheBoard(): void {
    if (this.containingBlocks.length > 0) {
      this.containingBlocks.forEach(block => {
        let row = block.nativeElement.getAttribute('row') as NumberLike;
        let column = block.nativeElement.getAttribute('column') as NumberLike;

        this.renderer.removeClass(block.nativeElement, 'contain');

        row = ParsingUtil.toInteger(row);
        column = ParsingUtil.toInteger(column);

        this.board[row][column] = 1;
      });
    }

    this.containingBlocks = [];
  }
}
