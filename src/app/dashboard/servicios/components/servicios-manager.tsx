"use client";

import type { menu_servicios as Servicio } from "@prisma/client";
import type { EntityConfig } from "@/components/crud/types";

import { EntityManager } from "@/components/crud";
import { getServicios } from "@/actions/servicios/getServicios";
import { addServicio } from "@/actions/servicios/addServicio";
import { updateServicio } from "@/actions/servicios/updateServicio";
import { deleteServicio } from "@/actions/servicios/deleteServicio";

export function ServiciosManager({config}: {config: EntityConfig<Servicio>}) {
  return (
    <EntityManager<Servicio>
      config={config}
      fetchItems={getServicios}
      addAction={addServicio}
      updateAction={updateServicio}
      deleteAction={deleteServicio}
      columns={["titulo", "subtitulo", "estado_servicio"]}
    />
  );
}
