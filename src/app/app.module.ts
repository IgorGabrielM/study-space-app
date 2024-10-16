import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignUpPageModule} from "./sign-up/sign-up.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./data/services/auth.service";
import {CommonModule} from "@angular/common";
import {SignInPageModule} from "./sign-in/sign-in.module";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environment} from "../environments/environment";
import {StorageModule} from "@angular/fire/storage";
import {ComponentsModule} from "./componentes/components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SignUpPageModule,
    SignInPageModule,
    StorageModule,
    ComponentsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    AuthService,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
