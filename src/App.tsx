import { LayoutDashboard, Users, Settings, Bell, Search, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchKPIData } from './services/kpiService';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Datos simulados para las gráficas corporativas
const revenueData = [
  { month: 'Ene', revenue: 32000 },
  { month: 'Feb', revenue: 35000 },
  { month: 'Mar', revenue: 41000 },
  { month: 'Abr', revenue: 39000 },
  { month: 'May', revenue: 45000 },
  { month: 'Jun', revenue: 48250 },
  { month: 'Jul', revenue: 52430 },
];

const userActivityData = [
  { day: 'Lun', active: 1100 },
  { day: 'Mar', active: 1350 },
  { day: 'Mié', active: 1250 },
  { day: 'Jue', active: 1420 },
  { day: 'Vie', active: 1580 },
  { day: 'Sáb', active: 950 },
  { day: 'Dom', active: 890 },
];

export default function App() {
  const { data: kpis, isLoading } = useQuery({
    queryKey: ['kpiData'],
    queryFn: fetchKPIData,
  });

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
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Clientes B2B
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Configuración
          </a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior */}
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
            <button className="p-2 text-slate-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center font-bold text-sm justify-center text-white">
              NS
            </div>
          </div>
        </header>

        {/* Cuerpo del Dashboard */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Panel General de KPIs</h1>
              <p className="text-sm text-slate-400">Resumen en tiempo real sincronizado con API corporativa.</p>
            </div>
            {isLoading && (
              <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 px-3 py-1 rounded-full animate-pulse">
                Sincronizando datos...
              </span>
            )}
          </div>

          {/* Grid de Tarjetas de Métricas Dinámicas */}
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
                +{kpis?.revenueGrowth}% vs mes anterior
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
                +{kpis?.conversionGrowth}% esta semana
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

          {/* Sección de Gráficos Recharts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Gráfico de Ingresos */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Evolución de Ingresos (MRR)</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
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

            {/* Gráfico de Actividad de Usuarios */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Actividad Diaria de Usuarios</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData}>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}