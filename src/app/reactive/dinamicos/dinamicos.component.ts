import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group ({
    nombre      : [ , [Validators.required, Validators.minLength(3)] ],
    favoritos   : this.fb.array([
      [ 'Metal Gear' ],
      [ 'Death Stranding' ]
    ], Validators.required)
  })

nuevoFavorito: FormControl = this.fb.control('',Validators.required);

get favoritosArr() {
  return this.miFormulario.get('favoritos') as FormArray;
}

  constructor(private fb: FormBuilder ) { }


  ngOnInit(): void {
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched;
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid ) { return; }

    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    //opción 2
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ));

    this.nuevoFavorito.reset();

  }

  borrar(elemento: number) {
    this.favoritosArr.removeAt( elemento );
  }

  guardar() {
    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }
      console.log(this.miFormulario.value);
  }

}
