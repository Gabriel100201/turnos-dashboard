"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { serviciosConfig } from "../../servicios/servicios-config";

import { addRelacion } from "@/actions/categorias_servicios/addRelation"
import { getRelacionesByCategoria } from "@/actions/categorias_servicios/getRelacionesByCategoria"
import { deleteRelacion } from "@/actions/categorias_servicios/deleteRelation"

import { EntityTable } from "@/components/crud/entity-table"
import { CardComponent } from "@/components/CardComponent"
import { ServicioSearch } from "./ServiciosSearch"

import type { Servicios } from "@/types/servicios"
import type { RelacionCategoriaServicio } from "@/types/categoria_servicio"

interface ServiciosCardProps {
  flexSpace?: 1 | 2 | 3 | 4;
}

export function CategoriaServiciosPanel({ flexSpace }: ServiciosCardProps) {
  const searchParams = useSearchParams()
  const categoriaIdParam = searchParams.get("categoria")
  const categoriaId = categoriaIdParam ? parseInt(categoriaIdParam) : null

  const [servicios, setServicios] = useState<Servicios[]>([])
  const [relaciones, setRelaciones] = useState<RelacionCategoriaServicio[]>([])

  const fetchServicios = useCallback(async () => {
    if (!categoriaId) return
    const res = await getRelacionesByCategoria(categoriaId)
    if (res.success && Array.isArray(res.data)) {
      const relacionesTyped = res.data.map((r) => ({
        id_serv_cat: r.id_serv_cat,
        servicio: r.menu_servicios,
      }))
      setRelaciones(relacionesTyped)
      setServicios(relacionesTyped.map((r) => r.servicio))
    }
  }, [categoriaId])

  const handleUnlink = async (relacionId: number) => {
    await deleteRelacion(relacionId)
    fetchServicios()
  }

  const handleDelete = async (servicioId: number) => {
    const relacion = relaciones.find((r) => r.servicio.id === servicioId)
    if (relacion) {
      await handleUnlink(relacion.id_serv_cat)
    }
  }

  const handleAsociar = async (servicioId: number) => {
    if (!categoriaId) return
    await addRelacion(categoriaId, servicioId)
    await fetchServicios()
  }

  useEffect(() => {
    fetchServicios()
  }, [categoriaId, fetchServicios])

  const serviciosAsociadosIds = new Set(servicios.map((s) => s.id))

  return (
    <CardComponent style={{ flex: flexSpace || 1 }}>
      {categoriaId ? (
        <>
          <ServicioSearch
            serviciosAsociadosIds={serviciosAsociadosIds}
            onAsociar={handleAsociar}
          />
          <EntityTable
            items={servicios}
            config={serviciosConfig}
            onItemChange={fetchServicios}
            deleteAction={handleDelete}
            columns={["titulo", "estado_servicio"]}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground text-xl">
            Seleccione una categoría
          </p>
        </div>
      )}
    </CardComponent>
  );
}
