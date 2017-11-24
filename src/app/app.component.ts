import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { JsonPipe } from '@angular/common';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'Band is in town';
  showForm = true;
  
  bandInfo = [];
  eventsInfo = [];
  faceDisabled;
  
  sendBandForm;
  ngOnInit(){
    this.sendBandForm = new FormGroup({
        bandname : new FormControl("")
    });
  }
  constructor(private http: Http){
  }
  
  onSubmit = function(band) {
    this.http.get("https://rest.bandsintown.com/artists/" + band.bandname + "?app_id=codeChallenge")
    .subscribe(
	(res: Response)=>{
    this.bandInfo = res.json();
    if (this.bandInfo.facebook_page_url == ''){this.faceDisabled = 'true';}
    })
	
    this.http.get("https://rest.bandsintown.com/artists/" + band.bandname + "/events?app_id=codeChallenge")
    .subscribe(
    (res: Response)=>{
    this.eventsInfo = res.json();
    })

    this.showForm = false;
  }
}