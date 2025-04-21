export const dynamic = 'force-dynamic';

import { ServiciosManager } from "./components";
import { getServiciosConfigWithOrganismos } from "./servicios-config";

export default async function Page() {
  const config = await getServiciosConfigWithOrganismos();
  return <ServiciosManager config={config}/>;
}
