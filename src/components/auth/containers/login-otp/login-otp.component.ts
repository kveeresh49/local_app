import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgOtpInputComponent } from 'ng-otp-input';
@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {

  // @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  
  constructor() { }

  ngOnInit(): void {
  }

}
