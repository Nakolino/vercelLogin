/**
 * AURELIAN CORE API - Módulo de Comunicación Central
 * Maneja la lógica de red y telemetría del sistema.
 */
const BASE_URL = "http://localhost:8082/api";

export const AurelianCore = {
    // Obtener los logs de actividad del Centinela
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs`);
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            console.error("Error al conectar con LogService:", e);
            return [];
        }
    },

    // Obtener las estadísticas globales del Tabularium
    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`);
            return resp.ok ? await resp.json() : null;
        } catch (e) {
            console.error("Error al conectar con ProjectService:", e);
            return null;
        }
    },

    // Ejecutar Benchmark de estrés (Token Lab)
    async runBenchmark(prompt, model) {
        const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model })
        });
        if (!resp.ok) throw new Error("Fallo en la respuesta del motor AI");
        return await resp.json();
    },

    // Iniciar flujo del Architect Studio (Sentinel)
    async initProject(nombre, vision) {
        const resp = await fetch(`${BASE_URL}/projects/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, vision })
        });
        return await resp.json();
    }
};