"use client";

import type { TableComponentProps } from "@/types/table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableComponent = ({
  title,
  columns,
  clickable,
  data,
  onRowClick,
  placeHolder,
  selectedCategoria,
}: TableComponentProps) => {
  return (
    <Table>
      {data.length === 0 && (
        <TableCaption style={{ textAlign: "center" }}>
          {placeHolder ? placeHolder : "No data available"}
        </TableCaption>
      )}

      {data.length > 0 && (
        <>
          {title && <TableCaption>{title}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column.toUpperCase()}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`${
                  clickable ? "cursor-pointer hover:bg-muted" : ""
                } ${selectedCategoria === row.id_categoria ? "bg-muted" : ""}`}
              >
                {columns.map((column) => (
                  <TableCell key={column}>{row[column] ?? "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
};
