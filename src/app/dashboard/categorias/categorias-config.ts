import type { menu_categoria as Categoria } from "@prisma/client";
import type { EntityConfig, EntityField } from "@/components/crud";

const baseFields: EntityField[] = [
  {
    name: "tag",
    label: "TAG",
    placeholder: "Ingrese el tag de la categoría",
    required: true,
  },
  {
    name: "descripcion",
    label: "DESCRIPCIÓN",
    placeholder: "Ingrese la descripción de la categoría",
    required: true,
  },
];

export const categoriasConfig: EntityConfig<Categoria> = {
  name: "Categoría",
  namePlural: "Categorías",
  fields: baseFields,
  emptyState: {
    tag: "",
    descripcion: "",
  },
};

// Si en el futuro necesitás opciones dinámicas, podés agregar una función similar a esta:
// export async function getCategoriasConfig(): Promise<{ fields: EntityField[]; emptyState: Record<string, unknown> }> {
//   return { fields: baseFields, emptyState: categoriasConfig.emptyState };
// }
