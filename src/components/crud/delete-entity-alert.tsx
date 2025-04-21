/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { EntityConfig } from "./types"

interface DeleteEntityAlertProps<T> {
  item: T
  config: EntityConfig<T>
  onSuccess: () => void
  deleteAction: (id: number) => Promise<unknown>
}

export function DeleteEntityAlert<T>({ item, config, onSuccess, deleteAction }: DeleteEntityAlertProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const itemId =
    config.getIdField?.(item) ??
    (item as Record<string, number>).id ??
    (item as Record<string, number>).id_categoria;
  const displayName =
    config.getDisplayName?.(item) ?? (item as Record<string, number>).name;

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteAction(itemId)

      if (Array.isArray(result)) {
        toast.error(`Error al eliminar ${config.name.toLowerCase()}`, {
          description: `No se pudo eliminar el ${config.name.toLowerCase()}`,
        })
      } else {
        toast.success(`${config.name} eliminado`, {
          description: `El ${config.name.toLowerCase()} se ha eliminado correctamente`,
        })
        onSuccess()
      }
    } catch (error) {
      toast.error(`Error al eliminar ${config.name.toLowerCase()}`, {
        description: `Ocurrió un error al eliminar el ${config.name.toLowerCase()}`,
      })
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer" size="icon">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará el {config.name.toLowerCase()} &apos;
            {displayName}&apos; y no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-200 hover:bg-red-300 text-red-900 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

