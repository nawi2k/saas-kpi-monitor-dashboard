// Definimos el tipo de datos que esperamnos del servidor
export interface KPIData {
  totalRevenue: number;
  revenueGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  systemUptime: number;
  activeUsers: number;
}

// Función simulada que hace un "fetch" al backend
export async function fetchKPIData(): Promise<KPIData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalRevenue: 52430.50,
        revenueGrowth: 14.2,
        conversionRate: 4.15,
        conversionGrowth: 1.2,
        systemUptime: 99.99,
        activeUsers: 1420,
      });
    }, 600); // Simulamos 600ms de red
  });
}