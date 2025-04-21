/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { EntityForm } from "./entity-form"
import type { EntityConfig } from "./types"

interface EditEntityDialogProps<T> {
  item: T
  config: EntityConfig<T>
  onSuccess: () => void
  updateAction: (id: number, data: Partial<T>) => Promise<unknown>
}

export function EditEntityDialog<T>({ item, config, onSuccess, updateAction }: EditEntityDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<T>>(item)
  const itemId =
    config.getIdField?.(item) ??
    (item as Record<string, number>).id ??
    (item as Record<string, number>).id_categoria;
  useEffect(() => {
    if (isOpen) {
      setFormData(item)
    }
  }, [isOpen, item])

  const handleSubmit = async () => {
    const missingRequiredFields = config.fields
      .filter((field) => field.required)
      .some((field) => !(formData as never)[field.name])

    if (missingRequiredFields) return

    setIsLoading(true)
    try {
      const result = await updateAction(itemId, formData)

      if (Array.isArray(result)) {
        toast.error(`Error al actualizar ${config.name.toLowerCase()}`, {
          description: `No se pudo actualizar el ${config.name.toLowerCase()}`,
        })
      } else {
        toast.success(`${config.name} actualizado`, {
          description: `El ${config.name.toLowerCase()} se ha actualizado correctamente`,
        })
        onSuccess()
        setIsOpen(false)
      }
    } catch (error) {
      toast.error(`Error al actualizar ${config.name.toLowerCase()}`, {
        description: `Ocurrió un error al actualizar el ${config.name.toLowerCase()}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return !config.fields.filter((field) => field.required).some((field) => !(formData as never)[field.name])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar {config.name.toLowerCase()}</DialogTitle>
        </DialogHeader>
        <EntityForm initialData={formData} fields={config.fields} isLoading={isLoading} onChange={setFormData} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" size="sm" onClick={handleSubmit} disabled={!isFormValid() || isLoading}>
            {isLoading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

