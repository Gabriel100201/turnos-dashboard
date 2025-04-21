export type SelectOption = {
  label: string;
  value: string | number;
};

export type FieldType = "text" | "number" | "textarea" | "icon" | "select";

export type EstadoColors = "green" | "red" | "yellow" | "blue";

export interface EstadoColumn {
  name: string;
  values: {
      label: string;
      color: EstadoColors;
    }[];
  };

export interface EntityField {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: FieldType;
  options?: SelectOption[];
  valueType?: "string" | "number";
  estadoColumn?: EstadoColumn;
}


export interface EntityConfig<T> {
  name: string
  namePlural: string
  fields: EntityField[]
  getDisplayName?: (item: T) => string
  getIdField?: (item: T) => number
  emptyState: Partial<T>
}

