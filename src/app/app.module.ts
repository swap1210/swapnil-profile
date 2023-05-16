import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirebaseOptions } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompressedMatModule } from './compressed-mat/compressed-mat.module';
import { ImpDialogComponent } from './imp-dialog/imp-dialog.component';

import { AppRoutingModule } from './anonymous_v2/anonymous-routing.module';
import { HomeComponent } from './anonymous_v2/body/home.component';
import { FooterComponent } from './anonymous_v2/footer/footer.component';
import { HeaderComponent } from './anonymous_v2/header/header.component';
import { FooterCardComponent } from './anonymous_v2/footer/footer-card/footer-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ImpDialogComponent,
    FooterCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    BrowserAnimationsModule,
    CompressedMatModule,
  ],
  exports: [],
  providers: [AuthService, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
