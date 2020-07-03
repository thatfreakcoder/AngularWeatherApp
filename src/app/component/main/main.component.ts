import { Component, OnInit } from '@angular/core';
import { WeatherCallService } from 'src/app/services/weather-call.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	weatherData : any = {};
	lat : any;
	lon : any;
  constructor(private weatherService : WeatherCallService) { }

  ngOnInit(): void {
  	this.currentLocation();
  }

  currentLocation() {
  	if('geolocation' in navigator) {
  		navigator.geolocation.watchPosition((position) => {
  			this.lat = position.coords.latitude;
  			this.lon = position.coords.longitude;
  		})
  	}
  }

  getLocation() {
  	const promise = this.weatherService.getWeatherDataByCoords(this.lat, this.lon).toPromise();
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
}
