import { Component, ElementRef, OnInit, ViewChild,NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';



@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent implements OnInit {
  title = 'google-places-autocomplete';
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''


  ngOnInit(): void {
 
  }
 
  @ViewChild("search")
  public searchElementRef: ElementRef;

  public locationFields = ["name", "cityName", "stateCode", "countryName", "countryCode"];

  public location!: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.initAutocomplete({
      fields: ["address_components","formatted_address", "geometry", "name"],
      componentRestrictions: { country: 'ind' },
      strictBounds: false,
      types: ["establishment"],
    });

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

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);

    autocomplete.addListener("place_changed", () => {
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
    return { name, cityName, countryName, countryCode, stateCode, bounds, coordinates };
  }


  getComponent(components: any, name: string) {
    return components.filter((component:any) => component.types[0] === name)[0];
  }
  
   getLong(components: any, name: string) {
    const component = this.getComponent(components, name);
    return component && component.long_name;
  }
  
   getShort(components: any, name: string) {
    const component = this.getComponent(components, name);
    return component && component.short_name;
  }
  

}



