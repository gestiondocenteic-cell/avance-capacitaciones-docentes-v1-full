import React, { useRef } from 'react';
import { Docente } from '../types/docente';
import { COURSES_METADATA } from '../data/coursesData';
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck, GraduationCap } from 'lucide-react';

interface CertificateModalProps {
  docente: Docente;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ docente, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const completedCourses = docente.capacitaciones.filter((c) => c.completado);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Modal Controls Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">Constancia Digital de Capacitación Docente</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Designed to fit well on print / A4 landscape view) */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-12 bg-slate-50 relative overflow-hidden print:p-8 print:bg-white"
        >
          {/* Certificate Frame */}
          <div className="border-8 border-double border-slate-300 p-8 bg-white shadow-inner rounded-xl relative">
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none p-12">
              <img 
                src="https://res.cloudinary.com/xc8agmxb/image/upload/v1786160023/Recurso_5IC-EC-negro_m3y1so.png" 
                alt="Watermark Logo" 
                className="max-w-md max-h-96 object-contain" 
              />
            </div>

            {/* Top Header */}
            <div className="text-center space-y-3 mb-8 relative z-10">
              <div className="flex justify-center mb-3">
                <img 
                  src="https://res.cloudinary.com/xc8agmxb/image/upload/v1786160023/Recurso_5IC-EC-negro_m3y1so.png" 
                  alt="Instituto Continental | Escuela Continental" 
                  className="h-16 sm:h-20 object-contain max-w-xs"
                />
              </div>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border-2 border-emerald-200 mx-auto">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  INSTITUTO CONTINENTAL | ESCUELA CONTINENTAL • SUB DIRECCIÓN ACADÉMICA
                </h4>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  CONSTANCIA DE CAPACITACIÓN DOCENTE
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  CÓDIGO DE REGISTRO: <span className="font-mono font-bold text-slate-700">UC-CAP-2026-{docente.dni}</span>
                </p>
              </div>
            </div>

            {/* Granting Statement */}
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
              <p className="text-slate-600 text-sm">
                Se otorga la presente constancia institucional a:
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-800 tracking-wide underline underline-offset-8 decoration-emerald-300">
                {docente.apellidosNombres}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Identificado(a) con DNI <strong className="text-slate-900">{docente.dni}</strong> y correo institucional{' '}
                <strong className="text-slate-900">{docente.correo}</strong>, por haber participado satisfactoriamente en el Programa de Capacitación Docente 2026.
              </p>
            </div>

            {/* Completed Courses Table */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Módulos de Capacitación Aprobados ({completedCourses.length} de 5):
              </h3>

              {completedCourses.length > 0 ? (
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Código</th>
                        <th className="px-4 py-2.5">Módulo / Curso</th>
                        <th className="px-4 py-2.5 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      {completedCourses.map((cap) => {
                        const meta = COURSES_METADATA.find((m) => m.id === cap.id);
                        return (
                          <tr key={cap.id} className="bg-white">
                            <td className="px-4 py-2.5 font-mono text-slate-500">{meta?.codigo || cap.id}</td>
                            <td className="px-4 py-2.5 font-semibold text-slate-800">{cap.titulo}</td>
                            <td className="px-4 py-2.5 text-center">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Validado
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center text-xs text-amber-800">
                  El docente aún no ha completado la totalidad de sesiones requeridas para la acreditación formal de módulos.
                </div>
              )}
            </div>

            {/* Summary Badge */}
            <div className="bg-slate-100 rounded-xl p-4 max-w-xl mx-auto flex items-center justify-around text-center mb-8 border border-slate-200">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Avance Total</span>
                <span className="text-xl font-extrabold text-emerald-700">{docente.porcentajeParticipacion}%</span>
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Cursos Aprobados</span>
                <span className="text-xl font-extrabold text-slate-800">{docente.capacitacionesTotal} / 5</span>
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Calificación</span>
                <span className="text-xl font-extrabold text-teal-700">{docente.observacion}</span>
              </div>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center max-w-xl mx-auto">
              <div className="space-y-1">
                <div className="w-32 h-10 border-b-2 border-slate-400 mx-auto flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-slate-400">Firma Digital Validada</span>
                </div>
                <p className="text-xs font-bold text-slate-800">Sub Dirección Académica</p>
                <p className="text-[10px] text-slate-500">Instituto Continental | Escuela Continental</p>
              </div>
              <div className="space-y-1">
                <div className="w-32 h-10 border-b-2 border-slate-400 mx-auto flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-slate-400">Firma Digital Validada</span>
                </div>
                <p className="text-xs font-bold text-slate-800">Oficina de Gestión Docente</p>
                <p className="text-[10px] text-slate-500">Instituto Continental | Escuela Continental</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 text-xs text-slate-500 flex justify-between items-center border-t border-slate-200 print:hidden">
          <span>Emitido digitalmente el {new Date().toLocaleDateString('es-PE')}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
