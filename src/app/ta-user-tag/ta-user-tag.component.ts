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
    let target = e.target as HTMLDivElement;

    if(e.key=="Enter"){

      if(!this.is_show_dialog){
        return;
      }
      e.preventDefault()

      let user = this.users_filtered[this.dialog_selected_idx]

      // const cursor_position = this.getCursorPosition(target)!
      //
      // let text = target.innerText
      //
      // let brs_count  =text.substring(0 , cursor_position).split("\n").length-1
      //
      // target.textContent = text.substring(0 , cursor_position+brs_count) + user.name + text.substring(cursor_position+brs_count)
      //
      // this.setCursorPosition(target, cursor_position+user.name.length+brs_count)

      this.insertHtmlAtCursor(" <strong><u>@"+user.name+"</u></strong> ")

      target.focus();

      this.is_show_dialog = false

      console.log("Notify user: "+user.userID)

    }else if(e.key=="ArrowUp"){
      if(!this.is_show_dialog){
        return;
      }
      e.preventDefault()
      this.dialog_selected_idx --;
      if(this.dialog_selected_idx < 0){
        this.dialog_selected_idx = this.users_filtered.length - 1;
      }
      this.dialog_selected_id = this.users_filtered[this.dialog_selected_idx].userID
      let item = document.getElementById('user-list-user-' + this.users_filtered[this.dialog_selected_idx].userID);
      if(item!==null)
        item.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });

    }else if(e.key=="ArrowDown"){
      if(!this.is_show_dialog){
        return;
      }
      e.preventDefault()
      this.dialog_selected_idx ++;
      if(this.dialog_selected_idx >= this.users_filtered.length){
        this.dialog_selected_idx = 0;
      }
      this.dialog_selected_id = this.users_filtered[this.dialog_selected_idx].userID
      let item = document.getElementById('user-list-user-' + this.users_filtered[this.dialog_selected_idx].userID);
      if(item!==null)
        item.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
    }
  }
  keyup(e: KeyboardEvent){
    let target = e.target as HTMLDivElement;

    //if(target !== null && target.value==="@") {
    if(e.key === "@"){

      const r = document.getSelection()?.getRangeAt(0)
      if(r == undefined){
        return
      }
      const node = r.startContainer
      const offset = r.startOffset

      let rect,  r2;

      let x: number, y:number;

      if (offset > 0) {
        r2 = document.createRange()
        r2.setStart(node, (offset - 1))
        r2.setEnd(node, offset)
        rect = r2.getBoundingClientRect()

        let div_rect = target.getBoundingClientRect()
        //let dialog_rect = document.getElementById("users-list")!?.getBoundingClientRect()

        let x=rect.left - div_rect.left;
        let y=rect.top - div_rect.top - div_rect.height - rect.height - 10;

        let dialog_width_int = parseInt(this.dialog_width);

        let turn_point=div_rect.width - dialog_width_int - 40;

        if (x>turn_point){
          x=x-dialog_width_int;
        }

        this.showDialog("", x, y)


      }

    }else if(e.key==" "){
      this.is_show_dialog = false;
    }else if(e.key=="Escape"){
      this.is_show_dialog = false
    }else{
      if(this.is_show_dialog){

      }
    }
  }

  showDialog(query: string, x: number|null, y: number|null){
    console.log(x , y)

    this.dialog_top = y !== null? y+"px":this.dialog_top;
    this.dialog_left = x !== null? x+"px":this.dialog_left;

    this.users_filtered = JSON.parse(JSON.stringify(this.users));

    this.dialog_selected_id = this.users_filtered[this.dialog_selected_idx].userID

    this.is_show_dialog = true;
  }

  insertHtmlAtCursor(html: string) {
    let range, node;
    if (window.getSelection && window.getSelection()?.getRangeAt) {
      let selection = window.getSelection()
      range = window.getSelection()?.getRangeAt(0);
      range!?.setStart(range!?.startContainer, range!?.startOffset - 1);

      selection?.deleteFromDocument()
      node = range!?.createContextualFragment(html);
      range!?.insertNode(node);

      //range.setStart(range.endContainer, range.endOffset);
      range!?.collapse(false);
    }
  }


}
