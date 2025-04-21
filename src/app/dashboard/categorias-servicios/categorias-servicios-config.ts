import type { menu_servicios as Servicio } from "@prisma/client";
import type { EntityConfig, EntityField } from "@/components/crud";

// ⚙️ Campos base
const baseFields: EntityField[] = [
  { name: "titulo", label: "Título", type: "text" },
  { name: "subtitulo", label: "Subtítulo", type: "text" },
  { name: "estado_servicio", label: "Estado", type: "text" },
];

// 📦 Config base exportada
export const servicioCategoriaConfig: EntityConfig<Servicio> = {
  name: "Servicio",
  namePlural: "Servicios",
  fields: baseFields,
  emptyState: {
    titulo: "",
    subtitulo: "",
    estado_servicio: "",
  },
};

// 📤 Versión extendida para consistencia
export async function getServiciosCategoriaConfig(): Promise<EntityConfig<Servicio>> {
  return {
    name: "Servicio",
    namePlural: "Servicios",
    fields: baseFields,
    emptyState: servicioCategoriaConfig.emptyState,
  };
}
