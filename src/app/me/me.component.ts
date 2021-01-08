import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor() { }

  updatepage(){
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page';
  }

  exit() {
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page';
    pages[1].className = 'page hide';
  }

  ngOnInit(): void {
  }

}
