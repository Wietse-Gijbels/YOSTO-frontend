import { Routes } from '@angular/router';
import {HomeComponent} from "./Home/home.component";
import {FavorietenComponent} from "./favorieten/favorieten.component";
import {ScholenComponent} from "./scholen/scholen.component";
import {VeelGesteldeVragenComponent} from "./veel-gestelde-vragen/veel-gestelde-vragen.component";

export const routes: Routes = [{
  path: '',
children:[
  {path: '',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'favorieten',component: FavorietenComponent},
  {path: 'scholen',component: ScholenComponent},
  {path: 'veelGesteldeVragen',component: VeelGesteldeVragenComponent}
]
}];
