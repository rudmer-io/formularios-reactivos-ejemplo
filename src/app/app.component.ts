import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestServiceService } from './services/test-service.service';
import { AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { error } from 'console';
import { RemoveLeadingZerosPipe } from './remove-leading-zeros.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { HideSensitiveInfoPipe } from './hide-sensitive-info.pipe';
import { SortByPipe } from './sort-by.pipe';
import { Item, items } from './Item';
import { forkJoin } from 'rxjs';

export function edadMayorQue18Validator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const edad = control.value;
    if (edad !== null && isNaN(edad)) {
      return { notANumber: true };
    }
    return edad > 18 ? null : { menorQue18: true };
  };
}

export function fechaRangoValidator(controlName: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      const fecha = control.value;

      if (fecha) {
        const fechaTimestamp = new Date(fecha).getTime();
        const minDate = new Date('2024-04-15').getTime();
        const maxDate = new Date('2024-04-20').getTime();

        if (fechaTimestamp < minDate || fechaTimestamp > maxDate) {
          const errorKey =
            controlName === 'fechaDesde'
              ? 'rangoInvalidoDesde'
              : 'rangoInvalidoHasta';
          resolve({ [errorKey]: true });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RemoveLeadingZerosPipe,
    CapitalizePipe,
    HideSensitiveInfoPipe,
    SortByPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;

  /* items: Item[] = items; */

  amount = 5600;
  fecha = new Date();
  nombre = 'Rudmer';
  ciudad = 'LIMA';
  ficha = '00873';
  a: number = 0.259;
  b: number = 1.3495;
  empresa = 'La ciudad es BELLA compañeros';
  /* birthday = new Date('2000-01-01'); */

  birthday = new Date(1988, 3, 15); // April 15, 1988 -- since month parameter is zero-based
  toggle = false;
  puedeAprobarReportes = false;

  get format() {
    return this.toggle ? 'mediumDate' : 'fullDate';
  }

  toggleFormat() {
    this.toggle = !this.toggle;
  }

  productos = [
    {
      id: 1,
      name: 'iPhone 13',
      price: 1000,
    },
    {
      id: 2,
      name: 'Xiaomi mi ultra',
      price: 2000,
    },
    {
      id: 3,
      name: 'ZTE nubia red dragon',
      price: 3000,
    },
    {
      id: 4,
      name: 'Infinix Note 14 pro + 5G',
      price: 4000,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestServiceService
  ) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      edad: ['', [Validators.required, edadMayorQue18Validator()]],
      email: ['', [Validators.required, Validators.email]],
      fechaDesde: ['', Validators.required, fechaRangoValidator('fechaDesde')],
      fechaHasta: ['', Validators.required, fechaRangoValidator('fechaHasta')],
      areaGrupo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
    this.obtenerItems();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formulario válido');
      console.log(this.myForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  tareas: any[] = [];
  reservaciones: any[] = [];

  /* getFromApi() {
    this.testService.getFromApi().subscribe((data: Object) => {
      this.todos = data as any[];
    });
  } */

  obtenerTareas() {
    this.testService.getFromApi().subscribe((res: Object) => {
      this.tareas = res as any[];
    });
  }

  items: any[] = [];
  obtenerItems() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bGlhbmFAZ21haWwuY29tMiIsImlhdCI6MTcxMzc5Nzg1NywiZXhwIjoxNzEzODg0MjU3fQ.x2cfvvQkuNfJuSLfI7sgZMI7eU2N0-cK453lCRe45cY';
    this.testService.getItems(token).subscribe((res: Object) => {
      this.items = res as any[];
    });
  }
  nuevoItem: any = {};
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bGlhbmFAZ21haWwuY29tMiIsImlhdCI6MTcxMzc5Nzg1NywiZXhwIjoxNzEzODg0MjU3fQ.x2cfvvQkuNfJuSLfI7sgZMI7eU2N0-cK453lCRe45cY';
  crearItem() {
    this.testService.createItem(this.token, this.nuevoItem).subscribe(
      (respuesta) => {
        console.log('Ítem creado exitosamente:', respuesta);

        this.nuevoItem = {};
      },
      (error) => {
        console.error('Error al crear el ítem:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  updateItem(id: number) {
    this.testService
      .updateItem(this.token, id, this.nuevoItem)
      .subscribe((respuesta) => {
        console.log('Ítem actualizado exitosamente:', respuesta);
      });
  }

  llenarFormulario(item: any) {
    this.nuevoItem = { ...item };
  }
}
