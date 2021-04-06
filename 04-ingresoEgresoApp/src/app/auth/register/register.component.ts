import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription;

  get nombre() {
    return this.form.get('nombre');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  registrar = () => {
    // Swal.fire({
    //   title: 'Espere por favor',
    //   showConfirmButton: false,
    //   onBeforeOpen: () => Swal.showLoading(),
    // });

    this.store.dispatch( ui.isLoading() );

    this.authService
      .createUser(this.form.value)
      .then((credenciales) => {
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch((err) => {

        this.store.dispatch( ui.stopLoading() );

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      }
      );
  };
}
