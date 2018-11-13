import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-storage-of-games',
  templateUrl: './storage-of-games.component.html',
  styleUrls: ['./storage-of-games.component.scss']
})
export class StorageOfGamesComponent implements OnInit {

  @ViewChild('player1') player1;

  gamesFromStorage=this.getFromLocalStorage('saveResults')
  savedGames=this.showSavedGames();
  continueGame=localStorage.getItem("continueGame") !== null ? JSON.parse(localStorage.getItem("continueGame")) : {};;
  constructor() { }

  ngOnInit() {
    
  }
  getFromLocalStorage(key) {
    return localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : {};
}
showSavedGames(){
  let arrayOfKeys=Object.keys(this.gamesFromStorage)
  return arrayOfKeys;
}
deleteGame(event){
let con=confirm('Are you sure ?')
if (con==false) {
  return;
}else{
delete this.gamesFromStorage[event.target.id];
localStorage.setItem('saveResults',JSON.stringify(this.gamesFromStorage));
alert('Game is deleted !');
this.savedGames=Object.keys(this.gamesFromStorage);
}
}
playSavedGame(event){
this.continueGame=this.gamesFromStorage[event.target.id]
localStorage.setItem('continueGame',JSON.stringify(this.continueGame))
console.log(this.gamesFromStorage[event.target.id])
}
}
