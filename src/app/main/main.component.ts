import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  @ViewChild('player1') player1;
  @ViewChild('player2') player2;
  @ViewChild('overTable') overTable;
  player1Piece = "X"
  player1Name;
  player1Result = 0;
  player2Piece = "O"
  player2Name;
  player2Result = 0;

  playedMoves = 0;
  lastMoveField = 0;
  gameLog = "";

  saveResultsObject = {};
  cont = localStorage.getItem('continueGame');
  constructor() { }

  ngOnInit() {
    this.contGame();
  }



  startGame(event) {
    event.preventDefault();
    this.getPlayerInfo();
    this.overTable.nativeElement.style.display = "none"
  }

  getPlayerInfo() {
    this.player1Name = this.player1.nativeElement.value;
    this.player2Name = this.player2.nativeElement.value;
  }
  putPiece(event) {
    event.preventDefault();
    if (this.player1.nativeElement.value === "" || this.player2.nativeElement.value === "") {
      alert('Name is required and than start game !');
      return;
    }
    let target = event.target,
      id = event.target.id;
    if (this.emptyField(target)) {
      this.drawPiece(target)
      ++this.playedMoves;
      this.lastMoveField = id.split('field')[1];
      this.gameLog += this.lastMoveField;
      this.checkResult();
    }
  }
  checkResult() {
    if (this.playedMoves > 4) {
      let lines = this.getLines(this.lastMoveField);
      console.log(lines)
      for (const line in lines) {
        let checkedString = this.listToString(lines[line]);

        if (checkedString == this.player1Piece + this.player1Piece + this.player1Piece) {
          this.player1Result++;
          alert(this.player1Name + " won !");
          this.clearGameTable();
          return;
        }
        if (checkedString == this.player2Piece + this.player2Piece + this.player2Piece) {
          this.player2Result++;
          alert(this.player2Name + " won !");
          this.clearGameTable();
          return;
        }
        if (this.finishedGame()) {
          this.player1Result += 0.5
          this.player2Result += 0.5
          alert(" draw !");
          this.clearGameTable();
        }
      }

    }
  }
  getPiece() {
    return this.playedMoves % 2 == 0 ? this.player1Piece : this.player2Piece;
  }
  drawPiece(target) {
    target.innerHTML = this.getPiece();
  }
  emptyField(target) {
    return target.innerHTML == "";
  }
  finishedGame() {
    return this.playedMoves == 9;
  }

  getLines(field) {
    let vertical = field % 3 == 0 ? 3 : field % 3,
      horizontal = Math.ceil(field / 3) * 3,
      lines = [
        [horizontal, horizontal - 1, horizontal - 2],
        [vertical, vertical + 3, vertical + 6]
      ]
    if (field == 3 || field == 5 || field == 7) lines.push([3, 5, 7]);
    if (field == 1 || field == 5 || field == 9) lines.push([1, 5, 9]);
    return lines;
  }
  listToString(array) {
    let returnSring = "";
    for (const key in array) {
      let fieldContent = document.getElementById('field' + array[key]).innerHTML;
      returnSring += fieldContent != "" ? fieldContent : ""
    }
    return returnSring;
  }
  clearGameTable() {
    this.playedMoves = 0;
    this.lastMoveField = 0;
    for (let index = 1; index <= 9; index++) {
      document.getElementById('field' + index).innerHTML = "";

    }
  }
  resetAll() {
    let con = confirm('Are you sure?');
    if (con == false) {
      return;
    } else {
      this.player1Name = "";
      this.player2Name = "";
      this.player1.nativeElement.value = "";
      this.player2.nativeElement.value = "";
      this.player1Result = 0;
      this.player2Result = 0;
      this.playedMoves = 0;
      this.lastMoveField = 0;
      localStorage.removeItem('continueGame');
      for (let index = 1; index <= 9; index++) {
        document.getElementById('field' + index).innerHTML = "";

      }
    }
  }
  saveResults() {
    this.saveResultsObject = localStorage.getItem("saveResults") !== null ? JSON.parse(localStorage.getItem("saveResults")) : {};
    let saveResultsObjectNew = {
      player1Name: this.player1Name,
      player1Result: this.player1Result,
      player2Name: this.player2Name,
      player2Result: this.player2Result,
    }
    this.saveResultsObject[this.player1Name + this.player1Result + this.player2Name + this.player2Result] = saveResultsObjectNew;
    localStorage.setItem('saveResults', JSON.stringify(this.saveResultsObject));
    alert('Game is saved !');
    this.player1Name = "";
    this.player2Name = "";
    this.player1.nativeElement.value = "";
    this.player2.nativeElement.value = "";
    this.player1Result = 0;
    this.player2Result = 0;
    this.playedMoves = 0;
    this.lastMoveField = 0;
    for (let index = 1; index <= 9; index++) {
      document.getElementById('field' + index).innerHTML = "";
    }

  }
  contGame() {
    console.log(JSON.parse(this.cont))
    if (this.cont == null || this.cont == undefined) {
      return;
    } else {
      let takeCont = JSON.parse(this.cont);
      this.player1Name = takeCont.player1Name;
      this.player2Name = takeCont.player2Name;
      this.player1.nativeElement.value = takeCont.player1Name;
      this.player2.nativeElement.value = takeCont.player2Name;
      this.player1Result = takeCont.player1Result;
      this.player2Result = takeCont.player2Result;
      this.overTable.nativeElement.style.display = "none"
    }
  }
}
