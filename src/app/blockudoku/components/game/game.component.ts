import {Component, OnInit, ViewChild} from '@angular/core';
import {BlockComponent} from '@blockudoku/components/game/block/block.component';
import {EventListenerService} from '@tk-ui/services/common/event-listener.service';
import {BoardComponent} from '@blockudoku/components/game/board/board.component';
import {GameUtil} from '@blockudoku/utils/game.util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [
    EventListenerService,
  ],
})
export class GameComponent implements OnInit {
  // Game board.
  @ViewChild(BoardComponent) board!: BoardComponent;

  // Points.
  points = 0;

  // Combo counts.
  comboCounts = 0;

  // Last added points.
  lastAddedPoints = 0;

  // Next blocks.
  nextBlocks: number[][][] = [];

  // The dragging block.
  draggingBlock?: BlockComponent;

  constructor(
    private eventListenerService: EventListenerService,
  ) {
  }

  ngOnInit(): void {
    this.getNextBlocks();
  }

  restart(): void {
    this.board.board = GameUtil.getInitialBoard();
    this.lastAddedPoints = 0;
    this.comboCounts = 0;
    this.points = 0;

    this.getNextBlocks();
  }

  getNextBlocks(): void {
    this.nextBlocks = [
      GameUtil.createBlock(),
      GameUtil.createBlock(),
      GameUtil.createBlock(),
    ];
  }

  dragStartBlock(event: MouseEvent | TouchEvent, block: BlockComponent): void {
    this.draggingBlock = block;
    this.draggingBlock.event = event;

    this.eventListenerService.addEvent(window, 'mouseup', this._stopDragging);
    this.eventListenerService.addEvent(window, 'mousemove', this._dragTheBlock);

    this.eventListenerService.addEvent(window, 'touchend', this._stopDragging, {passive: false});
    this.eventListenerService.addEvent(window, 'touchmove', this._dragTheBlock, {passive: false});
  }

  onIncreasePoints(points: number): void {
    if (points > 0) {
      this.comboCounts++;
    } else {
      this.comboCounts = 0;
    }

    this.points += points;
    this.lastAddedPoints = points;
  }

  private _stopDragging = (): void => {
    if (this.draggingBlock!.blockList.filter(item => item.nativeElement.classList.contains('fill')).length === this.board.containingBlocks.length) {
      this.nextBlocks = this.nextBlocks.filter(item => item !== this.draggingBlock?.data);

      setTimeout(() => this.board.removeTheRemovables());
    }

    this.board.checkTheBoard();

    this.draggingBlock = undefined;
    this.eventListenerService.removeEvent(window, 'mouseup', this._stopDragging);
    this.eventListenerService.removeEvent(window, 'mousemove', this._dragTheBlock);

    this.eventListenerService.removeEvent(window, 'touchend', this._stopDragging);
    this.eventListenerService.removeEvent(window, 'touchmove', this._dragTheBlock);

    if (this.nextBlocks.length === 0) {
      this.getNextBlocks();
    }
  }

  private _dragTheBlock = (event: MouseEvent): void => {
    event.preventDefault();

    if (this.draggingBlock) {
      this.draggingBlock.event = event;
      this.board.checkTheBlockPosition(this.draggingBlock);
    }
  }
}
