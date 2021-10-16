import { query } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'this.prime-game';
  number: Number = 0;
  public range: any[] = [{
    id: 1,
    left: '',
    right: ''
  }];
  maximum = 100005;
  show: boolean = false;
  showOutput: boolean = false;
  output:any = [];
  pre: any = [];
  suff: any = [];
  left = [];
  right= [];

  constructor() { }

  myFunction() {
    if (this.number >= 1 && this.number <= 10) {
      for (var i = 1; i < this.number; i++) {
        this.range.push({
          id: this.range.length + 1,
          left: '',
          right: ''
        })
      }
      this.show = true;
    }
  }

  getValue() {
    this.range.forEach((element, index) => {
      this.pre[index] = this.range[index].left;
      this.suff[index] = this.range[index].right;
    })
    this.precompute(this.left, this.right);
    for (let i = 0; i < this.number; i++) {
      this.output[i] = this.query(this.left, this.right, this.pre[i], this.suff[i]);
      if (this.output != null) {
        this.showOutput = true;
      }
    }
  }

  precompute(left: any[], right: any[]) {
    let prime = [];
    for (let i = 0; i < this.maximum; i++) {
      prime[i] = true;
    }
    for (let i = 2; i * i < this.maximum; i++) {
      if (prime[i]) {
        for (let j = i * i; j < this.maximum; j += i) {
          prime[j] = false;
        }
      }
    }
    left[1] = 1;
    right[this.maximum - 1] = 1e9 + 7;
    for (let i = 2; i < this.maximum; i++) {
      if (prime[i]) {
        left[i] = i;
      }
      else {
        left[i] = left[i - 1];
      }
    }
    for (let i = this.maximum - 2; i > 1; i--) {
      if (prime[i]) {
        right[i] = i;
      }
      else {
        right[i] = right[i + 1];
      }
    }
  }

  query(left: never[], right: never[], L: number, R: number) {
    if (left[R] < L || right[L] > R) {
      return -1;
    }
    else {
      return left[R] - right[L];
    }
  }
}