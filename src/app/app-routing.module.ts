import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { NoAuthGuard } from './no-auth-guard.service';
import { WeeksComponent } from './weeks/weeks.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { LoginComponent } from './login/login.component';
import { WeekService } from './week.service';

const routes: Routes = [
    { path: '', component: WeeksComponent, canActivate: [AuthGuard] },
    { path: 'shopping', component: ShoppingComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, NoAuthGuard],
})

export class AppRoutingModule { };
