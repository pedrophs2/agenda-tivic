import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Contato',
    loadChildren: () => import('./views/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'Contato/:id',
    loadChildren: () => import('./views/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'phone',
    loadChildren: () => import('./views/phone/phone.module').then( m => m.PhonePageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./views/address/address.module').then( m => m.AddressPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
