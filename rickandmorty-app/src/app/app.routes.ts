import { provideRouter, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FavoritoComponent } from './pages/favorito/favorito.component';
import { ListaComponent } from './pages/lista/lista.component';

export const routes: Routes = [
    { path: '', redirectTo: '/header', pathMatch: 'full' },
    { path: 'header', component: HeaderComponent },
    { path: 'favorito', component: FavoritoComponent },
    { path: 'listado', component: ListaComponent },
];


export const appConfig = {
  providers: [
    provideRouter(routes) // Registra las rutas
  ]
};

