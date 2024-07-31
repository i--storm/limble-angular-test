import {Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import {UserToggleService} from "./user-toggle.service";


@Directive({
  selector: '[appUserToggle]',
  standalone: true,
  providers: [

  ]
})
export class UserToggleDirective implements OnInit{

  @Input('users') users:  any = [];
  private uts: UserToggleService;

  constructor(private elementRef: ElementRef, uts: UserToggleService) {
    this.uts = uts;
    const el = elementRef.nativeElement as HTMLElement;
    el.addEventListener("blur", (e)=>{
      console.log("blur");
      this.uts.savePosition()
    });
    el.addEventListener("focus", (e)=>{
      console.log("focus");
      this.uts.restorePosition()
    });

    //div.textContent = 'Inserted Div';
    //div.style.backgroundColor = 'red';
    // any other styling

  }

  ngOnInit() {
    //console.log("Users  : ", this.users);
    this.uts.init(this.users, this.elementRef.nativeElement);
    //this.uts.showDialog("", null, null)
  }

  @HostListener('keydown', ['$event']) public onKeyDown(
    event: KeyboardEvent
  ): any {
    this.uts.keydown(event)
  }

  @HostListener('keyup', ['$event']) public onKeyUp(
    event: KeyboardEvent
  ): any {
    this.uts.keyup(event)
  }

  @HostListener('onfocusout', ['$event']) public onFocusOut(
    event: KeyboardEvent
  ): any {
    console.log('onfocusout')
  }

}
