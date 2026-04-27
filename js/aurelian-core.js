/**
 * AURELIAN CORE API - v2.1 (Atenea Style)
 * Maneja la comunicación con el Core 8082
 */
const BASE_URL = "http://localhost:8082/api";

export const AurelianCore = {
    // Obtener logs con parámetro anti-cache
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs?t=${Date.now()}`);
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            return ["> [ERROR]: Fallo de enlace con el Centinela."];
        }
    },

    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`);
            return resp.ok ? await resp.json() : { proyectos: 0, agentes: 0, tareas: 0 };
        } catch (e) { return null; }
    },

    async runBenchmark(prompt, model) {
        const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model })
        });
        if (!resp.ok) throw new Error("Motor fuera de línea");
        return await resp.json();
    }
};