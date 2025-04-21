/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditEntityDialog } from "./edit-entity-dialog";
import { DeleteEntityAlert } from "./delete-entity-alert";
import type { EntityConfig, EstadoColors } from "./types";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface EntityTableProps<T> {
  items: T[];
  config: EntityConfig<T>;
  onItemChange: () => void;
  updateAction?: (id: number, data: Partial<T>) => Promise<unknown>;
  deleteAction?: (id: number) => Promise<unknown>;
  columns?: string[];
}

const colorClasses: Record<EstadoColors, string> = {
  red: "bg-red-200 text-red-800",
  green: "bg-green-200 text-green-800",
  yellow: "bg-yellow-200 text-yellow-800",
  blue: "bg-blue-200 text-blue-800",
};

export function EntityTable<T>({
  items,
  config,
  onItemChange,
  updateAction,
  deleteAction,
  columns,
}: EntityTableProps<T>) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  console.log(isMobile);
  const tableColumns =
    columns ||
    config.fields
      .filter((field) => field.type !== "textarea")
      .slice(0, 3)
      .map((field) => field.name);

  const estadoColumn = config.fields.find((field) => field?.estadoColumn?.name);
  const estadoColumnInfo = estadoColumn?.estadoColumn;

  if (isMobile) {
    return (
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="py-6 text-muted-foreground text-center">
            No hay {config.namePlural.toLowerCase()} disponibles
          </div>
        ) : (
          items.map((item) => {
            const id =
              config.getIdField?.(item) ??
              (item as any).id ??
              (item as any).id_categoria;

            return (
              <div
                key={String(id)}
                className="space-y-2 bg-white shadow-sm p-4 border rounded-xl"
              >
                {tableColumns.map((column) => {
                  const isEstado = column === estadoColumn?.name;
                  const estadoValue = (item as any)[column];
                  const estadoColor = estadoColumnInfo?.values.find(
                    (v) => v.label === estadoValue
                  )?.color;

                  return (
                    <div key={column} className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {config.fields.find((f) => f.name === column)?.label}:
                      </span>
                      {isEstado ? (
                        <span
                          className={`h-3 w-3 rounded-full ${
                            estadoColor === "green"
                              ? "bg-green-500"
                              : estadoColor === "red"
                              ? "bg-red-500"
                              : estadoColor === "yellow"
                              ? "bg-yellow-500"
                              : estadoColor === "blue"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                          title={estadoValue}
                        />
                      ) : (
                        <span className="text-sm">{estadoValue}</span>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end gap-2 pt-2">
                  {updateAction && (
                    <EditEntityDialog
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      updateAction={updateAction}
                    />
                  )}
                  {deleteAction && (
                    <DeleteEntityAlert
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      deleteAction={deleteAction}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  // Vista de escritorio con tabla
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableColumns.map((column) => {
            const field = config.fields.find((f) => f.name === column);
            return (
              <TableHead
                key={column}
                className={column === tableColumns[0] ? "w-[200px]" : ""}
              >
                {field?.label || column.toUpperCase()}
              </TableHead>
            );
          })}
          <TableHead className="w-[120px] text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length + 1}
              className="py-6 text-muted-foreground text-center"
            >
              No hay {config.namePlural.toLowerCase()} disponibles
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow
              key={String(
                config.getIdField?.(item) ??
                  (item as any).id ??
                  (item as any).id_categoria
              )}
            >
              {tableColumns.map((column) => {
                const isEstado = column === estadoColumn?.name;
                const estadoValue = (item as any)[column];
                const estadoColor = estadoColumnInfo?.values.find(
                  (v) => v.label === estadoValue
                )?.color;
                const estadoClass = estadoColor
                  ? colorClasses[estadoColor]
                  : "";

                return (
                  <TableCell
                    key={column}
                    className={column === tableColumns[0] ? "font-medium" : ""}
                  >
                    {isEstado ? (
                      <span
                        className={`${estadoClass} px-2 py-1 rounded-md text-xs`}
                      >
                        {estadoValue.toUpperCase()}
                      </span>
                    ) : (
                      estadoValue
                    )}
                  </TableCell>
                );
              })}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {updateAction && (
                    <EditEntityDialog
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      updateAction={updateAction}
                    />
                  )}
                  {deleteAction && (
                    <DeleteEntityAlert
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      deleteAction={deleteAction}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
