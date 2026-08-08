import React, { useState } from 'react';
import { Docente } from '../types/docente';
import { COURSES_METADATA } from '../data/coursesData';
import { CertificateModal } from './CertificateModal';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Share2,
  CreditCard,
  Mail,
  BookOpen,
  Calendar,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from 'lucide-react';

interface TeacherDetailProps {
  docente: Docente;
  onBack: () => void;
}

export const TeacherDetail: React.FC<TeacherDetailProps> = ({ docente, onBack }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleCourse = (id: string) => {
    setExpandedCourses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getObservationBadge = (obs: string) => {
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la búsqueda</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Imprimir Ficha</span>
          </button>

          <button
            onClick={() => setShowCertificate(true)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Award className="w-4 h-4" />
            <span>Generar Constancia</span>
          </button>
        </div>
      </div>

      {/* Main Teacher Profile Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Info Side */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-extrabold text-xl flex items-center justify-center shadow-inner">
                {docente.apellidosNombres.split(' ').slice(0, 2).map((n) => n[0]).join('')}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  Ficha de Avance Docente 2026
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                  {docente.apellidosNombres}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span>DNI:</span>
                <strong className="text-white font-mono">{docente.dni}</strong>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Correo:</span>
                <strong className="text-white">{docente.correo}</strong>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span>Evaluación:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getObservationBadge(docente.observacion)}`}>
                  {docente.observacion}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Circular Meter Side */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 flex items-center justify-center sm:justify-start gap-5 shrink-0">
            {/* SVG Circular Meter */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-700"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 38}
                  strokeDashoffset={2 * Math.PI * 38 * (1 - docente.porcentajeParticipacion / 100)}
                  strokeLinecap="round"
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-white">{docente.porcentajeParticipacion}%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Avance</span>
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-xs text-slate-400 font-medium block">Cursos Completados</span>
              <div className="text-2xl font-black text-emerald-400">
                {docente.capacitacionesTotal} <span className="text-sm text-slate-400 font-normal">/ 5 módulos</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {docente.porcentajeParticipacion === 100
                  ? '¡Capacitación 100% completada!'
                  : `${5 - docente.capacitacionesTotal} módulo(s) pendiente(s)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notice / Feedback Banner */}
      {docente.porcentajeParticipacion === 100 ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-emerald-950">
              ¡Felicitaciones! Ha cumplido con el 100% de las capacitaciones programadas.
            </h4>
            <p className="mt-0.5 text-emerald-800">
              Usted ha participado en todas las sesiones y validaciones correspondientes al ciclo docente 2026. Ya puede descargar su constancia digital.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">
              Aviso de Seguimiento Docente
            </h4>
            <p className="mt-0.5 text-amber-800">
              Revise a continuación los módulos pendientes o con sesiones incompletas para regularizar su asistencia en las próximas convocatorias institucionales.
            </p>
          </div>
        </div>
      )}

      {/* Courses Accordion List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Desglose por Módulo de Capacitación (5 Cursos)
          </h2>
          <button
            onClick={() => {
              const allExpanded = Object.values(expandedCourses).every(Boolean);
              setExpandedCourses({
                c1: !allExpanded,
                c2: !allExpanded,
                c3: !allExpanded,
                c4: !allExpanded,
                c5: !allExpanded,
              });
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {Object.values(expandedCourses).every(Boolean) ? 'Plegar todos' : 'Desplegar todos'}
          </button>
        </div>

        {docente.capacitaciones.map((cap, idx) => {
          const meta = COURSES_METADATA.find((m) => m.id === cap.id);
          const isExpanded = expandedCourses[cap.id] ?? true;

          return (
            <div
              key={cap.id}
              className={`bg-white rounded-xl border transition-all shadow-sm overflow-hidden ${
                cap.completado ? 'border-slate-200' : 'border-amber-200/80 bg-slate-50/50'
              }`}
            >
              {/* Course Accordion Header */}
              <div
                onClick={() => toggleCourse(cap.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 pr-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                      cap.completado
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    M{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {meta?.codigo || cap.id}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {meta?.modalidad}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                      {cap.titulo}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                      cap.completado
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    {cap.completado ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden sm:inline">Validado /</span> Completado
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pendiente
                      </>
                    )}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Course Detail Expanded Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/60 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {meta?.descripcion}
                  </p>

                  <div className="text-xs bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700">Criterio Institucional de Validación:</span>{' '}
                    <span className="text-slate-600">{cap.criterioValidacion}</span>
                  </div>

                  {/* Sessions Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Registro de Asistencia por Sesión ({cap.sesiones.length} sesiones):
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {cap.sesiones.map((ses, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                            ses.asistio
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                              : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="font-bold block text-slate-900">
                              {ses.nombre}
                            </span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {ses.fecha} {ses.modalidad && `• ${ses.modalidad}`}
                            </span>
                          </div>

                          {ses.asistio ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Asistió
                            </span>
                          ) : (
                            <span className="text-rose-600 font-semibold flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                              <XCircle className="w-3.5 h-3.5 text-rose-500" />
                              No Asistió
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for Certificate */}
      {showCertificate && (
        <CertificateModal docente={docente} onClose={() => setShowCertificate(false)} />
      )}
    </div>
  );
};
