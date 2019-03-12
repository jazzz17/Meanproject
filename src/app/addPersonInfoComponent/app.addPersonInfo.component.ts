import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.addPersonInfoview.html'

})


export class addPersonInfoComponent implements OnInit {

    personInfo ={
        PID :"",
        FirstName:"",
        MiddleName:"",
        LastName:"",
        Gender:"",
        DateOfBirth:"",
        Age:"",
        Flat_BungalowNo:"",
        SocietyName:"",
        StreetName_AreaName:"",
        City:"",
        State:"",
        PinCode:"",
        PhoneNo:"",
        MobileNo:"",
        PhysicalDisability:"",
        MaritalStatus:"",
        EducationStatus:"",
        BirthSign:"",
        UserId:"",
    }
  constructor(private serv:UserService,private router:Router) {

  }

ngOnInit(): void {

 }

 onClickSave(e) {
    alert("hello")


    let prd = {  
            PID :this.personInfo.PID,
            FirstName:this.personInfo.FirstName,
            MiddleName:this.personInfo.MiddleName,
            LastName:this.personInfo.LastName,
            Gender:this.personInfo.Gender,
            DateOfBirth:this.personInfo.DateOfBirth,
            Age:this.personInfo.Age,
            Flat_BungalowNo:this.personInfo.Flat_BungalowNo,
            SocietyName:this.personInfo.SocietyName,
            StreetName_AreaName:this.personInfo.StreetName_AreaName,
            City:this.personInfo.City,
            State:this.personInfo.State,
            PinCode:this.personInfo.PinCode,
            PhoneNo:this.personInfo.PhoneNo,
            MobileNo:this.personInfo.MobileNo,
            PhysicalDisability:this.personInfo.PhysicalDisability,
            MaritalStatus:this.personInfo.MaritalStatus,
            EducationStatus:this.personInfo.EducationStatus,
            BirthSign:this.personInfo.BirthSign,
            UserId:sessionStorage.getItem('userId')
      
    };
    console.log(prd);
    this.serv
      .postPersonData(prd).subscribe((resp)=>{
          console.log(resp.json());
      })
      error => console.log(error.status);
  }
}
