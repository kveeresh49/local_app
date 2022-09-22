import { GeocoderRequest } from '@agm/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProfileService } from 'src/app/components/auth/services/profile.service';
import { AddressModel, GoogleCoordinate } from '../../models/common.model';
import { interval, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnChanges {
  title = 'google-places-autocomplete';
  @ViewChild('map', { static: false }) map: ElementRef;
  @Output() googleCoordinates = new EventEmitter() as any;
  @Input() updatedAddress: AddressModel;
  public lat: any;
  public lng: any;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const source = interval(1);
    const timer$ = timer(5000);
    const example = source.pipe(takeUntil(timer$));
    const example2 = source.pipe(takeUntil(timer$));
    const obs = interval(1).pipe(takeUntil(this.profileService.manageAddress$));

    this.profileService.googleCoordinates$.subscribe((data: any) => {
        this.reverseGeolocationAddress(data['latitude'], data['longitude']);
        this.initMap(data['latitude'], data['longitude']);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'updatedAddress') {
        let data = changes[propName].currentValue;
       let  addressFields :any = {
          name:changes[propName].currentValue.name,
          phoneNumber: changes[propName].currentValue.phone.number
        }
        this.reverseGeolocationAddress(data['latitude'], data['longitude'], addressFields);
        //this.initMap(data['latitude'], data['longitude']);
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getLocation();
    }, 1);
  }

  initMap(lat: any, lng: any) {
    const map = new google.maps.Map(this.map['nativeElement'], {
      zoom: 16,
      center: { lat, lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    this.geocodeLatLng(geocoder, map, infowindow, lat, lng);
  }

  geocodeLatLng(
    geocoder: google.maps.Geocoder,
    map: google.maps.Map,
    infowindow: google.maps.InfoWindow,
    lat: any,
    lng: any
  ) {
    const location: any = new GoogleCoordinate(lat, lng);
    const self = this;
    var delayFactor = 0;
    geocoder.geocode({ location: location },  (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location); //center the map over the result
        map.setZoom(16);
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Default Marker',
          draggable: true,
        });

        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);

        google.maps.event.addListener(marker, 'drag', (event) => {
          console.log(event, 'event');
          //alert('drag');
        });

        google.maps.event.addListener(marker, 'dragend', (event) => {
          self.getCoordinates(event, self);
          self.reverseGeolocationAddress(
            event.latLng.lat(),
            event.latLng.lng()
          );
          //self.lat =  event1.
        });
      } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        console.log('Waiting for Limit for item: ' + status);

        delayFactor++;
        setTimeout(() => {
         this.reverseGeolocationAddress(lat, lng);
           //this.initMap(lat, lng);
        }, 1000);
      } else {
        console.log('errore diverso:  Veeresh' + status);
      }
    });
  }

  getCoordinates(event: any, self: this) {
    self.lat = event.latLng.lat();
    self.lng = event.latLng.lng();
    let newCoordinates: GoogleCoordinate = new GoogleCoordinate(
      self.lat,
      self.lng
    );
    this.googleCoordinates.emit(newCoordinates);
  }

  getLocation() {
    var options = { enableHighAccuracy: true, maximumAge: 100, timeout: 60000 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.reverseGeolocationAddress(this.lat, this.lng);
        }
      });
    }
  }

  reverseGeolocationAddress(lat: any, lng: any, addressFields?:any) {
    let geocoder = new google.maps.Geocoder();
    let latlng: any = new google.maps.LatLng(lat, lng);
    var delayFactor = 0;

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let result = results[0];
        console.log({...result,...addressFields});
        setTimeout(() => {
          this.profileService.addAddressSubject$.next({...result,...addressFields});
        });
        let rsltAdrComponent = result.address_components;
        let resultLength = rsltAdrComponent.length;
        setTimeout(() => {
          this.initMap(lat, lng);
        }, 1);

      } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        console.log('Waiting for Limit for item: ' + status);

        delayFactor++;
        setTimeout(() => {
          this.reverseGeolocationAddress(lat, lng);
        }, 100000);
      } else {
        console.log('errore diverso: ' + status);
      }
    });
  }
}
