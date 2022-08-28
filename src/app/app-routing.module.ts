import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { AuthGuard } from './app-routing.guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { Role } from './models/role';
import { CommonService } from './services/common.service';
import {
	AngularFireAuthGuard,
	hasCustomClaim,
	redirectUnauthorizedTo,
	redirectLoggedInTo,
	canActivate,
	AuthPipe,
} from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const adminOnly: AuthPipe = map((user) => {
	if (user && user.uid) {
		//check in firestore if this uid exists
		console.log('user.uid', user.uid);
		return user.uid == 'WCWBz46VZQfgEsrB3niPv0Id0mD2';
	} else {
		return false;
	}
});
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'profile',
				component: ProfileComponent,
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'login',
				component: LoginComponent,
			},
		],
	},
	{
		path: 'admin',
		canLoad: [AuthGuard],
		canActivate: [AuthGuard],
		data: {
			roles: [Role.Admin],
		},
		loadChildren: () =>
			import('./admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard, CommonService],
})
export class AppRoutingModule {}
