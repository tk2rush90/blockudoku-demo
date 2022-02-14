import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { BlockComponent } from './block/block.component';
import { BoardComponent } from './board/board.component';



@NgModule({
  declarations: [
    GameComponent,
    BlockComponent,
    BoardComponent
  ],
  exports: [
    GameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
