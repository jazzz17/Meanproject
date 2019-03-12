 import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './LoginComponent/app.login.component';
import { AdminComponent } from './AdminComponent/app.admin.component';
import { UserComponent } from './UserComponent/app.user.component';
import { OperatorComponent } from './OperatorComponent/app.operator.component';
import { NewRequestComponent} from './NewRequestComponent/app.newrequest.component';
import { addPersonInfoComponent} from './addPersonInfoComponent/app.addPersonInfo.component'; 
import { UpdateInfoComponent} from './UpdateInfoComponent/app.updateinfo.component';
import { NewInfoRequestComponent } from './NewInfoRequestComponent/app.newinforequest.component';

const routes: Routes = [
  {path: '', component : LoginComponent},
  { path :'adminHome', component: AdminComponent},
  { path : 'accessUser',component : UserComponent},
  { path: 'operatorHome', component: OperatorComponent},
  { path : 'newRequest', component : NewRequestComponent},
  {path : 'UpdateInfo', component : UpdateInfoComponent },
  { path : 'addPersonInfo', component : addPersonInfoComponent},
{path:'newInfoRequest',component:NewInfoRequestComponent}
]

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
