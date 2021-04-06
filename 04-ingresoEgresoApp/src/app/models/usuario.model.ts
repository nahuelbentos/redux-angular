export class Usuario {

  static fromFirebase = ({uid, nombre, email}) => new Usuario(uid, nombre, email);

  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ) {
  }
}

