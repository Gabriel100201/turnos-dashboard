import { menu_categoria } from "@prisma/client";

type Categoria = menu_categoria;
type CategoriaBasicInfo = Omit<Categoria, "id_categoria"> & Partial<Pick<Categoria, "id_categoria">>;

export { Categoria, CategoriaBasicInfo };