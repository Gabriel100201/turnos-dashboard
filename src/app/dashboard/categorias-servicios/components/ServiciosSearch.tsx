"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getServicios } from "@/actions/servicios/getServicios"
import type { Servicios } from "@/types/servicios"
import { LucidePlus } from "lucide-react"

interface ServicioSearchProps {
  onAsociar: (servicioId: number) => void
  serviciosAsociadosIds: Set<number>
}

export function ServicioSearch({ onAsociar, serviciosAsociadosIds }: ServicioSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [resultados, setResultados] = useState<Servicios[]>([])
  const [todos, setTodos] = useState<Servicios[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetch = async () => {
      const servicios = await getServicios()
      if (Array.isArray(servicios)) {
        setTodos(servicios)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (searchTerm.length === 0) {
      setResultados([])
      return
    }

    const filtrados = todos.filter((s) =>
      s.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10)

    setResultados(filtrados)
  }, [searchTerm, todos])

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        placeholder="Buscar servicio..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {resultados.length > 0 && (
        <div className="z-50 absolute bg-white shadow-md mt-1 border rounded w-full max-h-72 overflow-y-auto">
          {resultados.map((servicio) => {
            const linked = serviciosAsociadosIds.has(servicio.id)
            const deshabilitado = servicio.estado_servicio === "deshabilitado"

            return (
              <div
                key={servicio.id}
                className="flex justify-between items-center hover:bg-muted/50 px-3 py-2 border-b"
              >
                <div className="flex flex-col">
                  <span className={deshabilitado ? "text-muted-foreground" : ""}>
                    {servicio.titulo}
                  </span>
                </div>

                {linked ? (
                  <Badge variant="secondary">Ya asociado</Badge>
                ) : deshabilitado ? (
                  <Badge variant="destructive">Deshabilitado</Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="success"
                    className="cursor-pointer"
                    onClick={() => {
                      onAsociar(servicio.id)
                      setSearchTerm("")
                      setResultados([])
                    }}
                  >
                    <LucidePlus />
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
