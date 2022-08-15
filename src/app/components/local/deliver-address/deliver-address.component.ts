import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;

@Component({
  selector: 'app-deliver-address',
  templateUrl: './deliver-address.component.html',
  styleUrls: ['./deliver-address.component.scss'],
  // providers: [
  //   {
  //     provide: STEPPER_GLOBAL_OPTIONS,
  //     useValue: { showError: false },
  //   },
  // ],
})
export class DeliverAddressComponent implements OnInit {

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  thridFormGroup = this.fb.group({
    thridCtrl: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {}
  // onclick(){
  //   this.location.back()
  // }
}
