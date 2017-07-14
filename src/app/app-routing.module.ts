import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { NoAuthGuard } from './no-auth-guard.service';
import { WeeksComponent } from './weeks/weeks.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WeekService } from './week.service';

const routes: Routes = [
    { path: '', redirectTo: 'weeks', pathMatch: 'full' },
    { path: 'weeks', component: WeeksComponent, canActivate: [AuthGuard] },
    { path: 'week/:weekId', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, NoAuthGuard],
})

export class AppRoutingModule { };
