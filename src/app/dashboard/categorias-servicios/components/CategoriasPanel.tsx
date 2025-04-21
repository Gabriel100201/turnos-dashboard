import { CardComponent } from "@/components/CardComponent";
import { TableComponent } from "@/components/TableComponent";
import { menu_categoria as Categoria } from "@prisma/client";

interface CategoriaCardProps {
  categorias: Categoria[];
  selectedCategoria: number | null;
  handleCategoriaClick: (categoriaId: number) => void;
  flexSpace?: 1 | 2 | 3 | 4;
}

export const CategoriasCard = ({ categorias, selectedCategoria, handleCategoriaClick, flexSpace }: CategoriaCardProps) => {
  return (
    <CardComponent style={{ padding: "1rem", flex: flexSpace || 1 }}>
      <TableComponent
        clickable
        columns={["tag", "descripcion"]}
        data={categorias}
        onRowClick={(row) => handleCategoriaClick(row.id_categoria)}
        placeHolder="No hay categorías disponibles"
        selectedCategoria={selectedCategoria}
      />
    </CardComponent>
  );
};
