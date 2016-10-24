import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Transition } from 'ui-router-ng2';
import WeekService from './week.service';

export const loginState = {name: 'login', url: '/login', component: LoginComponent};
export const homeState = {
  name: 'home', url: '/:weekId', component: HomeComponent, resolve: [
    {
      token: 'weekId',
      deps: [Transition, WeekService],
      resolveFn: (trans, weekService: WeekService) =>
      trans.params().weekId || weekService.getCurrentWeekId()
    }
  ]
};
