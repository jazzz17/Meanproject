import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './LoginComponent/app.login.component';
import { UserService } from './services/app.loginservice';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './AdminComponent/app.admin.component';
import { UserComponent } from './UserComponent/app.user.component';
import { OperatorComponent } from './OperatorComponent/app.operator.component';
import { NewRequestComponent } from './NewRequestComponent/app.newrequest.component';
import { UpdateInfoComponent } from './UpdateInfoComponent/app.updateinfo.component';
import { addPersonInfoComponent } from './addPersonInfoComponent/app.addPersonInfo.component';
import { NewInfoComponent } from './NewInfoComponent/app.newinfo.component';
import { NewInfoRequestComponent } from './NewInfoRequestComponent/app.newinforequest.component';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    OperatorComponent,
    NewRequestComponent,
    UpdateInfoComponent,
    addPersonInfoComponent,
    NewInfoComponent,
    NewInfoRequestComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
