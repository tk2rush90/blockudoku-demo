import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {EventUtil} from '@tk-ui/utils/event.util';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  // Single block list.
  @ViewChildren('block') blockList!: QueryList<ElementRef<HTMLElement>>;

  // Set dragging state and bind to class.
  @HostBinding('class.dragging') @Input() dragging = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  /**
   * Set the dragging mouse or touch event.
   * @param event The event.
   */
  @Input() set event(event: MouseEvent | TouchEvent) {
    const {x, y} = EventUtil.getMouseOrTouchXY(event);

    this._x = x;
    this._y = y;
  }

  /**
   * Get host element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  // The `x` position of block when dragging.
  private _x = 0;

  /**
   * Bind the `x` position to style `left`
   */
  @HostBinding('style.left') get x(): string {
    return `${this._x}px`;
  }

  // The `y` position of block when dragging.
  private _y = 0;

  /**
   * Bind the `y` position to style `top`
   */
  @HostBinding('style.top') get y(): string {
    return `${this._y}px`;
  }

  // The rows for block grid.
  private _rows: string[] = [];

  /**
   * Bind to grid template rows style.
   */
  @HostBinding('style.grid-template-rows') get rows(): string {
    return this._rows.join(' ');
  }

  // The columns for block grid.
  private _columns: string[] = [];

  /**
   * Bind to grid template columns style.
   */
  @HostBinding('style.grid-template-columns') get columns(): string {
    return this._columns.join(' ');
  }

  // The procession of numbers which contains data for the block.
  private _data!: number[][];

  /**
   * Get the block procession data.
   */
  get data(): number[][] {
    return this._data;
  }

  /**
   * Set the block procession data.
   * @param data The data.
   */
  @Input() set data(data: number[][]) {
    this._data = data;
    this._calculateGrid();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth < 374) {
      this._calculateGrid(30);
    } else {
      this._calculateGrid();
    }
  }


  /**
   * Calculate the grid template styles with procession data.
   */
  private _calculateGrid(size = 40): void {
    // Init the rows and columns.
    this._rows = [];
    this._columns = [];

    // Count the rows.
    for (let i = 0; i < this._data.length; i++) {
      this._rows.push(`${size}px`);
    }

    // Count the maximum column.
    const columns = this._data.map(row => row.length);
    const max = Math.max(...columns);

    for (let i = 0; i < max; i++) {
      this._columns.push(`${size}px`);
    }
  }
}
