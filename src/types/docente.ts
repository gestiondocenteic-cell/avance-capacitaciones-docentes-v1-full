export type ObservacionLevel = 'Excelente' | 'Bueno' | 'Regular' | 'Bajo';

export interface SesionEstado {
  nombre: string;
  fecha: string;
  modalidad?: 'Virtual' | 'Presencial';
  asistio: boolean;
}

export interface CapacitacionDocente {
  id: string;
  titulo: string;
  completado: boolean;
  sesiones: SesionEstado[];
  criterioValidacion: string;
}

export interface Docente {
  id: string;
  dni: string;
  apellidosNombres: string;
  correo: string;
  capacitacionesTotal: number;
  porcentajeParticipacion: number;
  observacion: ObservacionLevel;
  capacitaciones: CapacitacionDocente[];
}

export interface CourseMetadata {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  modalidad: string;
  totalSesiones: number;
  criterioValidacion: string;
  color: string;
}
