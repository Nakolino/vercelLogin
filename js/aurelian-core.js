/**
 * AURELIAN CORE API - v2.6
 * Comunicación modular con el túnel Ngrok hacia el Core 8082
 */

// URL del túnel Ngrok (Asegúrate de que Ngrok esté corriendo)
const BASE_URL = "https://ungraphitized-collette-rheumatoidally.ngrok-free.dev/api";

// Configuración de encabezados para saltar la advertencia de Ngrok y manejar JSON
const DEFAULT_HEADERS = {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const AurelianCore = {
    /**
     * Verifica la salud de la base de datos y n8n
     */
    async getSystemHealth() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/health?t=${Date.now()}`, {
                method: 'GET',
                headers: DEFAULT_HEADERS
            });
            if (resp.ok) return await resp.json();
            return null;
        } catch (e) {
            console.error("Error en HealthCheck:", e);
            return null;
        }
    },

    /**
     * Recupera los logs de operación del centinela
     */
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs?t=${Date.now()}`, {
                method: 'GET',
                headers: DEFAULT_HEADERS
            });
            return resp.ok ? await resp.json() : [];
        } catch (e) {
            console.error("Error recuperando logs:", e);
            return ["> [ERROR]: Sin conexión con el Centinela local."];
        }
    },

    /**
     * Obtiene estadísticas de proyectos, agentes y tareas
     */
    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`, {
                method: 'GET',
                headers: DEFAULT_HEADERS
            });
            return resp.ok ? await resp.json() : { proyectos: 0, agentes: 0, tareas: 0 };
        } catch (e) {
            console.error("Error recuperando stats:", e);
            return { proyectos: 0, agentes: 0, tareas: 0 };
        }
    },

    /**
     * Ejecuta el benchmark de tokens contra los modelos locales
     */
    async runBenchmark(prompt, model) {
        try {
            const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({ prompt, model })
            });
            if (!resp.ok) throw new Error("Fallo en la ejecución del modelo");
            return await resp.json();
        } catch (e) {
            console.error("Error en Benchmark:", e);
            throw e;
        }
    },

    /**
     * Inicia el flujo de refinamiento en el Architect Studio
     */
// Busca la función initProject y déjala así:
    async initProject(nombre, vision) {
        try {
            const resp = await fetch(`${BASE_URL}/projects/init`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({ nombre, vision })
            });

            // Si el servidor responde un error (como 409), lanzamos el error al JS
            if (!resp.ok) {
                const errorData = await resp.json();
                throw new Error(JSON.stringify(errorData));
            }

            return await resp.json();
        } catch (e) {
            throw e; // Lanzamos el error hacia el Dashboard para que el chat lo pinte
        }
    }

};