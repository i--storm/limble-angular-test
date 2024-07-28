import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaUserTagComponent } from "./ta-user-tag/ta-user-tag.component";
import {UserToggleDirective} from "./user-toggle.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaUserTagComponent, UserToggleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Limble-angular-test';
  comments = [
    {id: 1, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp", user: "Martha", text: "comment text 1"},
    {id: 2, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp", user: "Johny", text: "comment text 2"},
    {id: 3, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp", user: "Mary Kate", text: "comment text 3"},
    {id: 4, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp", user: "Johny", text: "comment text 4"},
    {id: 5, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp", user: "Martha", text: "comment text 5"},
    {id: 6, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp", user: "Johny", text: "comment text 6"},
    {id: 7, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp", user: "Mary Kate", text: "comment text 7"}

  ];
  users = [
    {'userID' : 1, 'name' : 'Kevin'},
    {'userID' : 2, 'name' : 'Jeff'},
    {'userID' : 3, 'name' : 'Bryan'},
    {'userID' : 4, 'name' : 'Gabbey'},
    {'userID' : 5, 'name' : 'Bob'},
  ];

  submit(e: MouseEvent){
    e.preventDefault()
    let max_id = 0;
    for(let i=0;i<this.comments.length; i++){
      if(this.comments[i].id > max_id){
        max_id = this.comments[i].id;
      }
    }

    let target = document.getElementById("comment-editor");

    this.comments.push({id: max_id+1, photo: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp", user: "Mary Kate", text: target!?.innerHTML})

    if(target) target.innerHTML = "";
  }

}
