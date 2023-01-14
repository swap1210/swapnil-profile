import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { UserDirective } from './directives/user.directive';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './anonymous/footer/footer.component';
import { HeaderComponent } from './anonymous/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirebaseOptions } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompressedMatModule } from './compressed-mat/compressed-mat.module';
import { ImpDialogComponent } from './imp-dialog/imp-dialog.component';
import { SkillGridComponent } from './anonymous/body/skill-grid/skill-grid.component';
import { SkillCardComponent } from './anonymous/body/skill-grid/skill-card/skill-card.component';
import { FooterCardComponent } from './anonymous/footer/footer-card/footer-card.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ExperienceComponent } from './anonymous/body/experience/experience.component';
import { AppRoutingModule } from './anonymous/anonymous-routing.module';
import { HomeComponent } from './anonymous/body/home.component';
import { GooglyEyeComponent } from './fun/googly-eye/googly-eye.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    LoginComponent,
    UserDirective,
    UserRoleDirective,
    FooterComponent,
    HeaderComponent,
    GooglyEyeComponent,
    ImpDialogComponent,
    SkillGridComponent,
    SkillCardComponent,
    FooterCardComponent,
    ExperienceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    BrowserAnimationsModule,
    CompressedMatModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      showSubtitle: false,
      showUnits: false,
    }),
  ],
  exports: [UserDirective, UserRoleDirective],
  providers: [AuthService, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
