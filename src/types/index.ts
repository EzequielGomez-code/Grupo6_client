export type AuthData = {
  username: string;
  password: string;
};

export type FormDataCredenciales = {
  usuario: string;
  contrasena: string;
  confirmarContrasena: string;
}

export type FormRegisterMotorcycle = {
  cedula: string;
  nombreCompleto: string;
  telefono: string;
  email: string;
  tipoDeMoto: string;
  placaMoto: string;
  modeloMoto: string;
  descripcionServicio: string;
};

export type EstadoSolicitud = 'Recibido' | 'En proceso' | 'Listo';

export type Solicitud = {
  id: number;
  cedula: string;
  nombreCompleto: string;
  telefono: string;
  email?: string;
  tipoDeMoto: string;
  placaMoto: string;
  modeloMoto?: string;
  descripcionServicio: string;
  estado: EstadoSolicitud;
  fecha?: string;
}

export type EstadoMoto = 'Recibido' | 'En proceso' | 'Listo';

export type ResultadoBusqueda = {
  id: number | string;
  cliente: string;
  cedula: string;
  moto: string;
  servicio: string;
  fechaIngreso: string;
  estado: EstadoMoto;
  detalles?: string;
  fechaEstimada?: string;
  precioTotalDOP?: number;
}

export type ConsultarMoto = {
  cedula: string;
  codigoMoto: string;
};

export type PreciosPreviewProps = {
  descripcion: string;
};

export type PiezaDetectada = {
  nombre: string;
  precioDOP: number;
};

export type PrecioEstimadoResponse = {
  precioDOP: number;
};

export type AnalisisDescripcionResponse = {
  piezasDetectadas: PiezaDetectada[];
  totalDOP: number;
};
