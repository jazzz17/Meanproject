import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { User } from "./../models/app.login.model.component";

@Injectable()
export class UserService {
  url: string;
  constructor(private http: Http) {
    this.url = "http://localhost:4070";
  }

  postData(user): Observable<Response> {
    let resp: Observable<Response>;
    //1>define request header
    let header: Headers = new Headers({ "Content-type": "application/json" });
    //header.append("AUTHORIZATION",Basic Username:Password");
    // 2. define request options for headers
    //collection of header values
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/auth`,
      JSON.stringify(user),
      options
    );
    console.log(JSON.stringify(resp));
    return resp;
  }

  getData(): Observable<Response> {
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({
      "Content-type": "application/json",
      Authorization: to
    });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.get(`${this.url}/api/persons`,
    options);
    console.log(JSON.stringify(resp));
    return resp;
  }


  getTempData():Observable<Response>{
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({
      "Content-type": "application/json",
      Authorization: to
    });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.get(`${this.url}/api/operator`,
    options);
    console.log(JSON.stringify(resp));
    return resp;
  }

  CreateNewUser(newuser):Observable<Response> {
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/createNewUser`,
      JSON.stringify(newuser),
      options
    );
    console.log(JSON.stringify(resp));
    return resp;
  }

DeleteTempUser(newuser):Observable<Response>{
  alert("in delete");
  alert(newuser.UserId);
  console.log(newuser);
  var to = localStorage.getItem("token");
  console.log(to);
  let resp: Observable<Response>;
  let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
  let options: RequestOptions = new RequestOptions();
  options.headers = header;
  alert(`${this.url}/api/deleteTempUser${newuser.UserId}`);
  resp=this.http.delete(`${this.url}/api/deleteTempUser${newuser.UserId}`,options);
  return resp;
  }

  
DeleteTempPersonInfo(p):Observable<Response>{
  alert("in delete");
  console.log(p.UserId);
  var to = localStorage.getItem("token");
  console.log(to);
  let resp: Observable<Response>;
  let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
  let options: RequestOptions = new RequestOptions();
  options.headers = header;
  alert(`${this.url}/api/deleteTempPersonInfo`);
  resp=this.http.delete(`${this.url}/api/deleteTempPersonInfo${p.UserId}`,options);
  return resp;
  }

  DeletePermPersonInfo(p):Observable<Response>{
    alert("in delete");
    console.log(p.UserId);
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    alert(`${this.url}/api/deletePermPersonInfo`);
    resp=this.http.delete(`${this.url}/api/deletePermPersonInfo${p.UserId}`,options);
    return resp;
    }

postTempData(operator):Observable<Response> {
      var to = localStorage.getItem("token");
      console.log(to);
      let resp: Observable<Response>;
      let header: Headers = new Headers({ "Content-type": "application/json", Authorization :to });
      let options: RequestOptions = new RequestOptions();
      options.headers = header;
      resp = this.http.post(
        `${this.url}/operator/auth`,
        JSON.stringify(operator),
        options
      );
      console.log(JSON.stringify(resp));
      return resp;
    }

    SearchUserInfo(user):Observable<Response>{
      var to = localStorage.getItem("token");
      console.log(to);
      console.log(JSON.stringify(user));
      let resp: Observable<Response>;
      let header: Headers = new Headers({ "Content-type": "application/json", Authorization :to });
      let options: RequestOptions = new RequestOptions();
      options.headers = header;
      resp = this.http.post(
        `${this.url}/api/searchUserInfo`,
        JSON.stringify(user),
        options
      );
      console.log(JSON.stringify(resp));
      return resp;

  
    }

    postPersonData(prd):Observable<Response>{
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({ "Content-type": "application/json", Authorization :to });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/createTempInfo/auth`,
      JSON.stringify(prd),
      options
    );
    console.log(JSON.stringify(resp));
    return resp;
    
}

FindTempPersonInfo(prd):Observable<Response>{
  var to = localStorage.getItem("token");
  console.log(to);
  let resp: Observable<Response>;
  let header: Headers = new Headers({ "Content-type": "application/json", Authorization :to });
  let options: RequestOptions = new RequestOptions();
  options.headers = header;
  resp = this.http.post(
    `${this.url}/api/FindTempPersonInfo`,
    JSON.stringify(prd),
    options
  );
  console.log(JSON.stringify(resp));
  return resp;
  
}

createTempPersonInfo(person):Observable<Response>{
  var to = localStorage.getItem("token");
  console.log(to);
  let resp: Observable<Response>;
  let header: Headers = new Headers({ "Content-type": "application/json", Authorization :to });
  let options: RequestOptions = new RequestOptions();
  options.headers = header;
  resp = this.http.post(
    `${this.url}/createTempPersonInfo/auth`,
    JSON.stringify(person),
    options
  );
  console.log(JSON.stringify(resp));
  return resp;
}

getTempPersonInfo():Observable<Response>{
  var to = localStorage.getItem("token");
  console.log(to);
  let resp: Observable<Response>;
  let header: Headers = new Headers({
    "Content-type": "application/json",
    Authorization: to
  });
  let options: RequestOptions = new RequestOptions();
  options.headers = header;
  resp = this.http.get(`${this.url}/api/getTempPersonInfo`,
  options);
  console.log(JSON.stringify(resp));
  return resp;
}

UpdatePersonInfo(p):Observable<Response>{
  var to = localStorage.getItem("token");
  let resp: Observable<Response>;
  let header:Headers=new Headers({"Content-type":"application/json",Authorization: to});
  let options:RequestOptions=new RequestOptions();
  options.headers=header;
  resp=this.http.put(`${this.url}/api/updatePersonInfo`,JSON.stringify(p),options);
  return resp;
}


  CreateNewPersonInfo(p):Observable<Response> {
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/createNewPersonInfo`,
      JSON.stringify(p),
      options
    );
    console.log(JSON.stringify(resp));
    return resp;
  }

  SearchUser(userid):Observable<Response> {
    var to = localStorage.getItem("token");
    console.log(to);
    let resp: Observable<Response>;
    let header: Headers = new Headers({ "Content-type": "application/json", "Authorization" :to });
    let options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/SearchUser`,
      JSON.stringify(userid),
      options
    );
    console.log(JSON.stringify(resp));
    return resp;
  }
}