/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { AddEntityDialog } from "./add-entity-dialog"
import { EntityTable } from "./entity-table"
import type { EntityConfig } from "./types"

interface EntityManagerProps<T> {
  config: EntityConfig<T>
  fetchItems: () => Promise<T[]>
  addAction: (data: Partial<T>) => Promise<unknown>
  updateAction: (id: number, data: Partial<T>) => Promise<unknown>
  deleteAction: (id: number) => Promise<unknown>
  columns?: string[]
}

export function EntityManager<T>({
  config,
  fetchItems,
  addAction,
  updateAction,
  deleteAction,
  columns,
}: EntityManagerProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const loadItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchItems()
      setItems(data)
    } catch (error) {
      toast.error(`No se pudieron cargar los ${config.namePlural.toLowerCase()}`, {
        description: `Ocurrió un error al intentar obtener los ${config.namePlural.toLowerCase()}`,
      })
    } finally {
      setIsLoading(false)
    }
  }
  , [fetchItems, setItems, setIsLoading, config.namePlural])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return (
    <Card className="shadow-sm w-full">
      <CardHeader className="bg-white border-b">
        <CardTitle className="font-semibold text-xl">Gestión de {config.namePlural}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Listado de {config.namePlural.toLowerCase()}</h3>
          <AddEntityDialog config={config} onSuccess={loadItems} addAction={addAction} />
        </div>

        {isLoading ? (
          <div className="py-8 text-muted-foreground text-center">Cargando {config.namePlural.toLowerCase()}...</div>
        ) : (
          <EntityTable
            items={items}
            config={config}
            onItemChange={loadItems}
            updateAction={updateAction}
            deleteAction={deleteAction}
            columns={columns}
          />
        )}
      </CardContent>
    </Card>
  )
}

