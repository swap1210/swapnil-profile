import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { UserRoleDirective } from './directives/user-role.directive';
import { UserDirective } from './directives/user.directive';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderComponent } from './app/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirebaseOptions } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompressedMatModule } from './compressed-mat/compressed-mat.module';
import { GooglyEyeComponent } from './fun/googly-eye/googly-eye.component';
import { ImpDialogComponent } from './app/imp-dialog/imp-dialog.component';
import { SkillGridComponent } from './skill-comp/skill-grid/skill-grid.component';
import { SkillCardComponent } from './skill-comp/skill-grid/skill-card/skill-card.component';
import { FooterCardComponent } from './app/footer/footer-card/footer-card.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    BrowserAnimationsModule,
    CompressedMatModule,
  ],
  exports: [UserDirective, UserRoleDirective],
  providers: [AuthService, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
