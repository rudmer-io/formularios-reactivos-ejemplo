import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestServiceService } from './services/test-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;

  /*  productos: any[] = []; */

  productos = [
    {
      id: 1,
      name: 'iPhone 13',
      price: 1000,
    },
    {
      id: 2,
      name: 'iPhone 14',
      price: 2000,
    },
    {
      id: 3,
      name: 'iPhone 15',
      price: 3000,
    },
    {
      id: 4,
      name: 'iPhone 16',
      price: 4000,
    },
    {
      id: 5,
      name: 'iPhone 17',
      price: 5000,
    },
    {
      id: 6,
      name: 'iPhone 18',
      price: 6000,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestServiceService
  ) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getFromApi();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formulario válido');
      console.log(this.myForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  getFromApi() {
    this.testService.getFromApi().subscribe((data) => console.log(data));
  }
}
