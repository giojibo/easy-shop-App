import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() productoId!: number; 
  comentarioForm: FormGroup;
  calificacion: number = 0; // Inicializa la calificación en 0

  constructor(private fb: FormBuilder, private comentariosService: ComentariosService) {
    this.comentarioForm = this.fb.group({
      usuario: ['', Validators.required],
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
    if (this.comentarioForm.valid) 
    {
      const comentarioData = {
        ...this.comentarioForm.value,
        productoId : this.productoId,
        calificacion: this.calificacion // Asegúrate de enviar la calificación seleccionada
      };
      console.log('Datos enviados: ', comentarioData); 

      this.comentariosService.registrarComentario(comentarioData).subscribe({
        next: (response) => {
          console.log('Comentario enviado', response);
        this.comentarioForm.reset(); // Restablece el formulario después de enviar
        this.calificacion = 0;
        },
       error: (error)=>{
        console.error('Error al enviar comentario: ', error );
       }
        });
    }else{
      console.log('Formulario no válido');
    }
  }
}