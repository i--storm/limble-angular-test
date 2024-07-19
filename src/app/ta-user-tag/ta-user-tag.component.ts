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
  is_show_dialog = false
  dialog_top = "0px"
  dialog_left = "0px"


  keyup(e: KeyboardEvent){
    let target = e.target as HTMLTextAreaElement;

    //if(target !== null && target.value==="@") {
    if(e.key === "@"){

      let caret = getCaretCoordinates(target, target.selectionEnd);

      console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);

      this.dialog_top = caret.top+"px";
      this.dialog_left = caret.left+"px";

      this.is_show_dialog = true;

    }
  }
}
