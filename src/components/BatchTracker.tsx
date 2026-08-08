import React, { useState } from 'react';
import { BatchApplication } from '../types';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Trash2, 
  Edit3, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Search,
  Filter,
  Briefcase
} from 'lucide-react';

interface BatchTrackerProps {
  applications: BatchApplication[];
  onUpdateStatus: (id: string, newStatus: BatchApplication['status']) => void;
  onRemoveApplication: (id: string) => void;
  onNavigateToJobs: () => void;
}

export const BatchTracker: React.FC<BatchTrackerProps> = ({
  applications,
  onUpdateStatus,
  onRemoveApplication,
  onNavigateToJobs
}) => {
  const [copiedReport, setCopiedReport] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('todos');

  const filteredApps = applications.filter(app => {
    if (selectedStatusFilter === 'todos') return true;
    return app.status === selectedStatusFilter;
  });

  const handleExportSummary = () => {
    const textLines = applications.map((a, i) => (
      `${i + 1}. VAGA: ${a.jobTitle} | EMPRESA: ${a.company} (${a.system})\n   DATA: ${a.appliedDate} | STATUS: ${a.status}\n   PITCH UTILIZADO: ${a.pitchText ? 'Sim' : 'Não'}`
    ));

    const fullReport = `RELATÓRIO DE CANDIDATURAS CORPORATIVAS EM LOTE\nGerado em: ${new Date().toLocaleDateString('pt-BR')}\nTotal de Processos: ${applications.length}\n\n${textLines.join('\n\n')}`;

    navigator.clipboard.writeText(fullReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
              Acompanhamento de Processos Seletivos
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Painel de Candidaturas em Lote
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Gerencie suas candidaturas enviadas para plataformas Gupy, LinkedIn e recrutadores diretos.
            </p>
          </div>

          {applications.length > 0 && (
            <button
              onClick={handleExportSummary}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors self-start md:self-auto"
            >
              {copiedReport ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Relatório Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Relatório Completo</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        {applications.length > 0 && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto text-xs border-t border-slate-100">
            <span className="text-slate-400 font-medium">Filtrar Status:</span>
            {['todos', 'Triagem ATS', 'Visualizado por Recrutador', 'Entrevista Agendada', 'Proposta Recebida'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  selectedStatusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st === 'todos' ? 'Todas' : st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-3">
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider rounded">
                    {app.system}
                  </span>
                  <span className="text-xs text-slate-400">• Aplicado em: {app.appliedDate}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{app.jobTitle}</h3>
                <p className="text-xs text-slate-600 font-medium">{app.company}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Status Dropdown Selector */}
                <select
                  value={app.status}
                  onChange={(e) => onUpdateStatus(app.id, e.target.value as BatchApplication['status'])}
                  className={`text-xs px-3 py-2 rounded-lg font-bold border focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                    app.status === 'Proposta Recebida'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : app.status === 'Entrevista Agendada'
                      ? 'bg-blue-50 text-blue-900 border-blue-300'
                      : app.status === 'Visualizado por Recrutador'
                      ? 'bg-purple-50 text-purple-900 border-purple-300'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <option value="Triagem ATS">Triagem ATS</option>
                  <option value="Visualizado por Recrutador">Visualizado por Recrutador</option>
                  <option value="Entrevista Agendada">Entrevista Agendada</option>
                  <option value="Proposta Recebida">Proposta Recebida</option>
                </select>

                <button
                  onClick={() => onRemoveApplication(app.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors self-start sm:self-auto"
                  title="Remover candidatura do histórico"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Send className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Nenhuma candidatura registrada ainda
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Navegue pelas vagas corporativas, ative a seleção em lote e aplique com um clique para gerenciar seu histórico aqui.
            </p>
          </div>
          <button
            onClick={onNavigateToJobs}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 hover:bg-slate-800"
          >
            <span>Explorar Vagas Corporativas</span>
          </button>
        </div>
      )}
    </div>
  );
};
