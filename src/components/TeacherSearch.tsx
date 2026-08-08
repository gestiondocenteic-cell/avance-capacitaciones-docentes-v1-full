import React, { useState, useMemo } from 'react';
import { Docente, ObservacionLevel } from '../types/docente';
import { TeacherCard } from './TeacherCard';
import { Search, Filter, X, Sparkles, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface TeacherSearchProps {
  docentes: Docente[];
  onSelectDocente: (docente: Docente) => void;
}

export const TeacherSearch: React.FC<TeacherSearchProps> = ({
  docentes,
  onSelectDocente,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObservacion, setSelectedObservacion] = useState<string>('TODOS');
  const [completionFilter, setCompletionFilter] = useState<string>('TODOS');

  // Filtered docentes list
  const filteredDocentes = useMemo(() => {
    return docentes.filter((doc) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        doc.apellidosNombres.toLowerCase().includes(query) ||
        doc.dni.includes(query) ||
        doc.correo.toLowerCase().includes(query);

      const matchesObs =
        selectedObservacion === 'TODOS' || doc.observacion === selectedObservacion;

      let matchesCompletion = true;
      if (completionFilter === '100%') {
        matchesCompletion = doc.porcentajeParticipacion === 100;
      } else if (completionFilter === 'EN_PROGRESO') {
        matchesCompletion =
          doc.porcentajeParticipacion > 0 && doc.porcentajeParticipacion < 100;
      } else if (completionFilter === 'BAJO') {
        matchesCompletion = doc.porcentajeParticipacion <= 20;
      }

      return matchesSearch && matchesObs && matchesCompletion;
    });
  }, [docentes, searchTerm, selectedObservacion, completionFilter]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedObservacion('TODOS');
    setCompletionFilter('TODOS');
  };

  // Featured sample teachers for quick access
  const sampleTeachers = useMemo(() => {
    return docentes.filter(
      (d) =>
        d.apellidosNombres.includes('ALVAREZ MALLQUI') ||
        d.apellidosNombres.includes('DUEÑAS MISAYAURI') ||
        d.apellidosNombres.includes('CHIPANA GAGO') ||
        d.apellidosNombres.includes('ASTO CAMPOS')
    );
  }, [docentes]);

  return (
    <div className="space-y-6">
      {/* Search Hero Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Portal de Verificación de Capacitación Docente
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Consulte su avance de capacitación y cursos completados
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Ingrese sus nombres, apellidos, DNI o correo institucional para visualizar su registro detallado de asistencia y estado de validación.
          </p>

          {/* Big Search Input */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por Nombre, Apellido, DNI (ej: 20067377) o Correo..."
                className="w-full pl-12 pr-12 py-3.5 bg-white text-slate-900 rounded-xl shadow-lg border-2 border-transparent focus:border-emerald-500 focus:outline-none text-sm sm:text-base font-medium placeholder-slate-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Access Teachers Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Búsqueda rápida:</span>
            {sampleTeachers.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setSearchTerm(st.apellidosNombres);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-600/30 hover:border-emerald-500/50 border border-slate-700 text-slate-200 transition-all text-left flex items-center gap-1.5"
              >
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span className="font-semibold">{st.apellidosNombres.split(' ')[0]}</span>
                <span className="text-emerald-400 text-[10px]">({st.porcentajeParticipacion}%)</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Observación Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Nivel:
          </span>
          {['TODOS', 'Excelente', 'Bueno', 'Regular', 'Bajo'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedObservacion(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedObservacion === level
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Completion status filters */}
        <div className="flex items-center space-x-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <span className="text-xs font-semibold text-slate-500">Estado:</span>
          <select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="TODOS">Todos los avances</option>
            <option value="100%">100% Completados (Excelente)</option>
            <option value="EN_PROGRESO">En Progreso (40% - 80%)</option>
            <option value="BAJO">Avance Inicial (0% - 20%)</option>
          </select>

          {(searchTerm || selectedObservacion !== 'TODOS' || completionFilter !== 'TODOS') && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-rose-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-600 px-1">
        <div>
          Mostrando <span className="font-bold text-slate-900">{filteredDocentes.length}</span> docente(s)
          {searchTerm && <span> para "{searchTerm}"</span>}
        </div>
        <div className="text-xs text-slate-500">
          Haga clic en una tarjeta para ver el desglose por sesión y constancia
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredDocentes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocentes.map((docente) => (
            <TeacherCard
              key={docente.id}
              docente={docente}
              onSelect={onSelectDocente}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base">
            No se encontraron docentes con esos criterios
          </h3>
          <p className="text-slate-500 text-xs">
            Intente modificar los términos de búsqueda o restablecer los filtros para ver la lista completa.
          </p>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Restablecer búsqueda
          </button>
        </div>
      )}
    </div>
  );
};
