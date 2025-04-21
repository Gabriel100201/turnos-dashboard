/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
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

interface AddEntityDialogProps<T> {
  config: EntityConfig<T>
  onSuccess: () => void
  addAction: (data: Partial<T>) => Promise<unknown>
}

export function AddEntityDialog<T>({ config, onSuccess, addAction }: AddEntityDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<T>>(config.emptyState)

  const handleSubmit = async () => {
    const missingRequiredFields = config.fields
      .filter((field) => field.required)
      .some((field) => !(formData as never)[field.name])

    if (missingRequiredFields) return

    setIsLoading(true)
    try {
      console.log(formData);
      const result = await addAction(formData)

      if (Array.isArray(result)) {
        toast.error(`Error al crear ${config.name.toLowerCase()}`, {
          description: `No se pudo crear el ${config.name.toLowerCase()}`,
        })
      } else {
        toast.success(`${config.name} creado`, {
          description: `El ${config.name.toLowerCase()} se ha creado correctamente`,
        })
        setFormData(config.emptyState)
        onSuccess()
        setIsOpen(false)
      }
    } catch (error) {
      toast.error(`Error al crear ${config.name.toLowerCase()}`, {
        description: `Ocurrió un error al crear el ${config.name.toLowerCase()}`,
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
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span>Agregar {config.name.toLowerCase()}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar nuevo {config.name.toLowerCase()}</DialogTitle>
        </DialogHeader>
        <EntityForm initialData={formData} fields={config.fields} isLoading={isLoading} onChange={setFormData} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant={"success"} className="cursor-pointer" size="sm" onClick={handleSubmit} disabled={!isFormValid() || isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

