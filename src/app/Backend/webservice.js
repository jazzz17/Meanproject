var express = require("express");
// 1a. load the 'path' module. This will be used by "static" middleware
// of express. The 'path' is standard node module
var path = require("path");

// 1b. import the data-module
//var dataModel = require("./datamodel");

//1 import the product model
// 1c. load the body-parser
var bodyParser = require("body-parser");

// 1d. loading mongoose driver
var mongoose = require("mongoose");
// 1e. set the global promise to manage all async calls
// made by application using mongoose driver

//Javascript web token
var jwt= require("jsonwebtoken");
mongoose.Promise = global.Promise;
// 1f. load cors package
var cors = require("cors");
// 2. define an instance of express
var instance = express();

// 3. configure all middlewares, call "use()" method on express instance
// 3a. static files
instance.use(
  express.static(path.join(__dirname, "./../node_modules/jquery/dist/"))
);

// 3b. define express-router, for seggrigating
// urls for html page web requests and rest api requests
var router = express.Router();
// 3c. add the router object in the express middleware
instance.use(router);
// 3d. configure the body-parser middleware
// 3d.1 use urlencoded as false to read data from http url
// as querystring,formmodel etc.
instance.use(bodyParser.urlencoded({ extended: false }));
// 3d.2 use the json() parser for body-Parser
instance.use(bodyParser.json());

// 3e. configure cors() for the express
instance.use(cors());
// 4. create web request handlers
// 4a. This will return the home.html from views folder
router.get("/home", function(req, resp) {
  resp.sendFile("home.html", {
    root: path.join(__dirname, "./../views")
  });
});

// 5. Model-Schema-Mapping with collection on Mongo DB and
// establishing collection with it.'
mongoose.connect(
  "mongodb://localhost/PersonInformation",
  { useNewUrlParser: true }
);

// 5a. get the connection object
// if dbConnect is not undefined then the connection is successful
var dbConnect = mongoose.connection;
if (!dbConnect) {
  console.log("Sorry Connection is not established");
  return;

}
// 5b. define schema (recommended to have same
// attributes as per the collection)
var userSchema = mongoose.Schema({
UserId:Number,
Email:String,
 UserName:String,
 Password:String,
 RoleId:String,
});

var roleSchema  = mongoose.Schema({
    RoleId:String,
    RoleName:String
})

var operatorSchema = mongoose.Schema({
  UserId:String,
  UserName:String,
  Password:String,
  Email:String,
  RoleId:String
})

var tempSchema = mongoose.Schema({
  UserId:Number,
  UserName:String,
  Password:String,
  Email:String,
  RoleId:String

})

var temppersonSchema = mongoose.Schema({
            PID :Number,
            FirstName:String,
            MiddleName:String,
            LastName:String,
            Gender:String,
            DateOfBirth:String,
            Age:String,
            Flat_BungalowNo:String,
            SocietyName:String,
            StreetName_AreaName:String,
            City:String,
            State:String,
            PinCode:String,
            PhoneNo:String,
            MobileNo:String,
            PhysicalDisability:String,
            MaritalStatus:String,
            EducationStatus:String,
            BirthSign:String,
            UserId:String,
})

var fixedpersonSchema = mongoose.Schema({
  PID :String,
  FirstName:String,
  MiddleName:String,
  LastName:String,
  Gender:String,
  DateOfBirth:String,
  Age:String,
  Flat_BungalowNo:String,
  SocietyName:String,
  StreetName_AreaName:String,
  City:String,
  State:String,
  PinCode:String,
  PhoneNo:String,
  MobileNo:String,
  PhysicalDisability:String,
  MaritalStatus:String,
  EducationStatus:String,
  BirthSign:String,
  UserId:String,
})

var personSchema = mongoose.Schema({
  PID :String,
  FirstName:String,
  MiddleName:String,
  LastName:String,
  Gender:String,
  DateOfBirth:String,
  Age:String,
  Flat_BungalowNo:String,
  SocietyName:String,
  StreetName_AreaName:String,
  City:String,
  State:String,
  PinCode:String,
  PhoneNo:String,
  MobileNo:String,
  PhysicalDisability:String,
  MaritalStatus:String,
  EducationStatus:String,
  BirthSign:String,
  UserId:String,

  });


// load the validate module
//var authLogic = require("./validate");

// 5c. map the schema with the collection
//                                name        schema          collection
var userModel = mongoose.model("Users", userSchema, "Users");
var roleModel = mongoose.model("Role",roleSchema,"Role");
var tempuserModel = mongoose.model("Temp",tempSchema,"Operator");
var temppersonModel = mongoose.model("TempInfo",temppersonSchema,"TempPerson")
var fixedpersonModel = mongoose.model("FixedInfo",fixedpersonSchema,"Person")
var personModel=mongoose.model("Person",personSchema,"Person");

var jwtSettings={ jwtSecret:"jagruti12345"};

//set the secret with express object
instance.set("jwtSecret",jwtSettings.jwtSecret);


instance.post("/api/users/auth", function(request, response) {
  // parsing posted data to JSON
  var user = {
    UserName: request.body.UserName,
    Password: request.body.Password
  };

  console.log("In auth user" + JSON.stringify(user));

  userModel.findOne(user, function(err, usr) {
    // console.log(usr.Username);
    if (err) {
      console.log("Error occured");
      throw err;
    }

    if (usr) {
      var uId= usr.UserId;
      // console.log("in else if" + JSON.stringify(usr));
      console.log("" + usr.RoleId+""+usr.UserName);
      var token = jwt.sign({ usr }, instance.get("jwtSecret"), {
        expiresIn: 3600
      });

      roleModel.findOne({ RoleId: usr.RoleId }, function(err, data) {
        if (err) {
          console.log(err);
        }
        else if (data) {
          var RoleName = data.RoleName;
          console.log("Role Name "+data.RoleName);
          response.send({
            authenticated: true,
            message: "Login Success",
            token: token,
            role: RoleName,
            uId: uId
          });
        } else {
          response.send({
            statusCode: 403,
            message: "Role Not found"
          });
        }
      });
    } else {
      response.send({
        statusCode: 403,
        message: "User Not found"
      });
    }
  });
});


instance.get("/api/persons", function(request, response) {
  // use "params" property of request object to read
  // url parameter
  var tokenReceived =request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived,instance.get("jwtSecret"),function(err,decoded){
    console.log("In Verify");
    if (err){
      console.log("In auth error");
      response.send({success:false,message:"Token Verification failed"});
    } else{
      console.log("in auth success");
      request.decoded = decoded;
      personModel.find().exec(function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode, error:err});
        }
        response.send({status:200, data:res});
      });
    }
  });
});

instance.listen(4070, function() {
  console.log("started listening on port 4070");
});

instance.get("/api/operator", function(request, response) {
  // use "params" property of request object to read
  // url parameter
  var tokenReceived =request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived,instance.get("jwtSecret"),function(err,decoded){
    console.log("In Verify");
    if (err){
      console.log("In auth error");
      response.send({success:false,message:"Token Verification failed"});
    } else{
      console.log("in auth success");
      request.decoded = decoded;
      tempuserModel.find().exec(function(err,res){
        if(err){
          response.statusCode=500;
          response.send({status:response.statusCode, error:err});
        }
        response.send({status:200, data:res});
      });
    }
  });
});

instance.post("/api/createNewUser", function(request,response){
  var tokenReceived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
    console.log("in verify");
    console.log(request.body.UserId + "  testing id")
    if (err) {
      console.log("In auth error");
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;

      user={
          UserId: request.body.UserId,
          UserName: request.body.UserName,
          Email: request.body.Email,
          Password: request.body.Password,
          RoleId: request.body.RoleId
      }
       userModel.create(user, function(err, res) {
        if (err) {
          response.statusCode = 500;
          response.send({ status: response.statusCode, error: err });

        }
        response.send({ status: 200, data: res });
      });
    }
  });
});


instance.delete("/api/deleteTempUser:UserId", function(request, response) {
  console.log("Deletin the user from Temporary DB");
  console.log(request.params.UserId);
  //var prd = { ProductId: request.params.id };

  var tokenReceived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
    //console.log("in verify");
    if (err) {
      //console.log("In auth error");
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
             user={
              UserId: request.params.UserId,
              // UserName: request.params.UserName,
              // Email: request.body.Email,
              // Password: request.body.Password,
              // RoleId: request.body.RoleId
            }
            console.log(user.UserId+"  user testing");
      tempuserModel.deleteOne({'UserId':user.UserId}, function(err, res) {
        if (err) {
          response.statusCode = 500;
          response.send({ status: response.statusCode, error: err });
        }
        response.send({ status: 200, data: res });
      });
    }
  });
});

instance.delete("/api/deleteTempPersonInfo:UserId", function(request, response) {
  console.log("Deletin the user from Temporary DB");
  var tokenReceived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      var user={   
        UserId: request.params.UserId,
      }
      console.log(user.UserId+"  user testing");
      temppersonModel.deleteOne({'UserId':user.UserId}, function(err, res) {
        if (err) {
        console.log(err);
          response.statusCode = 500;
          response.send({ status: response.statusCode, error: err });
        }
        response.send({ status: 200, data: res });
      });
    }
  });
});


instance.delete("/api/deletePermPerson:UserId", function(request, response) {
  console.log("Deletin the user from Temporary DB");
  var tokenReceived = request.headers.authorization.split(" ")[1];
  jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
    if (err) {
      response.send({ success: false, message: "Token verification failed" });
    } else {
      request.decoded = decoded;
      var user={   
        UserId: request.params.UserId,
      }
      console.log(user.UserId+"  user testing");
      fixedpersonModel.deleteOne({'UserId':user.UserId}, function(err, res) {
        if (err) {
        console.log(err);
          response.statusCode = 500;
          response.send({ status: response.statusCode, error: err });
        }
        response.send({ status: 200, data: res });
      });
    }
  });
});



instance.post("/operator/auth",function(request,response){
  var prd= {
    UserId:request.body.UserId,
    UserName:request.body.UserName,
    Password:request.body.Password,
    Email:request.body.Email,
    RoleId:request.body.RoleId
  };
  tempuserModel.create(prd,function(err,res){
    if(err){
      response.statusCode=500;
      response.send(err);
    }
    response.send({statusCode:200,data:res});
  });
});

instance.post("/api/searchUserInfo",function(request,response){
  console.log("in api");
  var uId=request.body.UserId;
  fixedpersonModel.findOne({UserId:uId},function(err,res){
    if(err){
     console.log(err)
    }
    else if(res){
      var personD=JSON.stringify(res);
      console.log(personD+"is found");
      response.send({
        data:res,
        status:401,
      });
    }
      else{
        response.send(
          {status:403,  
            flag:1,
          statusCode:"No role found"
      });
      }
    });
  });

  instance.post("/createTempInfo/auth", function(request, response) {
    var tokenReceived = request.headers.authorization.split(" ")[1];
    jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
      console.log("in verify");
      if (err) {
        console.log("In auth error");
        response.send({ success: false, message: "Token verification failed" });
      } else {
        request.decoded = decoded;
        
        var prd={   
          PID :request.body.PID,
          FirstName:request.body.FirstName,
          MiddleName:request.body.MiddleName,
          LastName:request.body.LastName,
          Gender:request.body.Gender,
          DateOfBirth:request.body.DateOfBirth,
          Age:request.body.Age,
          Flat_BungalowNo:request.body.Flat_BungalowNo,
          SocietyName:request.body.SocietyName,
          StreetName_AreaName:request.body.StreetName_AreaName,
          City:request.body.City,
          State:request.body.State,
          PinCode:request.body.PinCode,
          PhoneNo:request.body.PhoneNo,
          MobileNo:request.body.MobileNo,
          PhysicalDisability:request.body.PhysicalDisability,
          MaritalStatus:request.body.MaritalStatus,
          EducationStatus:request.body.EducationStatus,
          BirthSign:request.body.BirthSign,
          UserId:request.body.UserId,
           
        }
         temppersonModel.create(prd, function(err, res) {
          if (err) {
            response.statusCode = 500;
            response.send({ status: response.statusCode, error: err });
            
          }
          response.send({ status: 200, data: res });
        });
      }
    });
  });

  instance.post("/api/FindTempPersonInfo",function(request,response){
    console.log("in api");
    var uId=request.body.UserId;
    console.log(uId);
    temppersonModel.findOne({UserId:uId},function(err,res){
      if(err){
       console.log(err)
      }
      else if(res){
        var personD=JSON.stringify(res);
        console.log(personD+"is found");
        response.send({
          data:res
        });
      }
        else{
          response.send(
            {status:403,
            statusCode:"No role found"
        });
        }
      });
    });

    instance.post("/createTempPersonInfo/auth", function(request, response) {
      var tokenReceived = request.headers.authorization.split(" ")[1];
      jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
        console.log("in verify");
        if (err) {
          console.log("In auth error");
          response.send({ success: false, message: "Token verification failed" });
        } else {
          request.decoded = decoded;
          
          var prd={   
            PID :request.body.PID,
            FirstName:request.body.FirstName,
            MiddleName:request.body.MiddleName,
            LastName:request.body.LastName,
            Gender:request.body.Gender,
            DateOfBirth:request.body.DateOfBirth,
            Age:request.body.Age,
            Flat_BungalowNo:request.body.Flat_BungalowNo,
            SocietyName:request.body.SocietyName, 
            StreetName_AreaName:request.body.StreetName_AreaName,
            City:request.body.City,
            State:request.body.State,
            PinCode:request.body.PinCode,
            PhoneNo:request.body.PhoneNo,
            MobileNo:request.body.MobileNo,
            PhysicalDisability:request.body.PhysicalDisability,
            MaritalStatus:request.body.MaritalStatus,
            EducationStatus:request.body.EducationStatus,
            BirthSign:request.body.BirthSign,
            UserId:request.body.UserId,
             
          }
           temppersonModel.create(prd, function(err, res) {
            if (err) {
              response.statusCode = 500;
              response.send({ status: response.statusCode, error: err });
              
            }
            response.send({ status: 200, data: res });
          });
        }
      });
    });
  
    instance.get("/api/getTempPersonInfo", function(request, response) {
      // use "params" property of request object to read
      // url parameter
      var tokenReceived =request.headers.authorization.split(" ")[1];
      jwt.verify(tokenReceived,instance.get("jwtSecret"),function(err,decoded){
        console.log("In Verify");
        if (err){
          console.log("In auth error");
          response.send({success:false,message:"Token Verification failed"});
        } else{
          console.log("in auth success");
          request.decoded = decoded;
          temppersonModel.find().exec(function(err,res){
            if(err){
              response.statusCode=500;
              response.send({status:response.statusCode, error:err});
            }
            response.send({status:200, data:res});
          });
        }
      });
    });

    instance.put("/api/updatePersonInfo", function(request, response) {
      var uId=request.body.UserId;
      var prd={   
        PID :request.body.PID,
        FirstName:request.body.FirstName,
        MiddleName:request.body.MiddleName,
        LastName:request.body.LastName,
        Gender:request.body.Gender,
        DateOfBirth:request.body.DateOfBirth,
        Age:request.body.Age,
        Flat_BungalowNo:request.body.Flat_BungalowNo,
        SocietyName:request.body.SocietyName,
        StreetName_AreaName:request.body.StreetName_AreaName,
        City:request.body.City,
        State:request.body.State,
        PinCode:request.body.PinCode,
        PhoneNo:request.body.PhoneNo,
        MobileNo:request.body.MobileNo,
        PhysicalDisability:request.body.PhysicalDisability,
        MaritalStatus:request.body.MaritalStatus,
        EducationStatus:request.body.EducationStatus,
        BirthSign:request.body.BirthSign,
        UserId:request.body.UserId,
      }
      tokenReceived = request.headers.authorization.split(" ")[1];
      jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded)
    {
      console.log("in verify");
      if (err) {
      console.log("in auth error");
      response.send({ success: false, message: "Token verification failed"
    });
      } 
      else {
      console.log("in auth success");
      request.decoded = decoded;
      temppersonModel.findOne({UserId:uId},function(err, res) {
      if (err) {
      response.statusCode = 500;
      response.send({ status: response.statusCode, error: err });
      }
      if(res){
      fixedpersonModel.updateOne({UserId:uId},prd,function(err,res)
    {
    if (err) {
    response.statusCode = 500;
    response.send({ status: response.statusCode, error: err });
    }
    else{
    response.send({ status: 401, data: res });
    }
    }); 
      }
      })
    }
    
      });
    });

    

instance.post("/api/createNewPersonInfo", function(request,response){
      var tokenReceived = request.headers.authorization.split(" ")[1];
      jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
        console.log("in verify");
        if (err) {
          console.log("In auth error");
          response.send({ success: false, message: "Token verification failed" });
        } else {
          request.decoded = decoded;
          
          var prd={   
            PID :request.body.PID,
            FirstName:request.body.FirstName,
            MiddleName:request.body.MiddleName,
            LastName:request.body.LastName,
            Gender:request.body.Gender,
            DateOfBirth:request.body.DateOfBirth,
            Age:request.body.Age,
            Flat_BungalowNo:request.body.Flat_BungalowNo,
            StreetName_AreaName:request.body.StreetName_AreaName,
            City:request.body.City,
            State:request.body.State,
            PinCode:request.body.PinCode,
            PhoneNo:request.body.PhoneNo,
            MobileNo:request.body.MobileNo,
            PhysicalDisability:request.body.PhysicalDisability,
            MaritalStatus:request.body.MaritalStatus,
            EducationStatus:request.body.EducationStatus,
            BirthSign:request.body.BirthSign,
            UserId:request.body.UserId,
          }
           fixedpersonModel.create(prd, function(err, res) {
            if (err) {
              response.statusCode = 500;
              response.send({ status: response.statusCode, error: err });
              
            }
            response.send({ status: 200, data: res });
          });
        }
      });
    });
    
  var personSchema = mongoose.Schema({
  });

  instance.post("/api/searchPermPerson",function(request,response){
    console.log("in apiiiiiiiiiiiiiii");
    var uId=request.body.UserId;
    console.log(uId+"hfhfh");
    fixedpersonModel.findOne({UserId:uId},function(err,res){
      if(err){
       console.log(err)
      }
      else if(res){
        var personD=JSON.stringify(res);
        console.log(personD+"is found");
        response.send({
          data:res,
          status:401
        });
      }
        else{
          response.send(
            {status:403,
            statusCode:"No role found"
        });
        }
      });
    });

    instance.post("/api/SearchUser",function(request,response){
      var pid=request.body.PID;
      var tokenReceived = request.headers.authorization.split(" ")[1];
      jwt.verify(tokenReceived, instance.get("jwtSecret"), function(err, decoded) {
        console.log("in verify");
        if (err) {
          console.log("In auth error");
          response.send({ success: false, message: "Token verification failed" });
        }else{
          request.decoded = decoded;
     
      console.log(pid+"saerching for this");
      
      fixedpersonModel.findOne({PID:pid},(err,data)=>{
        if(err){
          console.log(err);
        }
        else if(data){
          response.send({
            data:data,
            status:401
          });
        }
          else{
            response.send({
                status:404
            });
          }
        
      });
    }
      });
    });
  