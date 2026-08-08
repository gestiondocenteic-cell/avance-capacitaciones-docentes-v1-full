import React from 'react';
import { COURSES_METADATA } from '../data/coursesData';
import { Calendar, Clock, Monitor, MapPin, CheckCircle, Info, ShieldCheck } from 'lucide-react';

export const CourseCalendar: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-600" />
          Calendario y Programación de Módulos de Capacitación 2026
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Fechas oficiales de las sesiones síncronas, asíncronas y talleres presenciales programados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {COURSES_METADATA.map((course, idx) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-emerald-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                  M{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {course.codigo}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{course.modalidad}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{course.titulo}</h3>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 self-start sm:self-auto">
                {course.totalSesiones} {course.totalSesiones === 1 ? 'Sesión' : 'Sesiones'} Total
              </span>
            </div>

            <p className="text-xs text-slate-600">{course.descripcion}</p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-slate-900">Requisito para Aprobación:</strong> {course.criterioValidacion}
              </span>
            </div>

            {/* Dates listing depending on module */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Fechas de Ejecución Registradas en Sistema:
              </h4>

              {course.id === 'c1' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['09/03/2026', '12/03/2026', '17/03/2026', '19/03/2026', '24/03/2026', '26/03/2026'].map(
                    (f, s) => (
                      <div key={s} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                        <span className="font-medium text-slate-700">Sesión {s + 1}</span>
                        <span className="font-mono font-bold text-emerald-700">{f}</span>
                      </div>
                    )
                  )}
                </div>
              )}

              {course.id === 'c2' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5 text-indigo-500" /> Sesión 1 (Virtual)
                    </span>
                    <span className="font-mono font-bold text-indigo-700">03/03/2026</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5 text-indigo-500" /> Sesión 2 (Virtual)
                    </span>
                    <span className="font-mono font-bold text-indigo-700">05/03/2026</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Sesión Presencial
                    </span>
                    <span className="font-mono font-bold text-emerald-700">07/03/2026</span>
                  </div>
                </div>
              )}

              {course.id === 'c3' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['09/04/2026', '14/04/2026', '23/04/2026', '31/04/2026'].map((f, s) => (
                    <div key={s} className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                      <span className="font-medium text-slate-700">Sesión {s + 1}</span>
                      <span className="font-mono font-bold text-amber-700">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {course.id === 'c4' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700">Sesión 1 (Virtual)</span>
                    <span className="font-mono font-bold text-blue-700">07/07/2026</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700">Sesión 2 (Virtual)</span>
                    <span className="font-mono font-bold text-blue-700">14/07/2026</span>
                  </div>
                </div>
              )}

              {course.id === 'c5' && (
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-slate-700">Sesión Unica (Virtual)</span>
                    <span className="font-mono font-bold text-violet-700">10/07/2026</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
