// Cliente Content Island SERVER-ONLY en snapshot mode.
//
// Las lecturas se resuelven desde content-island-snapshot.json en el SERVIDOR (SSR), en cada
// request, sin pegar a la API. El token es deliberadamente irrelevante para las lecturas: en
// snapshot mode no se usa, así que aunque sea inválido el servidor sirve el contenido del fichero.
//
// snapshotPath se da como RUTA ABSOLUTA porque en SSR/serverless el cwd es impredecible
// (caveat de los docs de snapshot). En local resuelve a la raíz del proyecto.
import { resolve } from "node:path";
import { createClient } from "@content-island/api-client";

const snapshotPath = resolve(process.cwd(), "content-island-snapshot.json");

// En el build (export) sí se usa el token real; en runtime (snapshot mode) no hace falta.
const accessToken =
  process.env.CONTENT_ISLAND_ACCESS_TOKEN ?? "TOKEN-INVALIDO-A-PROPOSITO";

export const client = createClient({
  accessToken,
  // mode: "snapshot",
  // snapshotPath,
});

export const snapshotInfo = { snapshotPath, accessToken };
