const BASE_URL = "https://ungraphitized-collette-rheumatoidally.ngrok-free.dev/api";

export const AurelianCore = {
    async getSystemHealth() {
        try {
            const resp = await fetch(`${BASE_URL}/health?t=${Date.now()}`);
            if (resp.ok) return await resp.json();
            return null;
        } catch (e) { return null; }
    },
    async getLogs() {
        try {
            const resp = await fetch(`${BASE_URL}/agentes/logs?t=${Date.now()}`);
            return resp.ok ? await resp.json() : [];
        } catch (e) { return ["> [ERROR]: Sin conexión con el Centinela."]; }
    },
    async getStats() {
        try {
            const resp = await fetch(`${BASE_URL}/projects/stats`);
            return resp.ok ? await resp.json() : { proyectos: 0, agentes: 0, tareas: 0 };
        } catch (e) { return { proyectos: 0, agentes: 0, tareas: 0 }; }
    },
    async runBenchmark(prompt, model) {
        const resp = await fetch(`${BASE_URL}/tokens/analizar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, model })
        });
        return await resp.json();
    },
    async initProject(nombre, vision) {
        const resp = await fetch(`${BASE_URL}/projects/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, vision })
        });
        return await resp.json();
    }
};