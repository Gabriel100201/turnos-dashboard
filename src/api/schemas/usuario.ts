/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * API Turnos Online
 * Documentacióin de la API para gestión de turnos y consultorios
 * OpenAPI spec version: 1.0.0
 */
import type { UsuarioTipoUsuario } from './usuarioTipoUsuario';

export interface Usuario {
  id?: number;
  nombre?: string;
  correo?: string;
  telefono?: string;
  tipo_usuario?: UsuarioTipoUsuario;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}
