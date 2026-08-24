import { execFileSync, spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
let port = 5175;

function processesOnPort(currentPort) {
  try {
    return execFileSync("lsof", ["-ti", `tcp:${currentPort}`], {
      encoding: "utf8",
    })
      .split(/\s+/)
      .filter(Boolean);
  } catch {
    return [];
  }
}

while (processesOnPort(port).length > 0) {
  console.log(`A porta ${port} está ocupada; procurando uma porta limpa.`);
  port += 1;
}

console.log(`Iniciando uma sessão limpa na porta ${port}.`);

for (const cachePath of [
  resolve(projectRoot, "node_modules/.vite"),
  resolve(projectRoot, "node_modules/.vite-temp"),
]) {
  if (existsSync(cachePath)) {
    rmSync(cachePath, { force: true, recursive: true });
    console.log(`Cache removido: ${cachePath}`);
  }
}

const viteBin = resolve(projectRoot, "node_modules/vite/bin/vite.js");
const server = spawn(process.execPath, [viteBin, "--host", "localhost", "--port", String(port)], {
  cwd: projectRoot,
  stdio: "inherit",
});

server.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
