import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {GameModule} from '@blockudoku/components/game/game.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GameModule
  ]
})
export class MainModule { }
