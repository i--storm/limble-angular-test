import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaUserTagComponent } from "./ta-user-tag/ta-user-tag.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaUserTagComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Limble-angular-test';
  comments = [
    {id: 1, photo: "", user: "username 1", text: "comment text 1"},
    {id: 2, photo: "", user: "username 2", text: "comment text 2"},
    {id: 3, photo: "", user: "username 3", text: "comment text 3"},
    {id: 4, photo: "", user: "username 2", text: "comment text 4"},
    {id: 5, photo: "", user: "username 2", text: "comment text 5"},
    {id: 6, photo: "", user: "username 1", text: "comment text 6"},
    {id: 7, photo: "", user: "username 3", text: "comment text 7"}

  ];
  users = [
    {'userID' : 1, 'name' : 'Kevin'},
    {'userID' : 2, 'name' : 'Jeff'},
    {'userID' : 3, 'name' : 'Bryan'},
    {'userID' : 4, 'name' : 'Gabbey'},
  ];

}
