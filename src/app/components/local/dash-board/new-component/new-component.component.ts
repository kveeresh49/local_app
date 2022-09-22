import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';

//import { Position } from 'popper.js';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss'],
})
export class NewComponentComponent implements OnInit, AfterViewInit {
  title = 'google-places-autocomplete';
  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  @ViewChild('map') map: ElementRef;
  public lat: any;
  public lng: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  public locationFields = [
    'name',
    'cityName',
    'stateCode',
    'countryName',
    'countryCode',
  ];

  public location!: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getLocation();
    }, 1);
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.getLocation();
    // }, 1);
    // this.initAutocomplete({
    //   fields: ["address_components","formatted_address", "geometry", "name"],
    //   componentRestrictions: { country: 'ind' },
    //   strictBounds: false,
    //   types: ["establishment"],
    // });
    // this.mapsAPILoader.load()
    //   .then(() => {
    //   })
    //   .catch((mapsError: any) => {
    //     console.warn('mapAPILoader failed to load', { error: mapsError });
    //   });
  }

  initAutocomplete(options: any) {
    // const options1 = {

    // };

    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      options
    );

    autocomplete.addListener('place_changed', () => {
      console.log('place_changed');
      this.ngZone.run(() => {
        this.onPlaceChange(autocomplete.getPlace());
      });
    });
  }

  onPlaceChange(place: google.maps.places.PlaceResult) {
    this.location = this.locationFromPlace(place);
  }

  public locationFromPlace(place: google.maps.places.PlaceResult) {
    if (!place) {
      return null;
    }

    const components = place.address_components;
    if (components === undefined) {
      return null;
    }

    const areaLevel3 = this.getShort(components, 'administrative_area_level_3');
    const locality = this.getLong(components, 'locality');

    const cityName = locality || areaLevel3;
    const countryName = this.getLong(components, 'country');
    const countryCode = this.getShort(components, 'country');
    const stateCode = this.getShort(components, 'administrative_area_level_1');
    const name = place.name !== cityName ? place.name : null;

    const coordinates = {
      latitude: place?.geometry?.location.lat(),
      longitude: place?.geometry?.location.lng(),
    };

    const bounds = place?.geometry?.viewport.toJSON();

    // placeId is in place.place_id, if needed
    return {
      name,
      cityName,
      countryName,
      countryCode,
      stateCode,
      bounds,
      coordinates,
    };
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

  // map :

  initMap() {
    const map = new google.maps.Map(this.map['nativeElement'], {
      zoom: 16,
      center: { lat: this.lat, lng: this.lng },
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    this.geocodeLatLng(geocoder, map, infowindow);
  }

  geocodeLatLng(
    geocoder: google.maps.Geocoder,
    map: google.maps.Map,
    infowindow: google.maps.InfoWindow
  ) {
    const latlng = {
      lat: this.lat,
      lng: this.lng,
    };
    const self = this;
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location); //center the map over the result
        map.setZoom(16);

        const marker = new google.maps.Marker({
          position: latlng,
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
          self.myfunction(event, self);
          //self.lat =  event1.
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  myfunction(event: any, self: this) {
    self.lat = event.latLng.lat();
    self.lng = event.latLng.lng();
    console.log(self.lat, 'this');
    console.log(self.lng, 'lnggg');
  }
  // getLocation

  getLocation() {
    var options = { enableHighAccuracy: true, maximumAge: 100, timeout: 60000 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat, '1');
            console.log(this.lng, '1');
            setTimeout(() => {
              this.initMap();
            }, 1);
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
