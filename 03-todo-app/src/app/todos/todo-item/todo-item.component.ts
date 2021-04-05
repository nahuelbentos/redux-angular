import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { toggle, editar, borrar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') inputFisico: ElementRef;

  checkCompletado: FormControl;
  textoInput: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.textoInput = new FormControl(this.todo.texto, Validators.required);

    this.checkCompletado.valueChanges.subscribe( value =>  {
      console.log( value );

    })
  }

  editar = () => {
    this.editando = true;
    this.textoInput.setValue( this.todo.texto );
    setTimeout(() => {
      this.inputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion = () => {
    this.editando = false;
    if(this.textoInput.valid && this.textoInput.value !== this.todo.texto){
      this.store.dispatch( editar( { id: this.todo.id, texto: this.textoInput.value } ) );
    }
  }

  completar = () => this.store.dispatch( toggle( { id: this.todo.id } ) );

  borrar = () => this.store.dispatch( borrar( { id: this.todo.id } ) );

}
