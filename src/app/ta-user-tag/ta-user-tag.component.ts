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



  /*getCaretTopPoint () {
    const sel = document.getSelection()
    if(sel === null){
      return
    }
    const r = sel.getRangeAt(0)
    let rect
    let r2
    // supposed to be textNode in most cases
    // but div[contenteditable] when empty
    const node = r.startContainer
    const offset = r.startOffset
    if (offset > 0) {
      // new range, don't influence DOM state
      r2 = document.createRange()
      r2.setStart(node, (offset - 1))
      r2.setEnd(node, offset)
      // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
      // IE9, Safari?(but look good in Safari 8)
      rect = r2.getBoundingClientRect()
      return { left: rect.right, top: rect.top }
    } else if (offset < node.length) {
      r2 = document.createRange()
      // similar but select next on letter
      r2.setStart(node, offset)
      r2.setEnd(node, (offset + 1))
      rect = r2.getBoundingClientRect()
      return { left: rect.left, top: rect.top }
    } else { // textNode has length
      // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
      rect = node.getBoundingClientRect()
      const styles = getComputedStyle(node)
      const lineHeight = parseInt(styles.lineHeight)
      const fontSize = parseInt(styles.fontSize)
      // roughly half the whitespace... but not exactly
      const delta = (lineHeight - fontSize) / 2
      return { left: rect.left, top: (rect.top + delta) }
    }
  }*/

  keydown(e: KeyboardEvent) {
    let target = e.target as HTMLDivElement;

    if(e.key=="Enter"){


      if(!this.is_show_dialog){
        return;
      }
      e.preventDefault()

      let user = this.users_filtered[this.dialog_selected_idx]

      const cursor_position = this.getCursorPosition(target)

      let text = target.innerText

      target.textContent = text + user.name

      let brs_count  =text.split("\n").length-1

      this.setCursorPosition(target, cursor_position+user.name.length+brs_count)

      target.focus();

      this.is_show_dialog = false
    }
  }
  keyup(e: KeyboardEvent){
    let target = e.target as HTMLDivElement;

    //if(target !== null && target.value==="@") {
    if(e.key === "@"){

      // let caret = getCaretCoordinates(target, target.selectionEnd);
      //
      // console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
      //
      // this.dialog_top = caret.top+"px";
      // this.dialog_left = caret.left+"px";



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

        x=rect.left - div_rect.left;
        y=rect.top - div_rect.top - div_rect.height - rect.height -10;

        this.showDialog("", x, y)


      }

    }else if(e.key=="ArrowUp"){
      if(!this.is_show_dialog){
        return;
      }
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
  getCursorPosition(target: HTMLDivElement){
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const cloned_range = range?.cloneRange();
    cloned_range?.selectNodeContents(target);
    cloned_range?.setEnd(range!?.endContainer, range!?.endOffset);
    const position = cloned_range?.toString().length;
    return position
  }
  setCursorPosition(target: HTMLDivElement, position: number){
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStart(target.childNodes[0], position);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
