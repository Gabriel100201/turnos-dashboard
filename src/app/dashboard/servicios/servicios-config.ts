import type { EntityConfig, EntityField } from "@/components/crud";
import type { menu_servicios as Servicio } from "@prisma/client";
import { getOrganismosOptions } from "@/actions/organismos/getOrganismos";

// ⚙️ Campos base, con options vacías para dinámico
const baseFields: EntityField[] = [
  {
    name: "titulo",
    label: "Título",
    placeholder: "Ingrese el título del servicio",
    required: true,
  },
  {
    name: "subtitulo",
    label: "Subtítulo",
    placeholder: "Ingrese el subtítulo del servicio",
  },
  {
    name: "icono",
    label: "Icono",
    placeholder: "Nombre del icono (ej: user, home, etc.)",
    type: "icon",
  },
  {
    name: "resumen",
    label: "Resumen",
    placeholder: "Ingrese un resumen del servicio",
    type: "textarea",
  },
  {
    name: "id_organismo",
    label: "Organismo",
    placeholder: "Seleccione un organismo",
    type: "select",
    valueType: "number",
    options: [], // dinámico
  },
  {
    name: "tipo_componente",
    label: "Tipo de Componente",
    placeholder: "Ingrese el tipo de componente",
  },
  {
    name: "id_menu",
    label: "ID Menú",
    placeholder: "Ingrese el ID del menú",
  },
  {
    name: "roles",
    label: "Roles",
    placeholder: "Ingrese los roles permitidos",
  },
  {
    name: "estado_servicio",
    label: "Estado",
    placeholder: "Ingrese el estado del servicio",
    type: "select",
    options: [
      { value: "activo", label: "Activo" },
      { value: "deshabilitado", label: "Deshabilitado" },
      { value: "mantenimiento", label: "En mantenimiento" },
    ],
    estadoColumn: {
      name: "estado_servicio",
      values: [
        { label: "activo", color: "green" },
        { label: "deshabilitado", color: "red" },
        { label: "mantenimiento", color: "yellow" },
      ]
    },
  },
];

// 📦 Config base exportada
export const serviciosConfig: EntityConfig<Servicio> = {
  name: "Servicio",
  namePlural: "Servicios",
  fields: baseFields,
  emptyState: {
    titulo: "",
    subtitulo: "",
    icono: "",
    resumen: "",
    id_organismo: 1,
    tipo_componente: "",
    id_menu: "",
    roles: "",
    estado_servicio: "activo",
  },
};

// 📤 Versión extendida para Server Component con datos dinámicos
export async function getServiciosConfigWithOrganismos(): Promise<EntityConfig<Servicio>> {
  const organismosOptions = await getOrganismosOptions();

  const fields = serviciosConfig.fields.map((field) =>
    field.name === "id_organismo"
      ? { ...field, options: organismosOptions }
      : field
  );

  return {
    name: "Servicio",
    namePlural: "Servicios",
    fields,
    emptyState: serviciosConfig.emptyState,
  };
}
