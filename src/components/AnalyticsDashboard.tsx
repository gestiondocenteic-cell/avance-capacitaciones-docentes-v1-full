import React, { useMemo } from 'react';
import { Docente } from '../types/docente';
import { COURSES_METADATA } from '../data/coursesData';
import {
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  BarChart2,
  PieChart,
  ArrowRight,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  docentes: Docente[];
  onSelectDocente: (docente: Docente) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  docentes,
  onSelectDocente,
}) => {
  // Aggregate Metrics
  const totalDocentes = docentes.length;

  const obsCounts = useMemo(() => {
    const counts = { Excelente: 0, Bueno: 0, Regular: 0, Bajo: 0 };
    docentes.forEach((d) => {
      if (counts[d.observacion] !== undefined) {
        counts[d.observacion]++;
      }
    });
    return counts;
  }, [docentes]);

  const promedioParticipacion = useMemo(() => {
    if (totalDocentes === 0) return 0;
    const sum = docentes.reduce((acc, curr) => acc + curr.porcentajeParticipacion, 0);
    return Math.round((sum / totalDocentes) * 10) / 10;
  }, [docentes, totalDocentes]);

  // Course Completion Stats
  const courseStats = useMemo(() => {
    return COURSES_METADATA.map((course) => {
      const completedCount = docentes.filter((d) => {
        const cap = d.capacitaciones.find((c) => c.id === course.id);
        return cap?.completado;
      }).length;

      const percentage = Math.round((completedCount / totalDocentes) * 100);

      return {
        ...course,
        completedCount,
        percentage,
      };
    });
  }, [docentes, totalDocentes]);

  // Top Teachers (100% or highest)
  const topDocentes = useMemo(() => {
    return [...docentes]
      .sort((a, b) => b.porcentajeParticipacion - a.porcentajeParticipacion)
      .slice(0, 8);
  }, [docentes]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-emerald-600" />
          Panel General de Avance Institucional 2026
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Métricas consolidadas del programa de capacitaciones docentes de la Universidad Continental.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Docentes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Docentes
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalDocentes}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Registrados en la nómina</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Avance Promedio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Avance Promedio
            </span>
            <div className="text-2xl font-extrabold text-teal-700 mt-1">
              {promedioParticipacion}%
            </div>
            <span className="text-[11px] text-teal-600 font-medium mt-1 block">Tasa global de asistencia</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Excelente (100%) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              100% Completado
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">
              {obsCounts.Excelente} <span className="text-xs text-slate-400 font-normal">docentes</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              {Math.round((obsCounts.Excelente / totalDocentes) * 100)}% del total
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Nivel Bajo / Pendientes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Nivel Bajo (≤20%)
            </span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">
              {obsCounts.Bajo} <span className="text-xs text-slate-400 font-normal">docentes</span>
            </div>
            <span className="text-[11px] text-amber-600 font-medium mt-1 block">Requieren reprogramación</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Section: Observación Distribution & Course Completion Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Observación Distribution Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-600" />
            Distribución por Calificación de Avance (Observación)
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Excelente (100%)', count: obsCounts.Excelente, color: 'bg-emerald-500', text: 'text-emerald-700' },
              { label: 'Bueno (80%)', count: obsCounts.Bueno, color: 'bg-blue-500', text: 'text-blue-700' },
              { label: 'Regular (60%)', count: obsCounts.Regular, color: 'bg-amber-500', text: 'text-amber-700' },
              { label: 'Bajo (0% - 40%)', count: obsCounts.Bajo, color: 'bg-slate-400', text: 'text-slate-700' },
            ].map((item) => {
              const pct = Math.round((item.count / totalDocentes) * 100);
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{item.label}</span>
                    <span className={`font-bold ${item.text}`}>
                      {item.count} docentes ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Rates by Course Module */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Porcentaje de Aprobación por Módulo de Capacitación
          </h3>

          <div className="space-y-3 pt-1">
            {courseStats.map((c, i) => (
              <div key={c.id} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800 font-semibold truncate pr-2">
                    M{i + 1}: {c.titulo}
                  </span>
                  <span className="text-emerald-700 font-bold shrink-0">
                    {c.completedCount} docentes ({c.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-700"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Participating Teachers Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            Docentes Destacados (Mayor Nivel de Avance)
          </h3>
          <span className="text-xs text-slate-500">Mostrando top docentes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Docente</th>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3 text-center">Módulos Aprobados</th>
                <th className="px-4 py-3 text-center">% Avance</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {topDocentes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">{d.apellidosNombres}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{d.dni}</td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-xs">{d.correo}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">
                    {d.capacitacionesTotal} / 5
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        d.porcentajeParticipacion === 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {d.porcentajeParticipacion}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onSelectDocente(d)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <span>Ver Ficha</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
