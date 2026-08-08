import React from 'react';
import { Docente } from '../types/docente';
import { Mail, CreditCard, Award, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

interface TeacherCardProps {
  docente: Docente;
  onSelect: (docente: Docente) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ docente, onSelect }) => {
  const getBadgeStyle = (obs: string) => {
    switch (obs) {
      case 'Excelente':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Bueno':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Regular':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getProgressColor = (porcentaje: number) => {
    if (porcentaje >= 80) return 'bg-emerald-500';
    if (porcentaje >= 60) return 'bg-blue-500';
    if (porcentaje >= 40) return 'bg-amber-500';
    return 'bg-slate-400';
  };

  return (
    <div
      onClick={() => onSelect(docente)}
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer p-5 flex flex-col justify-between group"
    >
      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200 text-sm group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
              {docente.apellidosNombres.split(' ').slice(0, 2).map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                {docente.apellidosNombres}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  DNI: {docente.dni}
                </span>
              </div>
            </div>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getBadgeStyle(
              docente.observacion
            )}`}
          >
            {docente.observacion}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center text-xs text-slate-500 mb-4 truncate">
          <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
          <span className="truncate">{docente.correo}</span>
        </div>

        {/* Course Progress Indicators */}
        <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Cursos Completados:
            </span>
            <span className="font-bold text-slate-800">
              {docente.capacitacionesTotal} / 5
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getProgressColor(
                docente.porcentajeParticipacion
              )}`}
              style={{ width: `${docente.porcentajeParticipacion}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-0.5">
            <span>Avance General</span>
            <span className="font-semibold text-slate-700">
              {docente.porcentajeParticipacion}%
            </span>
          </div>
        </div>

        {/* Individual Course Badges preview */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {docente.capacitaciones.map((cap, idx) => (
            <span
              key={cap.id}
              title={`${cap.titulo}: ${cap.completado ? 'Completado' : 'Pendiente'}`}
              className={`text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                cap.completado
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              {cap.completado ? (
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
              )}
              C{idx + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-medium group-hover:translate-x-0.5 transition-transform">
        <span>Ver detalle de sesiones</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
