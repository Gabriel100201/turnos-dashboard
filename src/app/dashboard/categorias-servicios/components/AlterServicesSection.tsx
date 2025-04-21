"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { menu_categoria as Categoria } from "@prisma/client";
import { getCategorias } from "@/actions/categorias/getCategorias";
import { CategoriasCard } from "./CategoriasPanel";
import { CategoriaServiciosPanel } from "./ServiciosPanel";

export function AlterServicesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<
    Categoria["id_categoria"] | null
  >(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await getCategorias();
      setCategorias(categorias);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const categoriaFromUrl = searchParams.get("categoria");
    if (categoriaFromUrl) {
      const categoriaId = parseInt(categoriaFromUrl);
      setSelectedCategoria(categoriaId);
    } else {
      setSelectedCategoria(null);
    }
  }, [searchParams]);

  const handleCategoriaClick = async (categoriaId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("categoria", categoriaId.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    setSelectedCategoria(categoriaId);
  };

  return (
    <section className="flex sm:flex-row flex-col gap-5 w-full">
      <CategoriasCard
        flexSpace={1}
        categorias={categorias}
        selectedCategoria={selectedCategoria}
        handleCategoriaClick={handleCategoriaClick}
      />
      <CategoriaServiciosPanel flexSpace={1} />
    </section>
  );
}
