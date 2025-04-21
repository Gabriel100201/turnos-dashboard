"use client"

import type { menu_categoria as Categoria } from "@prisma/client"
import { getCategorias } from "@/actions/categorias/getCategorias"
import { addCategoria } from "@/actions/categorias/addCategoria"
import { updateCategoria } from "@/actions/categorias/updateCategoria"
import { deleteCategoria } from "@/actions/categorias/deleteCategoria"
import { EntityManager } from "@/components/crud"
import { categoriasConfig } from "../categorias-config"

export function CategoriasManager() {
  return (
    <EntityManager<Categoria>
      config={categoriasConfig}
      fetchItems={getCategorias}
      addAction={addCategoria}
      updateAction={updateCategoria}
      deleteAction={deleteCategoria}
    />
  )
}

