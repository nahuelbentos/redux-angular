import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MultiDataSet, Label } from 'ng2-charts';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  subscription: Subscription;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingreso', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica = (items: IngresoEgreso[]) => {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    items.forEach(({ tipo, monto }) => {
      if (tipo === 'ingreso') {
        this.totalIngresos += monto;
        this.ingresos++;
      } else {
        this.totalEgresos += monto;
        this.egresos++;
      }

      this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
    });
  };
}
