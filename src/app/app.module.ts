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

import { ExperienceComponent } from './anonymous/body/experience/experience.component';
import { AppRoutingModule } from './anonymous/anonymous-routing.module';
import { HomeComponent } from './anonymous/body/home.component';
import { GooglyEyeComponent } from './anonymous/fun/googly-eye/googly-eye.component';
import { ExperienceCardComponent } from './anonymous/body/experience/experience-card/experience-card.component';
import { ProjectsComponent } from './anonymous/body/projects/projects.component';
import { ProjectCardComponent } from './anonymous/body/projects/project-card/project-card.component';

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
    ImpDialogComponent,
    SkillGridComponent,
    SkillCardComponent,
    FooterCardComponent,
    ExperienceComponent,
    GooglyEyeComponent,
    ExperienceCardComponent,
    ProjectsComponent,
    ProjectCardComponent,
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
