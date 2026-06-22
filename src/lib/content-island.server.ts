// Cliente Content Island SERVER-ONLY en snapshot mode.
//
// Las lecturas se resuelven desde el snapshot en el SERVIDOR (SSR), en cada request, sin pegar a la
// API. El token es deliberadamente irrelevante para las lecturas: en snapshot mode no se usa, así que
// aunque sea inválido el servidor sirve el contenido del fichero.
//
// CLAVE PARA SERVERLESS (Vercel/Nitro): el cliente sólo lee el snapshot vía node:fs desde un PATH.
// Un fichero suelto en la raíz NO se copia dentro de la función (cwd = /var/task), y el bundler no
// puede trazar el readFile dinámico del cliente. Por eso IMPORTAMOS el JSON (Vite lo inlinea en el
// bundle del servidor, así viaja siempre con la función) y lo MATERIALIZAMOS en /tmp (único dir
// escribible en Lambda) al arrancar, pasando ese path al cliente.
//
// Requiere que content-island-snapshot.json exista al hacer `vite build` (lo genera el paso
// `content-island export` del script de build).
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@content-island/api-client";
import snapshot from "../../content-island-snapshot.json";

const snapshotPath = join(tmpdir(), "content-island-snapshot.json");
writeFileSync(snapshotPath, JSON.stringify(snapshot));

// En el build (export) sí se usa el token real; en runtime (snapshot mode) no hace falta.
const accessToken =
  process.env.CONTENT_ISLAND_ACCESS_TOKEN ?? "TOKEN-INVALIDO-A-PROPOSITO";

export const client = createClient({
  accessToken,
  mode: "snapshot",
  snapshotPath,
});

export const snapshotInfo = { snapshotPath, accessToken };
