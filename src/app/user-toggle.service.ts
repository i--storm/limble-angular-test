import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserToggleService {

  el: HTMLElement|null = null;
  private users: any = [];
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

  dialog: HTMLDivElement|null = null;
  query: string = "";

  constructor() { }

  init(users: any, el: HTMLElement){
    this.users = users;
    this.users_filtered = users;
    this.el = el;
  }

  showDialog(x: number|null, y:number|null){

    this.query = "";

    this.dialog_top = y !== null? y+"px":this.dialog_top;
    this.dialog_left = x !== null? x+"px":this.dialog_left;

    const div = document.createElement('div');
    div.setAttribute('id','users-list');
    div.setAttribute('class','users-list input');
    div.style.width = this.dialog_width;
    div.style.height = this.dialog_height;
    div.style.top = this.dialog_top;
    div.style.left = this.dialog_left;
    div.style.bottom = this.dialog_bottom;
    div.style.right = this.dialog_right;
    div.style.position = 'absolute';
    div.style.backgroundColor = '#fff';
    div.style.border = '1px solid black';
    div.style.padding = '10px';
    div.style.boxShadow = '5px 5px 5px #000';
    div.style.cursor = 'pointer';
    div.style.overflowY = 'auto';

    this.el?.parentNode?.insertBefore(div, this.el?.nextSibling);

    this.dialog = div;
    this.is_show_dialog = true;

    this.updateDialog();

  }

  updateDialog(){
    let div = this.dialog;
    if(div == null){
      return;
    }


    let query = this.query;

    if(query == ""){
      this.users_filtered = this.users;
    }else{
      this.users_filtered = [];
      for(let i=0; i<this.users.length; i++){
        let user = this.users[i];
        if(user.name.toLowerCase().startsWith(query.toLowerCase())){
          this.users_filtered.push(user);
        }
      }
    }

    div.innerHTML = '';
    for(let i=0; i<this.users_filtered.length; i++){
      let user = this.users_filtered[i];
      let u_el = document.createElement('div');
      u_el.setAttribute('id','user-list-user-'+user.userID)
      u_el.textContent = user.name;
      u_el.style.padding = '10px';
      if(this.dialog_selected_id == user.userID || this.dialog_selected_idx == i){
        u_el.style.backgroundColor = "#aaa";
      }
      div.appendChild(u_el)
    }
  }

  hideDialog(){
    this.is_show_dialog = false
    this.query = "";
    this.dialog?.remove();
  }

  keydown(e: KeyboardEvent) {
    let target = e.target as HTMLDivElement;

    if(e.key=="Enter"){

      if(!this.is_show_dialog){
        return;
      }
      e.preventDefault()

      let user = this.users_filtered[this.dialog_selected_idx]

      this.insertHtmlAtCursor(" <strong><u>@"+user.name+"</u></strong> ")

      target.focus();

      this.hideDialog()

      console.log("Notify user: "+user.userID)
      alert("Notify user: "+user.userID)

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
      this.updateDialog()

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
      this.updateDialog()
    }else if("abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(e.key)){
      this.query = this.query + e.key;
      this.updateDialog()
    }
  }
  keyup(e: KeyboardEvent){
    let target = e.target as HTMLDivElement;

    //if(target !== null && target.value==="@") {
    console.log(e.key);
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

        this.showDialog(x, y)

      }

    }else if(e.key==" "){
      this.hideDialog()
    }else if(e.key=="Escape"){
      this.hideDialog()
    }else if(e.key=="Backspace"){
      if(this.is_show_dialog) {
        this.query = this.query.substring(0, this.query.length > 0 ? this.query.length - 1 : 0)
        this.updateDialog()
      }
    }else{
      if(this.is_show_dialog){

      }
    }
  }

  // showDialog(query: string, x: number|null, y: number|null){
  //   console.log(x , y)
  //
  //   this.dialog_top = y !== null? y+"px":this.dialog_top;
  //   this.dialog_left = x !== null? x+"px":this.dialog_left;
  //
  //   this.users_filtered = JSON.parse(JSON.stringify(this.users));
  //
  //   this.dialog_selected_id = this.users_filtered[this.dialog_selected_idx].userID
  //
  //   this.is_show_dialog = true;
  // }

  insertHtmlAtCursor(html: string) {
    let range, node;
    if (window.getSelection && window.getSelection()?.getRangeAt) {
      let selection = window.getSelection()
      range = window.getSelection()?.getRangeAt(0);
      range!?.setStart(range!?.startContainer, range!?.startOffset - 1 - this.query.length);

      selection?.deleteFromDocument()
      node = range!?.createContextualFragment(html);
      range!?.insertNode(node);

      //range.setStart(range.endContainer, range.endOffset);
      range!?.collapse(false);
    }
  }
}
