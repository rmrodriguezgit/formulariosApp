import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedeSerStrider( control: FormControl) {
    const valor: string = control.value?.trim().toLowerCase();
    if ( valor === 'strider') {
      return {
        noStrider: true
      }
      
    }

    return null;
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required ]],
  },{
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })


  get  emailErrorMsg() : string{
      const errors = this.miFormulario.get('email')?.errors;
      if (errors?.['required'] ) {
        return 'Email es obligatorio';
      } else if (errors?.['pattern']) {
        return 'El email no tiene un formato valido';
      } else if (errors?.['emailTomado']) {
        return 'El email ya fue registrado';
      }

      return '';
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService
    ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Rubs Mik',
      email: 'test1@test.com',
      username: 'mirodrig'
    })
  }

  

  campoNoValido( campo: string) {
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.touched 
           && this.miFormulario.get('email')?.errors?.['required'];
    
  }

  emailFormato() {
    return this.miFormulario.get('email')?.touched 
           && this.miFormulario.get('email')?.errors?.['pattern'];
    
  }

  emailTomado() {
    return this.miFormulario.get('email')?.touched 
           && this.miFormulario.get('email')?.errors?.['emailTomado'];
    
  }

  submitFormulario() {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();

  }

}
