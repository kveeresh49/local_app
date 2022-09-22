import { MapsAPILoader } from '@agm/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { ProfileService } from 'src/app/components/auth/services/profile.service';
import { AddressModel } from '../../models/common.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, AfterViewInit {
  lat: any;
  lng: any;
  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private profileService: ProfileService,
    private cf: ChangeDetectorRef
  ) {}

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.India];

  @ViewChild('searchEle', { static: false }) searchElementRef: ElementRef;
  public address: AddressModel;

  public locationFields = [
    'name',
    'cityName',
    'stateCode',
    'countryName',
    'countryCode',
  ];
  addressForm: FormGroup;
  public location!: any;
  isSubmitClick = false;

  get f(): any {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.profileService.addAddressSubject$.subscribe((data: any) => {
      let place = data;
      setTimeout(() => {
        this.getAddressPlaces(place);
      },1000)
    });
  }

  ngAfterViewInit(): void {
    this.googlePlaceSearch();
  }

  // google.maps.places.PlaceResult
  getAddressPlaces(place: any ) {
    const addressComponents = place.address_components;
    const street_number = this.getLong(addressComponents, 'plus_code') ?? '';
    const street_numberw = this.getLong(addressComponents, 'premise') ?? '';
    const route = this.getLong(addressComponents, 'route') ?? '';

    const sublocality_level_2 =
      this.getLong(addressComponents, 'sublocality_level_2') ?? '';
    console.log(sublocality_level_2, 'sublocality_level_2');

    const sublocality_level_1 =
      this.getLong(addressComponents, 'sublocality_level_1') ?? '';
    console.log(sublocality_level_1, 'sublocality_level_2');

    const city = this.getLong(addressComponents, 'locality') ?? '';
    const region =
      this.getLong(addressComponents, 'administrative_area_level_2') ?? '';
    const state =
      this.getLong(addressComponents, 'administrative_area_level_1') ?? '';
    const country = this.getLong(addressComponents, 'country') ?? '';
    const postal_code = this.getLong(addressComponents, 'postal_code') ?? '';

    // co-ordinates
    const latitude = place.geometry?.location.lat();
    const longitude = place.geometry?.location.lng();

    // store name
    const store_name = place.name;

    let formatedaddress: any = place.formatted_address?.split(',');
    let street_number1 = formatedaddress[0];
    let landmark = formatedaddress[1];

    // Custom Mappings
    const addressLine1 =
      `${street_number1} ${landmark} ${route} ${sublocality_level_2} ${sublocality_level_1}`.trim();

    const name  =  place.name;
    const mobileNumber = place['phoneNumber'];

    let address = new AddressModel(
      +postal_code,
      addressLine1,
      landmark,
      city,
      region,
      state,
      country,
      latitude,
      longitude,
      store_name,
      name,
      mobileNumber
    );

    this.addressForm.patchValue(address);
    this.addressForm?.get('lat')?.setValue(latitude);
    this.addressForm?.get('name')?.setValue(name);
    this.addressForm?.get('lng')?.setValue(longitude);
    this.addressForm?.get('location')?.setValue(address.addressLine1);
    this.addressForm?.get('landmark')?.setValue(landmark);
    this.addressForm?.get('location')?.updateValueAndValidity();
    this.addressForm?.updateValueAndValidity();
    this.cf.detectChanges();
  }

  googlePlaceSearch(): void {
    this.mapsAPILoader
      .load()
      .then((res) => {
        console.log('res');
      })
      .catch((mapsError: any) => {
        console.warn('mapAPILoader failed to load', { error: mapsError });
      });

    this.initAutocomplete({
      fields: ['formatted_address', 'geometry', 'name', 'address_components'],
      componentRestrictions: { country: 'ind' },
      strictBounds: false,
      types: ['establishment'],
    });
  }

  public searchElement() {
    let self = this;
    return self.searchElementRef.nativeElement;
  }

  initAutocomplete(options: any) {
    setTimeout(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
        console.log('place_changed');
        this.ngZone.run(() => {
          this.onPlaceChange(autocomplete.getPlace());
        });
      });
    }, 1);
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    this.getAddress(place);
  }

  createForm() {
    this.addressForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      addressLine1: ['', [Validators.required]],
      apartMent: '',
      landmark: ['', [Validators.required]],
      city: '',
      state: '',
      pinCode: '',
      location:'',
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      mobileNumber: '',
      addressType :['',[Validators.required]]
    });
  }

  getAddress(place: google.maps.places.PlaceResult) {
    if (!place || place.address_components?.length === 0) {
      return;
    }
    const latitude = place.geometry?.location.lat();
    const longitude = place.geometry?.location.lng();
    const coordinates = {
      latitude: place?.geometry?.location.lat(),
      longitude: place?.geometry?.location.lng(),
    };
    this.profileService.googleCoordinates$.next(coordinates);
    this.getAddressPlaces(place);
  }

  getComponent(components: any, name: string) {
    return components.filter(
      (component: any) => component.types[0] === name
    )[0];
  }

  getLong(components: any, name: string) {
    const component = this.getComponent(components, name);
    return component && component.long_name;
  }

  getShort(components: any, name: string) {
    const component = this.getComponent(components, name);
    return component && component.short_name;
  }


  saveNewAddress() {
    this.isSubmitClick = true;
    if (this.addressForm.valid) {

      let newAddress:AddressModel = {
        ...this.addressForm.value,
        mobileNumber: this.addressForm
          .get('phone')
          ?.value['e164Number'].substring(1),
      };
     
      let allAddress: any =
        sessionStorage.getItem('addressObj') !== null
          ? sessionStorage.getItem('addressObj')
          : sessionStorage.setItem('addressObj', JSON.stringify([]));
      if (JSON.parse(allAddress) !== null && allAddress !== '') {
        this.verifyIsNewAddress(JSON.parse(allAddress), newAddress);
        
      }
    } else {
    }
  }

  verifyIsNewAddress(allAddress:Array<AddressModel>, newAddress:AddressModel) {
   const addresslength: Array<AddressModel> =  allAddress.filter((isAddress:AddressModel) => {
      return isAddress.latitude === newAddress.latitude &&  isAddress.latitude === newAddress.latitude
    });

    if(addresslength.length > 0) {
      alert('same address added')
    } else {
      allAddress.push(newAddress);
      sessionStorage.setItem('addressObj', JSON.stringify(allAddress));
      this.profileService.manageAddress$.next(true);
      
    }

  }
}
