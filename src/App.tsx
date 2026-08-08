import React, { useState, useMemo } from 'react';
import { DOCENTES_LIST } from './data/docentesData';
import { Docente } from './types/docente';
import { Navbar } from './components/Navbar';
import { TeacherSearch } from './components/TeacherSearch';
import { TeacherDetail } from './components/TeacherDetail';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CourseCalendar } from './components/CourseCalendar';
import { GraduationCap, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'dashboard' | 'calendar'>('search');
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);

  // General metrics for header badge
  const totalDocentes = DOCENTES_LIST.length;
  const excelenteCount = useMemo(
    () => DOCENTES_LIST.filter((d) => d.porcentajeParticipacion === 100).length,
    []
  );
  const promedioParticipacion = useMemo(() => {
    const sum = DOCENTES_LIST.reduce((acc, curr) => acc + curr.porcentajeParticipacion, 0);
    return Math.round((sum / totalDocentes) * 10) / 10;
  }, [totalDocentes]);

  const handleSelectDocente = (docente: Docente) => {
    setSelectedDocente(docente);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSearch = () => {
    setSelectedDocente(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedDocente(null);
        }}
        totalDocentes={totalDocentes}
        excelenteCount={excelenteCount}
        promedioParticipacion={promedioParticipacion}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedDocente ? (
          <TeacherDetail
            docente={selectedDocente}
            onBack={handleBackToSearch}
          />
        ) : (
          <>
            {activeTab === 'search' && (
              <TeacherSearch
                docentes={DOCENTES_LIST}
                onSelectDocente={handleSelectDocente}
              />
            )}

            {activeTab === 'dashboard' && (
              <AnalyticsDashboard
                docentes={DOCENTES_LIST}
                onSelectDocente={handleSelectDocente}
              />
            )}

            {activeTab === 'calendar' && <CourseCalendar />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white px-2 py-0.5 rounded flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/xc8agmxb/image/upload/v1786160023/Recurso_5IC-EC-negro_m3y1so.png" 
                alt="Instituto Continental | Escuela Continental" 
                className="h-5 object-contain"
              />
            </div>
            <span className="text-slate-300 font-semibold">
              OFICINA DE GESTIÓN DOCENTE • Portal de Capacitaciones Docentes 2026
            </span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Validación de Asistencia Oficial
            </span>
            <span className="hidden md:inline">•</span>
            <span>Soporte Académico: gestiondocenteic@continental.edu.pe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
