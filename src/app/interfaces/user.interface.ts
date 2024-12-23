export interface Vendedor {
    user: any;
    id: number,
    rol: string;
    first_name?: string;
    last_name?: string;
    email: string;
    edad: number;
    telefono: string;
    foto: string;
  }

  export interface Cliente {
    user: any;
    id: number,
    rol: string;
    first_name?: string;
    last_name?: string;
    email: string;
    edad: number;
    foto: string;
  }

  export interface Administrador{
    user: any; 
    clave_admin: number; 
    first_name?: string;
    last_name?: string; 
    email: string; 
    edad: number; 
  }
  