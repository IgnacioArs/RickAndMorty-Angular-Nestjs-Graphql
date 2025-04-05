import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject,signal } from '@angular/core';
import { PersonajeInterface } from '../../interface/Personaje-Interface';
import { RickAndMortyComponent } from '../../components/rickandmorty/rickandmorty.component';
import { PersonajeFavoritoInterface } from '../../interface/Personaje-Favorito-Interface';
import { debounceTime, fromEvent, switchMap} from 'rxjs';
import { RickAndMortyService } from '../../services/rickandmorty.service';
import { PersonajeFavoritoService } from '../../services/personajeFavorito.service';
import { OriginLocationService } from '../../services/origin-location-residentes.service';
import { setData} from '../../store/app.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-header',
  imports: [NgFor,RickAndMortyComponent,CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

    reloadComponent= signal<boolean>(false);
    stopReloadComponent= signal<boolean>(false);

    //form group para formulario reactivo
    formularioReactivoBusqueda:FormGroup;
    idPersonajeBusqueda:FormControl;
    nombrePersonajeBusqueda:FormControl;

    // Inyección del servicio
    private rickAndMortyService = inject(RickAndMortyService);
    private personajeFavoritoService = inject(PersonajeFavoritoService);
    private originLocationService = inject(OriginLocationService);

    // Definir el array para usarlo en la plantilla
    personajesArraySignal = signal<PersonajeInterface[]>([]);

    //personaje seleccionado
    personajeSeleccionadoObjectSignalSelect = this.personajeFavoritoService.personajeFavoritoSeleccionadoSignal;
    //esto es para alterar la seleccion cuando seleccionamos un favorito
    enunciadoFavorito = signal("");

    //lista permanente de personajes
    arrayPersistentePersonajeArrayPersistence= this.rickAndMortyService.arrayPersistentePersonaje

    
    transformMethodPersonajeCompleto = this.originLocationService

    constructor(private store: Store) {
      
      //iniciamos los controladores de formulario
      this.idPersonajeBusqueda = new FormControl('', Validators.required);
      this.nombrePersonajeBusqueda = new FormControl('', Validators.required);

      this.formularioReactivoBusqueda = new FormGroup({
        idPersonajeBusqueda: this.idPersonajeBusqueda,
        nombrePersonajeBusqueda: this.nombrePersonajeBusqueda,
      });



    //cargamos los personajes
    this.cargarPersonajes();  

    effect(() => {

      //aqui tomamos la variable o el cambio en si
      this.reloadComponent=this.stopReloadComponent;
      console.log("VIENDO LA ACTUALIZACION EN ABSE A LA BUSQUEDA",this.reloadComponent());

      const personaje = this.personajeSeleccionadoObjectSignalSelect();
      if (personaje) {
        console.log("Guardando personaje favorito:", personaje);
        const checkbox = document.getElementById('flexCheckChecked') as HTMLInputElement;
        
        if (checkbox) {
          this.personajeSeleccionadoObjectSignal.set(personaje);
          checkbox.checked = true;  // Desmarcar el checkbox
        }
        this.enunciadoFavorito.set("Favorito ⭐")
      }
    });
  }

  
  ngOnInit() {
    
    //alteramos los componentes de manera rapida
    this.formularioReactivoBusqueda.valueChanges.subscribe(async (data) => {
      if(data?.idPersonajeBusqueda >=1){
        this.formularioReactivoBusqueda.get('nombrePersonajeBusqueda')?.setValue('',{ emitEvent: false });
      }else if(data?.nombrePersonajeBusqueda || data?.nombrePersonajeBusqueda !=''){
        this.formularioReactivoBusqueda.get('idPersonajeBusqueda')?.setValue('',{ emitEvent: false });
      }
      //aqui seteamos el cambio reactivo para el componente carga
      if(data?.idPersonajeBusqueda >=1 || data?.nombrePersonajeBusqueda){
        this.reloadComponent.set(true);
      }else{
        this.reloadComponent.set(false)
        this.cargarPersonajes()
      }
    })

    this.formularioReactivoBusqueda.valueChanges
    .pipe(
      debounceTime(2000),
    ).subscribe( async (data) => {
      if(data?.idPersonajeBusqueda >=1){
        let idPersonaje = parseInt(data?.idPersonajeBusqueda);
        const personajeEncontrado = await this.rickAndMortyService.obtenerPersonajePorID(idPersonaje);
        this.personajesArraySignal.set([personajeEncontrado]);
        this.stopReloadComponent.set(false);
        console.log("BUSQUEDA POR ID",[personajeEncontrado]);
      }else if(data?.nombrePersonajeBusqueda){
        const personajeEncontrados = await this.rickAndMortyService.obtenerPersonajePorNombre(data?.nombrePersonajeBusqueda);
        console.log("PERSONAJE ESCRITO Y ENCONTRADO",personajeEncontrados);
        this.personajesArraySignal.set(personajeEncontrados);
        this.stopReloadComponent.set(false);
        console.log("BUSQUEDA POR NONBRE",personajeEncontrados);
      }
    })


  }
  

  

  

    // Método asíncrono para cargar los personajes
    private async cargarPersonajes() {
      const personajes = await this.rickAndMortyService.obtenerTodosLosPersonajesQuery();
      if (Array.isArray(personajes)) {
        this.personajesArraySignal.set(personajes);
      } else {
        console.error("Los personajes obtenidos no son un array:", personajes);
      }
    }


  //seleccionar personaje de la lista cantidad 1
  personajeSeleccionadoObjectSignal = signal<PersonajeInterface | null>(null);

  async seleccionarPersonaje(personaje:PersonajeInterface){
    const checkbox = document.getElementById('flexCheckChecked') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;  // Desmarcar el checkbox
    }
    
    if(personaje.id ===this.personajeSeleccionadoObjectSignalSelect()?.id){
      if (checkbox) {
        checkbox.checked = true;  // Desmarcar el checkbox
      }
    }
      const personajeData = await this.transformMethodPersonajeCompleto.transFormMethod(personaje);
      this.personajeSeleccionadoObjectSignal.set(personajeData);
  }
 
  //para mapear el nombre con computed dejar lo en mayuscula
  personajeNameToUpperCaseCard = computed(()=>{
    const personaje = this.personajeSeleccionadoObjectSignal();
    if (personaje) {
      return personaje.name.toLocaleUpperCase();
    }
    return "";
  })


  // seccion seleccionar personaje favorito 
  personajeFavoritoSeleccionadoObjectSignal = signal<PersonajeFavoritoInterface | null>(null);

  ngAfterViewInit() {
    const checkbox = document.getElementById('flexCheckChecked') as HTMLInputElement;
  
    if (checkbox) {
      fromEvent(checkbox, 'change').subscribe((event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        
        // Verificamos si hay un personaje seleccionado
        const personajeSeleccionado = this.personajeSeleccionadoObjectSignal();
  
        // Si no hay un personaje seleccionado, desmarcamos el checkbox y no permitimos cambiar el estado
        if (!personajeSeleccionado && !this.personajeSeleccionadoObjectSignalSelect()) {
          checkbox.checked = false; // Desmarcamos el checkbox
          alert('Por favor, selecciona un personaje primero.'); // Opcional: mensaje informando al usuario
          return;
        }
        
        
        // Si el checkbox está marcado y hay un personaje seleccionado, lo guardamos como favorito
        if (isChecked) {
          this.personajeFavoritoSeleccionadoObjectSignal.set(personajeSeleccionado);
          this.personajeFavoritoService.personajeFavoritoSeleccionadoSignal.set(personajeSeleccionado); // 🔹 Usamos el servicio compartido
          this.store.dispatch(setData({ data: personajeSeleccionado })); //seteo al personaje ngrx
        } else {
          // Si se desmarca el checkbox, eliminamos el personaje favorito
          this.personajeFavoritoSeleccionadoObjectSignal.set(null);
          this.personajeFavoritoService.personajeFavoritoSeleccionadoSignal.set(null);
        }
      });
    }
  }
  

  

   //seccion busqueda por id y nombre
    idBuscarPersonaje = signal(0);
    nombreBuscarPersonaje = signal("");

    // Actualizar ID con el valor del input
    async actualizarId(event: Event)  {
      this.idBuscarPersonaje.set(Number((event.target as HTMLInputElement).value) || 0); 
      if(this.idBuscarPersonaje() > 0){
        this.nombreBuscarPersonaje.set("");
        this.personajesArraySignal.set([]);
      /*   realizar la busqueda por id */
      console.log("ID", this.idBuscarPersonaje());
      const personajeEncontrado = await this.rickAndMortyService.obtenerPersonajePorID(this.idBuscarPersonaje());
      console.log("PERSONAJE SELECCIONADO Y ENCONTRADO",personajeEncontrado)
      this.personajesArraySignal.set([personajeEncontrado]);
      //reiniciamos las tablas que muestran los totales
      }else if(this.idBuscarPersonaje()===0){
          this.personajesArraySignal.set(this.arrayPersistentePersonajeArrayPersistence());
      }
    }

    // Actualizar Nombre con el valor del input
    async actualizarNombre(event: Event) {
      this.nombreBuscarPersonaje.set((event.target as HTMLInputElement).value || ""); 
      if(this.nombreBuscarPersonaje()){
        this.idBuscarPersonaje.set(0);
        console.log("NOMBRE", this.nombreBuscarPersonaje());
        const personajeEncontrados = await this.rickAndMortyService.obtenerPersonajePorNombre(this.nombreBuscarPersonaje());
        console.log("PERSONAJE ESCRITO Y ENCONTRADO",personajeEncontrados);
        this.personajesArraySignal.set(personajeEncontrados);
      }else if(!this.nombreBuscarPersonaje()){
        this.personajesArraySignal.set(this.arrayPersistentePersonajeArrayPersistence());
      }
      
    }
  
    
    speciesArraySignal = signal<{ name: string; cantidad: number }[] | null>(null);
    typesArraySignal = signal<{ name: string; cantidad: number }[] | null>(null);
    
     estadoTabla = signal<boolean>(true);
        //  Calcular las especies
      calcularEspecies() {
        this.estadoTabla.set(!this.estadoTabla())
        console.log("EL PRIMER ESTADO",this.estadoTabla())
        if(this.estadoTabla() ===false){
          const especieArray = this.personajesArraySignal();

          if (!especieArray || especieArray.length === 0) {
            console.warn(" No hay datos de especies");
            return;
          }
  
          console.log(" Array de personajes:", especieArray);
  
          const resultadoEspecies = especieArray.reduce((acc, personaje) => {
            if (!personaje.species) return acc;
  
            if (!acc[personaje.species]) {
              acc[personaje.species] = { name: personaje.species, cantidad: 0 };
            }
            acc[personaje.species].cantidad += 1;
  
            return acc;
          }, {} as { [key: string]: { name: string; cantidad: number } });
  
          this.speciesArraySignal.set(Object.values(resultadoEspecies));
          console.log(" Especies calculadas:", this.speciesArraySignal());
          
        }else{
          this.speciesArraySignal.set(null)
         
        }
      }

      //  Calcular los tipos
      calcularTypes() {
        this.estadoTabla.set(!this.estadoTabla())
        console.log("this.estadoTabla()",this.estadoTabla())
        if(this.estadoTabla() ===false){
          const typesArray = this.personajesArraySignal();

          if (!typesArray || typesArray.length === 0) {
            console.warn(" No hay datos de tipos");
            return;
          }
  
          console.log(" Array de personajes:", typesArray);
  
          const resultadoTypes = typesArray.reduce((acc, personaje) => {
            if (!personaje.type) return acc;
  
            if (!acc[personaje.type]) {
              acc[personaje.type] = { name: personaje.type, cantidad: 0 };
            }
            acc[personaje.type].cantidad += 1;
  
            return acc;
          }, {} as { [key: string]: { name: string; cantidad: number } });
  
          this.typesArraySignal.set(Object.values(resultadoTypes));
          console.log(" Tipos calculados:", this.typesArraySignal());
        }else{
          this.typesArraySignal.set(null)
        }
      
      }
      
      



  }

