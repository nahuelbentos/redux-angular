import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user:Usuario ;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .pipe( filter( ({user}) => user != null) )
      .subscribe( ({ user }) => this.user = user);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout = () => this.authService.logout().then( () => this.router.navigate(['/login']));

}
