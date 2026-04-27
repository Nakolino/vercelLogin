/**
 * AURELIAN CORE API - v2.3
 * Comunicación modular con el Core 8082
 */
const BASE_URL = "http://localhost:8082/api";

export const AurelianCore = {
    // Monitoreo de Salud Real
    async getSystemHealth() {
        try {
            const resp = await fetch(`${BASE_URL}/health?t=${Date.now()}`);
            if (resp.ok) return await resp.json();
            return null;
        } catch (e) {
            return null;
        }
    },

    // Bitácora de Operaciones
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs?t=${Date.now()}`);
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            return ["> [ERROR]: Fallo de enlace con el Centinela."];
        }
    },

    // Estadísticas del Tabularium
    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`);
            return resp.ok ? await resp.json() : { proyectos: 0, agentes: 0, tareas: 0 };
        } catch (e) {
            return { proyectos: 0, agentes: 0, tareas: 0 };
        }
    },

    // Token Lab (Benchmark)
    async runBenchmark(prompt, model) {
        const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model })
        });
        if (!resp.ok) throw new Error("Motor fuera de línea");
        return await resp.json();
    },

    // Architect Studio
    async initProject(nombre, vision) {
        const resp = await fetch(`${BASE_URL}/projects/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, vision })
        });
        return await resp.json();
    }
};