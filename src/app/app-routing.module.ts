import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { NotFoundComponent } from './shared/components/not-found/not-found.component'


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule)},
  //TODO:  разобраться почему не работает
  // {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
