import React from 'react';
import { Briefcase, Sparkles, FileText, BarChart3, CheckCircle2, Send, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'upload' | 'vagas' | 'insights' | 'candidaturas';
  setActiveTab: (tab: 'upload' | 'vagas' | 'insights' | 'candidaturas') => void;
  hasAnalyzedResume: boolean;
  appliedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasAnalyzedResume,
  appliedCount
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-8 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Motor de Otimização ATS Corporativo • Gupy, LinkedIn Recruiter & Catho</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
          <span>Formatos suportados: .PDF, .DOC, .DOCX, .TXT</span>
          <span className="text-slate-600">•</span>
          <span>Processamento 100% Privado</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-900 text-white rounded-lg shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Vagas Corporativas <span className="text-slate-400 font-normal">| Otimizador ATS</span>
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Plataforma otimizada para profissionais corporativos analisarem currículos em PDF/Doc, encontrarem vagas compatíveis e aplicarem em lote com alta conversão.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status do Analisador</p>
                <p className="text-xs font-semibold text-slate-800">
                  {hasAnalyzedResume ? 'Currículo Analisado' : 'Aguardando Documento'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${hasAnalyzedResume ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 mt-6 border-b border-slate-100 overflow-x-auto pb-0 text-sm font-medium">
          <button
            id="tab-upload"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-slate-900 text-slate-900 font-semibold bg-slate-50/80 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Documento & Currículo (PDF/Doc)</span>
          </button>

          <button
            id="tab-vagas"
            onClick={() => setActiveTab('vagas')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'vagas'
                ? 'border-slate-900 text-slate-900 font-semibold bg-slate-50/80 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Vagas & Match em Lote</span>
          </button>

          <button
            id="tab-insights"
            onClick={() => setActiveTab('insights')}
            disabled={!hasAnalyzedResume}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              !hasAnalyzedResume
                ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
                : activeTab === 'insights'
                ? 'border-slate-900 text-slate-900 font-semibold bg-slate-50/80 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>3. Relatório & Insights ATS</span>
            {hasAnalyzedResume && (
              <span className="ml-1 px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-bold">
                Pronto
              </span>
            )}
          </button>

          <button
            id="tab-candidaturas"
            onClick={() => setActiveTab('candidaturas')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'candidaturas'
                ? 'border-slate-900 text-slate-900 font-semibold bg-slate-50/80 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>4. Minhas Candidaturas</span>
            {appliedCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-[10px] bg-slate-900 text-white rounded-full font-bold">
                {appliedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
