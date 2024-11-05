import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarioForm: FormGroup;
  calificacion: number = 0; // Inicializa la calificación en 0

  constructor(private fb: FormBuilder, private comentariosService: ComentariosService) {
    this.comentarioForm = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      calificacion: [0, Validators.required] // Valida que haya una calificación
    });
  }

  ngOnInit(): void {
    // Cualquier inicialización que necesites
  }

  setCalificacion(valor: number): void {
    this.calificacion = valor;
    this.comentarioForm.patchValue({ calificacion: valor });
  }

  submitComment(): void {
    if (this.comentarioForm.valid) {
      const comentarioData = {
        ...this.comentarioForm.value,
        calificacion: this.calificacion // Asegúrate de enviar la calificación seleccionada
      };
      this.comentariosService.registrarComentario(comentarioData).subscribe(response => {
        console.log('Comentario enviado', response);
        this.comentarioForm.reset(); // Restablece el formulario después de enviar
        this.calificacion = 0; // Resetea la calificación
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
