import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterModule, RouterLink, RouterLinkActive,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private store = inject(Store<{ app: AppState }>);
  dataSignal = signal<any>(null);

  constructor() {
    effect(() => {
      this.store.select((state) => state.app.data).subscribe((data) => {
        console.log('Nuevo estado en Navbar:', data);
        this.dataSignal.set(data);
      });
    });
  }
}



 

