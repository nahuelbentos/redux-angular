
import { Reducer, Action } from './ngrx-fake/ngrx';
import { contadorReducer } from './contador/contador.reducer';
import { incrementadorAction, multiplicarAction } from './contador/contador.actions';

class Store<T> {
  
  constructor(
    private reducer: Reducer<T>,
    private state: T
    ) {
    
  }

  getState(){
    return this.state;
  }

  dispatch(action: Action){

    this.state = this.reducer( this.state, action );

  }
}


const store = new Store( contadorReducer, 10 );

console.log( store.getState() );

store.dispatch( incrementadorAction );

console.log( store.getState() );


store.dispatch( multiplicarAction );

console.log( store.getState() );