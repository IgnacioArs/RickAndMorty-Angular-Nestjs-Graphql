import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; // Para simular una llamada HTTP o lógica asíncrona
import { PersonajeObservableService } from '../../services/personaje-observable.service';


@Component({
  selector: 'app-lista',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './formMaterial.component.html',
  styleUrl: './formMaterial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMaterialComponent {
  personajeForm: FormGroup;
  nombre: FormControl;
  estado: FormControl;
  especie: FormControl;
  tipo: FormControl;
  genero: FormControl;
  fechaCreacion: FormControl;

  //señal para activar boton
  botonEnable = signal<boolean>(false);
  
  //utilizamos el service donde creamos el observable personajeObservable
  private observableServicePersonajeService = inject(PersonajeObservableService)

  constructor() {
    // Inicializando los controles con validadores
    this.nombre = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]);
    this.estado = new FormControl('', Validators.required);
    this.especie = new FormControl('', Validators.required);
    this.tipo = new FormControl('', Validators.required);
    this.genero = new FormControl('', Validators.required);
    this.fechaCreacion = new FormControl('', Validators.required);

    this.personajeForm = new FormGroup({
      nombre: this.nombre,
      estado: this.estado,
      especie: this.especie,
      tipo: this.tipo,
      genero: this.genero,
      fechaCreacion: this.fechaCreacion,
    });
  }

  ngOnInit() {
    // Detectamos cambios en el formulario y agregamos un retraso de 3 segundos
    this.personajeForm.valueChanges
      .pipe(
        debounceTime(1000), // Esperar 3 segundos después de que se haya detenido la escritura
        distinctUntilChanged(), // Solo reaccionar cuando haya cambios reales
        switchMap((value) => {
          // Simulamos una llamada a un servicio o una acción asincrónica
          console.log('Formulario cambiado:', value);

          return of(value); // Retornamos un observable (simulando lógica asincrónica)
        })
      )
      .subscribe((value) => {
        // Aquí puedes hacer algo después de los 3 segundos, como enviar el formulario
        if (this.personajeForm.valid) {
          console.log('Formulario enviado después de 3 segundos: VALIDO', value);
          this.botonEnable.set(true);
        }else{
          console.log('Formulario enviado después de 3 segundos: NO VALIDO', value);
          this.botonEnable.set(false);
        }
       
      });
  }

  // Método para manejar el envío del formulario
  handleCrearPersonaje() {
    if (this.personajeForm.valid) {
      console.log('Personaje Guardado:', this.personajeForm.value);
      this.observableServicePersonajeService.updatePersonajeObservable(this.personajeForm.value)
      alert('Personaje guardado correctamente!');
    } else {
      console.log('Formulario inválido');
      alert('Por favor, complete todos los campos.');
    }
  }

  // Método para manejar cambios en el formulario (opcional, como un validador asíncrono)
  validateNombreAsync(control: FormControl) {
    return this.nombre.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        return of(value);
      })
    );
  }
}
