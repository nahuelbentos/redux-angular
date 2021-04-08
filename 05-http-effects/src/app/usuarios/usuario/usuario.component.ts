import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuario: Usuario;

  subscription:Subscription

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>) {}
  ngOnInit(): void {

    this.subscription = this.store.select('usuario').subscribe( ({ user }) => this.usuario = user)

    this.router.params.subscribe(({ id }) =>
      this.store.dispatch(cargarUsuario({ id }))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
