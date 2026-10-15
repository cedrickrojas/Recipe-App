import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { LandingHeroComponent } from './landing-hero.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss',
  imports: [RouterLink, IonContent, LandingHeroComponent],
})
export class LandingPage {}
