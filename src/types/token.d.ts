export interface TokenPayload {
  id: number;
  correo: string;
  tipo_usuario: 'NORMAL' | 'PLUS';
  exp: number;
  iat: number;
}
