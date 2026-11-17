#!/bin/sh
# Gera as duas versões da extensão GNOME em gnome/dist/:
#   - *-gnome45.shell-extension.zip  → GNOME 45 a 49 (Zorin OS 18, Ubuntu 24.04+…)
#   - *-gnome43.shell-extension.zip  → GNOME 43 e 44 (Zorin OS 17)
set -e
cd "$(dirname "$0")"
python3 - <<'PY'
import json, os, re, shutil, subprocess, zipfile

UUID = "ai-usage-meter@gabrielwsa.github.io"
META = {
    "uuid": UUID,
    "name": "AI Usage Meter",
    "description": "Medidor não oficial dos limites do plano do Claude Code (sessão de 5h e semanal).\n"
                   "Medidor no oficial de los límites del plan de Claude Code (sesión de 5h y semanal).",
    "url": "https://github.com/gabrielwsa/AIusageKDEplugin",
    "settings-schema": "org.gnome.shell.extensions.ai-usage-meter",
    "version-name": "1.2.0",
}
VARIANTS = {
    "gnome45": {"dir": "esm", "shell": ["45", "46", "47", "48", "49"], "legacy": False},
    "gnome43": {"dir": "legacy", "shell": ["43", "44"], "legacy": True},
}
SHARED = ["core.js", "i18n.js", "prefsCore.js", "stylesheet.css", "icons/claude-rays.svg",
          "schemas/org.gnome.shell.extensions.ai-usage-meter.gschema.xml"]


def to_legacy(src):
    # imports antigos: funções no topo já são exportadas; classes precisam de "var".
    src = re.sub(r"^export class (\w+)", r"var \1 = class \1", src, flags=re.M)
    return re.sub(r"^export function ", "function ", src, flags=re.M)


os.makedirs("dist", exist_ok=True)
for name, v in VARIANTS.items():
    out = f"dist/{UUID}-{name}.shell-extension.zip"
    stage = f"dist/.stage-{name}"
    shutil.rmtree(stage, ignore_errors=True)
    os.makedirs(f"{stage}/icons")
    os.makedirs(f"{stage}/schemas")
    for f in SHARED:
        text = open(f"src/{f}", encoding="utf-8").read()
        if v["legacy"] and f.endswith(".js"):
            text = to_legacy(text)
        open(f"{stage}/{f}", "w", encoding="utf-8").write(text)
    for f in ("extension.js", "prefs.js"):
        shutil.copy(f"src/{v['dir']}/{f}", f"{stage}/{f}")
    meta = dict(META, **{"shell-version": v["shell"]})
    json.dump(meta, open(f"{stage}/metadata.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    subprocess.run(["glib-compile-schemas", f"{stage}/schemas"], check=True)
    if os.path.exists(out):
        os.remove(out)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(stage):
            for f in files:
                p = os.path.join(root, f)
                z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage)
    print(out, "criado")
PY
