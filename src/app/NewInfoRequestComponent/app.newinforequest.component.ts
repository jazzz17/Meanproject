import { Component, OnInit } from "@angular/core";
import { UserService } from "./../services/app.loginservice";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.newinforequestview.html"
})
export class NewInfoRequestComponent implements OnInit {
  requestperson = {
    PID: "",
    FirstName: "",
    Gender: "",
    DateofBirth: "",
    Age: "",
    Address: "",
    City: "",
    State: "",
    PhoneNo: ""
  };
  personInfoArr: string[];


  constructor(private serv: UserService, private router: Router) {}

  ngOnInit(): void {
    var uId=sessionStorage.getItem("userId");
    console.log(uId+"User id of the current user")
      let tuser=this.serv.getTempPersonInfo().subscribe((resp)=>{
        this.personInfoArr=(resp.json().data);
   
      })
      error=>{
              console.log(`Error occured ${error.status}`);
              }

  }

onApproveClick(p){
this.serv.SearchUserInfo(p).subscribe((resp)=>{
console.log(resp.json());
console.log(resp.json().status);
if(resp.json().status===401){

  this.serv.UpdatePersonInfo(p).subscribe((resp)=>{
    console.log(resp.json());
    console.log(resp.json().status);
    alert("deleting user from TEMPORARY DB");
    this.serv.DeleteTempPersonInfo(p).subscribe((resp)=>{
    console.log(resp.json());
    console.log(resp.json().status);
    });  
});
}
else
{
this.serv.CreateNewPersonInfo(p).subscribe((resp)=>{
console.log(resp.json());
console.log(resp.json().status);
});
this.serv.DeleteTempPersonInfo(p).subscribe((resp)=>{
console.log(resp.json());
console.log(resp.json().status);
});
} 
}); 
}

onRejectClick(p){
    this.serv
        .DeleteTempUser(p).subscribe((resp)=>{
          localStorage.getItem('token');
          console.log(resp.json());
        });

  }



}
