import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;
  subscription: Subscription

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;

    })
    this.store.dispatch( cargarUsuarios()) ;

    // this.usuarioService.getUsers( ).subscribe((usuarios) => this.usuarios = usuarios);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
