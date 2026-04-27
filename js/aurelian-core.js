/**
 * AURELIAN CORE API - Módulo de Comunicación Central
 * Centraliza las peticiones al Core de Spring Boot (8082)
 */
const BASE_URL = "http://localhost:8082/api";

export const AurelianCore = {
    // Obtener los logs de actividad (Anti-cache habilitado)
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs?t=${new Date().getTime()}`);
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            console.error("Fallo de conexión con LogService");
            return ["> [ERROR]: El Centinela de Logs no responde."];
        }
    },

    // Obtener estadísticas del Tabularium
    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`);
            return resp.ok ? await resp.json() : { proyectos: 0, agentes: 0, tareas: 0 };
        } catch (e) {
            return null;
        }
    },

    // Ejecutar Benchmark (Dispara log en el backend automáticamente)
    async runBenchmark(prompt, model) {
        const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model })
        });
        if (!resp.ok) throw new Error("Motor AI fuera de línea");
        return await resp.json();
    },

    // Crear Proyecto en el Architect Studio
    async initProject(nombre, vision) {
        const resp = await fetch(`${BASE_URL}/projects/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, vision })
        });
        return await resp.json();
    }
};