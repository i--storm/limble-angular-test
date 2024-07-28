import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//const getCaretCoordinates = require('textarea-caret');
import getCaretCoordinates from 'textarea-caret'


@Component({
  selector: 'app-ta-user-tag',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './ta-user-tag.component.html',
  styleUrl: './ta-user-tag.component.css'
})
export class TaUserTagComponent {
  @Input('users') users: any = [];

  users_filtered: any = [];

  is_show_dialog = false
  dialog_top = "auto"
  dialog_left = "auto"
  dialog_bottom = "auto"
  dialog_right = "auto"
  dialog_width = "250px"
  dialog_height = "100px"
  dialog_selected_id = 0
  dialog_selected_idx = 0



  keydown(e: KeyboardEvent) {

  }

  keyup(e: KeyboardEvent){

  }


}
