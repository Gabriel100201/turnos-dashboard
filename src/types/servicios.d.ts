import { menu_servicios } from "@prisma/client";

type Servicios = menu_servicios;
type ServiciosBasicInfo = Omit<Servicios, "id"> & Partial<Pick<Servicios, "id">>;

export { Servicios, ServiciosBasicInfo };