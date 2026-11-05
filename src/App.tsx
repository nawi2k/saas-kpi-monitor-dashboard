import { useState } from 'react';
import { LayoutDashboard, Users, Settings, Bell, Search, TrendingUp, ShieldCheck, DollarSign, Calendar, Building2, CheckCircle2, AlertCircle, XCircle, Download, FileText, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchKPIData } from './services/kpiService';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Datos adaptativos de gráficos
const mockChartData: Record<string, { revenue: { month: string; revenue: number }[]; users: { day: string; active: number }[] }> = {
  '7d': {
    revenue: [
      { month: 'Lun', revenue: 7200 },
      { month: 'Mar', revenue: 8100 },
      { month: 'Mié', revenue: 7800 },
      { month: 'Jue', revenue: 8500 },
      { month: 'Vie', revenue: 9200 },
      { month: 'Sáb', revenue: 6400 },
      { month: 'Dom', revenue: 5200 },
    ],
    users: [
      { day: 'Lun', active: 1100 },
      { day: 'Mar', active: 1350 },
      { day: 'Mié', active: 1250 },
      { day: 'Jue', active: 1420 },
      { day: 'Vie', active: 1580 },
      { day: 'Sáb', active: 950 },
      { day: 'Dom', active: 890 },
    ]
  },
  '30d': {
    revenue: [
      { month: 'Sem 1', revenue: 12000 },
      { month: 'Sem 2', revenue: 14500 },
      { month: 'Sem 3', revenue: 13800 },
      { month: 'Sem 4', revenue: 17930 },
    ],
    users: [
      { day: 'Sem 1', active: 4200 },
      { day: 'Sem 2', active: 4800 },
      { day: 'Sem 3', active: 4600 },
      { day: 'Sem 4', active: 5300 },
    ]
  },
  'year': {
    revenue: [
      { month: 'Ene', revenue: 32000 },
      { month: 'Feb', revenue: 35000 },
      { month: 'Mar', revenue: 41000 },
      { month: 'Abr', revenue: 39000 },
      { month: 'May', revenue: 45000 },
      { month: 'Jun', revenue: 48250 },
      { month: 'Jul', revenue: 52430 },
    ],
    users: [
      { day: 'Ene', active: 1100 },
      { day: 'Feb', active: 1250 },
      { day: 'Mar', active: 1300 },
      { day: 'Abr', active: 1380 },
      { day: 'May', active: 1400 },
      { day: 'Jun', active: 1420 },
      { day: 'Jul', active: 1500 },
    ]
  }
};

// Datos simulados de Clientes B2B corporativos
const mockClients = [
  { id: 1, name: 'Stellar Logistics S.A.', plan: 'Enterprise', mrr: '$4,500', status: 'Activo', contact: 'martin.gomez@stellar.com' },
  { id: 2, name: 'Nexus Cloud Solutions', plan: 'Business', mrr: '$2,800', status: 'Activo', contact: 'lucia.perez@nexuscloud.io' },
  { id: 3, name: 'Alpha FinTech Group', plan: 'Enterprise', mrr: '$6,200', status: 'En Riesgo', contact: 'carlos.mendez@alpha.com' },
  { id: 4, name: 'Global Retail Corp', plan: 'Growth', mrr: '$1,500', status: 'Activo', contact: 'sofia.martinez@globalretail.ar' },
  { id: 5, name: 'Innova Software Factory', plan: 'Business', mrr: '$3,100', status: 'Inactivo', contact: 'fedeb@innovasf.dev' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'settings'>('dashboard');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('year');
  const [clientSearch, setClientSearch] = useState('');
  
  // Estados para la Parte 3 (Exportación de Reportes)
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const { data: kpis, isLoading } = useQuery({
    queryKey: ['kpiData', timeRange],
    queryFn: fetchKPIData,
  });

  const currentData = mockChartData[timeRange];

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.contact.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Función simulada de exportación corporativa (Parte 3)
  const handleExportReport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500); // Ocultar mensaje de éxito después de 3.5s
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Corporativo */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide">NexusMetrics</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'clients' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Clientes B2B
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" /> Configuración
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior con Botón de Exportación (Parte 3) */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 w-80">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar métricas, reportes..." 
              className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Botón de Exportación de Reportes Corporativos */}
            <button 
              onClick={handleExportReport}
              disabled={isExporting}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generando PDF...
                </>
              ) : exportSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ¡Reporte Descargado!
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  Exportar Reporte
                </>
              )}
            </button>

            <button className="p-2 text-slate-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center font-bold text-sm justify-center text-white">
              NS
            </div>
          </div>
        </header>

        {/* Cuerpo Dinámico según Pestaña Activa */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Panel General de KPIs</h1>
                  <p className="text-sm text-slate-400">Resumen en tiempo real sincronizado con API corporativa.</p>
                </div>
                
                {/* Selector de Rango de Tiempo (Parte 1) */}
                <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                  <Calendar className="w-4 h-4 text-slate-400 ml-2" />
                  <button 
                    onClick={() => setTimeRange('7d')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${timeRange === '7d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    7 Días
                  </button>
                  <button 
                    onClick={() => setTimeRange('30d')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${timeRange === '30d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    30 Días
                  </button>
                  <button 
                    onClick={() => setTimeRange('year')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${timeRange === 'year' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Anual
                  </button>
                </div>
              </div>

              {/* Grid de Tarjetas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-400">Ingresos Totales (MRR)</span>
                    <DollarSign className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold mt-2 text-white">
                    {isLoading ? <div className="h-8 bg-slate-800 rounded animate-pulse w-32"></div> : `$${kpis?.totalRevenue.toLocaleString()}`}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">
                    +{kpis?.revenueGrowth}% vs periodo anterior
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-400">Conversión de Leads</span>
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-bold mt-2 text-white">
                    {isLoading ? <div className="h-8 bg-slate-800 rounded animate-pulse w-20"></div> : `${kpis?.conversionRate}%`}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">
                    +{kpis?.conversionGrowth}% en este ciclo
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-400">Estado del Sistema</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold mt-2 text-emerald-400">
                    {isLoading ? <div className="h-8 bg-slate-800 rounded animate-pulse w-24"></div> : `${kpis?.systemUptime}%`}
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-2 inline-block">
                    {kpis?.activeUsers} usuarios activos conectados
                  </span>
                </div>
              </div>

              {/* Gráficos Recharts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">Evolución de Ingresos (MRR)</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentData.revenue}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">Actividad Diaria de Usuarios</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentData.users}>
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Gestión de Clientes B2B</h1>
                  <p className="text-sm text-slate-400">Listado de cuentas corporativas y estado de suscripciones.</p>
                </div>
                {/* Buscador de Clientes */}
                <div className="flex items-center gap-3 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 w-72">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filtrar por empresa o email..." 
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full"
                  />
                </div>
              </div>

              {/* Tabla de Cuentas B2B (Parte 2) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Empresa</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">MRR Generado</th>
                      <th className="p-4">Estado</th>
                      <th className="p-4">Contacto Corporativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-medium text-slate-200 flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
                            <Building2 className="w-4 h-4" />
                          </div>
                          {client.name}
                        </td>
                        <td className="p-4 text-slate-300">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-indigo-300">
                            {client.plan}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-white">{client.mrr}</td>
                        <td className="p-4">
                          {client.status === 'Activo' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                            </span>
                          )}
                          {client.status === 'En Riesgo' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950 text-amber-400 border border-amber-800/50">
                              <AlertCircle className="w-3.5 h-3.5" /> En Riesgo
                            </span>
                          )}
                          {client.status === 'Inactivo' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-950 text-red-400 border border-red-800/50">
                              <XCircle className="w-3.5 h-3.5" /> Inactivo
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-400 text-xs">{client.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h1>
                <p className="text-sm text-slate-400">Preferencias generales de la plataforma y llaves de API.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 max-w-xl">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase">Nombre de la Organización</label>
                  <input type="text" defaultValue="NexusMetrics Corp." className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase">Frecuencia de Sincronización</label>
                  <select className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500">
                    <option>Tiempo Real (WebSocket)</option>
                    <option>Cada 5 minutos</option>
                    <option>Cada 1 hora</option>
                  </select>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}