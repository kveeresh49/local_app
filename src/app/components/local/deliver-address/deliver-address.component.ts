import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Location } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public savedAddresses = [
    {
      type: 'home',
      city: 'R K Nagar, Secunderabad',
      area: 'R K Nagar west maredpally, secunderbad , Telangana, 500026, india',
    },
    {
      type: 'work',
      city: 'Gachibowli',
      area: 'Biodiversity, Gachibowli, Telangana, 50050, india',
    },
    {
      type: 'other',
      city: 'Jntu',
      area: 'Pragathi nagar, kukatpally, Jntu, Telangana, 500026, india',
    },
    {
      type: 'other',
      city: 'lingampally',
      area: 'Bhel gate, Lingampally, medak , Telangana, 502032, india',
    },
  ];
  @Output() selectedAddress = new EventEmitter<object>();
  @Input() deliverAddress: any;

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  thridFormGroup = this.fb.group({
    thridCtrl: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {}
  // onclick(){
  //   this.location.back()
  // }

  public getSelectedAddress(address: object) {
    this.selectedAddress.emit(address);
  }
}
