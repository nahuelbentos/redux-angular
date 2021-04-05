import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { crear } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  textoInput: FormControl;

  constructor(private store: Store<AppState>) {
    this.textoInput = new FormControl('', Validators.required);
   }

  ngOnInit(): void {
  }

  addTodo = ( ) => {
    this.textoInput.valid && this.store.dispatch( crear( { texto: this.textoInput.value } ) );
    this.textoInput.reset();
  }

}
