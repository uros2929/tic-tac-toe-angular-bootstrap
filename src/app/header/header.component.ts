import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@ViewChild('navMenu') navMenu;

  constructor() { }

  ngOnInit() {
  }

  showMenu(){
  if (this.navMenu.nativeElement.style.display==="") {
    this.navMenu.nativeElement.style.display="block"
  }else if(this.navMenu.nativeElement.style.display="block"){
    this.navMenu.nativeElement.style.display=""
  }
}
}
