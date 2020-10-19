import { Component, OnInit } from '@angular/core';
import { WeatherCallService } from 'src/app/services/weather-call.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  weatherData : any = {};
  coords: Icoords;
  moreInfo: boolean = false;
  moreInfoText: string = 'Show More Info';
  sunrise_time : any;
  sunset_time : any;
  flag: boolean = true;

  constructor(private weatherService : WeatherCallService) { }

  ngOnInit(): void{
    this.currentLocation();
  }

  currentLocation() {
  	if('geolocation' in navigator) {
      this.coords= {
        lat: null,
        lon: null
      }
  		navigator.geolocation.watchPosition((position) => {
        this.coords.lat = position.coords.latitude;
        this.coords.lon = position.coords.longitude;
        if(this.flag == true){
        this.getLocation(this.coords);
        this.flag = false;
        }

      })

    }
  }

  getLocation(position: Icoords) {
  	const promise = this.weatherService.getWeatherDataByCoords(position.lat, position.lon).toPromise();
    console.log(promise);

    promise.then((data) => {
      console.log('promise resolved with : ' + JSON.stringify(data));
      this.weatherData = data;
    }, (error) => {
      console.log('promise rejected with : ' + JSON.stringify(error));
      this.weatherData = error;
    })
  }

  getCity(city : string) {
    const promise = this.weatherService.getWeatherDataByCityName(city).toPromise();
    console.log(promise);

    promise.then((data) => {
      console.log('Promise Resolved with ' + JSON.stringify(data));
      this.weatherData = data;
    }, (error) => {
      console.log('Promise Rejected with ' + JSON.stringify(error));
      this.weatherData = error;
    })
  }

  more_info() {
    if(this.moreInfo === false) {
      this.moreInfo = true;
      this.moreInfoText = 'Hide Info';
      var date1 = new Date(this.weatherData.sys.sunrise * 1000);
      var date2 = new Date(this.weatherData.sys.sunset * 1000);
      this.sunrise_time = date1.toLocaleTimeString();
      this.sunset_time = date2.toLocaleTimeString();
    } else if(this.moreInfo === true) {
      this.moreInfo = false;
      this.moreInfoText = 'Show More Info';
    }
  }
}
interface Icoords{
  lat: number,
  lon: number
}
