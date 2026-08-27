import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import WebSocket from "ws";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9347;
const URL = "http://127.0.0.1:8754/ferramentas/og-card.html";

function cdpFetch(path) {
  return fetch(`http://127.0.0.1:${PORT}${path}`).then((r) => r.json());
}

async function main() {
  const proc = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    "--headless=new",
    "--no-first-run",
    "--user-data-dir=C:\\Users\\Digital\\AppData\\Local\\Temp\\chrome-og-emili",
  ]);
  await new Promise((r) => setTimeout(r, 1500));
  const targets = await cdpFetch("/json");
  const page = targets.find((t) => t.type === "page") || (await cdpFetch("/json/new?about:blank"));
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const myId = ++id;
      pending.set(myId, resolve);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  }
  await new Promise((resolve) => ws.on("open", resolve));
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 1500));
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
  });
  writeFileSync("ferramentas/og-render.png", Buffer.from(data, "base64"));
  console.log("saved");
  ws.close();
  proc.kill();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
