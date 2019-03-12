import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  { Router } from '@angular/router';
import { UserService} from './../services/app.loginservice';
import { User } from './../models/app.login.model.component';
import { Response} from '@angular/http';

@Component({
 selector:'app-root',
 templateUrl : './app.updateinfoview.html'

})


export class UpdateInfoComponent implements OnInit {
   
    fuser ={
        PID :Number,
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
 
let uid=sessionStorage.getItem("userId");
console.log(uid+"user id of this user");
let user={UserId:sessionStorage.getItem("userId")}

//Now search in the Person DB if the The Personal Info is PRESENT OR NOT
//based on the "UserId"
this.serv
           this.serv.SearchUserInfo(user).subscribe((resp)=>{
            localStorage.getItem("token");
            console.log(resp.json());
            this.fuser=(resp.json().data);
           })
   }



 onClickUpdate(e) {
    alert("hello in update")

    let prd = {  
            UserId:sessionStorage.getItem("userId"),
      
    };
    this.serv
      .FindTempPersonInfo(prd).subscribe((resp)=>{
        console.log(resp.json());
        console.log(resp.json().status);
      if(resp.json().status===403){

        let person ={
        PID:((<HTMLInputElement>document.getElementById('PID')).value),
        FirstName:((<HTMLInputElement>document.getElementById('FirstName')).value),
        MiddleName:((<HTMLInputElement>document.getElementById('MiddleName')).value),
        LastName:((<HTMLInputElement>document.getElementById('LastName')).value),
        Gender:((<HTMLInputElement>document.getElementById('Gender')).value),
        DateOfBirth:((<HTMLInputElement>document.getElementById('DateOfBirth')).value),
          Age:((<HTMLInputElement>document.getElementById('Age')).value),
          Flat_BungalowNo:((<HTMLInputElement>document.getElementById('Flat_BungalowNo')).value),
          SocietyName:((<HTMLInputElement>document.getElementById('DateOfBirth')).value),
          StreetName_AreaName:((<HTMLInputElement>document.getElementById('SocietyName')).value),
          City:((<HTMLInputElement>document.getElementById('City')).value),
          State:((<HTMLInputElement>document.getElementById('State')).value),
          PinCode:((<HTMLInputElement>document.getElementById('PinCode')).value),
          PhoneNo:((<HTMLInputElement>document.getElementById('PhoneNo')).value),
          MobileNo:((<HTMLInputElement>document.getElementById('MobileNo')).value),
          PhysicalDisability:((<HTMLInputElement>document.getElementById('PhysicalDisability')).value),
          MaritalStatus:((<HTMLInputElement>document.getElementById('MaritalStatus')).value),
          EducationStatus:((<HTMLInputElement>document.getElementById('EducationStatus')).value),
          BirthSign:((<HTMLInputElement>document.getElementById('BirthSign')).value),
          UserId:sessionStorage.getItem("userId")
  
      }
      
    console.log(person);
    this.serv
            .createTempPersonInfo(person).subscribe((resp)=>{
              console.log(resp.json());
              console.log(resp.json().status);
            })
            error=>console.log(error.status);
            alert("Update Request Sent");
            this.router.navigate(['/UpdateInfo']);
            //END
                        
          }
          else{
                 alert("RECOrd present in temporary db");
              }


                error=>console.log(error);
                        
        
              }) 
     }//on update close
     
    
}
