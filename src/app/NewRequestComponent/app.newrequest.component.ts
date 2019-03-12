import { Component, OnInit } from "@angular/core";
import { UserService } from "./../services/app.loginservice";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.newrequestview.html"
})
export class NewRequestComponent implements OnInit {
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
  requestArr: string[];


  constructor(private serv: UserService, private router: Router) {}

  ngOnInit(): void {
    this.serv.getTempData().subscribe(resp => {
      localStorage.getItem("token");
      console.log(resp.json());
      this.requestArr = resp.json().data;
    });
  }

  onApproveClick(p){

    alert("Approve button clicked");
   console.log(p);

   this.serv
       .CreateNewUser(p).subscribe((resp)=>
       {
        localStorage.getItem('token');
        console.log(resp.json());
        });
    alert("deleting user from TEMPORARY DB");
    this.serv
        .DeleteTempUser(p).subscribe((resp)=>{
          localStorage.getItem('token');
          console.log(resp.json());
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
