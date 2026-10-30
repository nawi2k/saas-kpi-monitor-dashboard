import React from 'react';
import { LayoutDashboard, BarChart3, Users, Settings, Bell, Search } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Corporativo */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
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
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Panel General de KPIs</h1>
            <p className="text-sm text-slate-400">Resumen en tiempo real de operaciones corporativas B2B.</p>
          </div>

          {/* Grid de Tarjetas de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <span className="text-sm font-medium text-slate-400">Ingresos Totales (MRR)</span>
              <div className="text-3xl font-bold mt-2 text-white">$48,250.00</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">+12.4% vs mes anterior</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <span className="text-sm font-medium text-slate-400">Conversión de Leads</span>
              <div className="text-3xl font-bold mt-2 text-white">3.82%</div>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">+0.8% esta semana</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <span className="text-sm font-medium text-slate-400">Estado del Sistema</span>
              <div className="text-3xl font-bold mt-2 text-emerald-400">99.98%</div>
              <span className="text-xs text-slate-500 font-medium mt-1 inline-block">Sin incidencias reportadas</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}