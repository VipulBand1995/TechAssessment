import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prime-number',
  templateUrl: './prime-number.component.html',
  styles: [
  ]
})
export class PrimeNumberComponent implements OnInit {

  primeNumber: any;
  result: string;
  constructor() { }

  ngOnInit(): void {
  }

  checkPrimeNumber() {
    var i=0;
    var m=0;
    var flag=0;
    debugger;
    m = this.primeNumber/2;
    if(this.primeNumber == 0 || this.primeNumber == 1) {
      this.result = this.primeNumber+' is not a prime number';
    } else {
      for(i=2;i<=m;i++) {
        if(this.primeNumber % i == 0){
          this.result = this.primeNumber+' is not a prime number';
          flag = 1;
          break;
        }
      }
      if(flag == 0) {
        this.result = this.primeNumber+' is a prime number';
      }
    }
  }

}
