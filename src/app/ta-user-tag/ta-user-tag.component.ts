import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  keyup(e: KeyboardEvent){
    //let target = e.target as HTMLTextAreaElement;

    //if(target !== null && target.value==="@") {
    if(e.key === "@"){
      console.log("keyup @")
      this.is_show_dialog = true;
    }
  }
}
