import React, { useState } from 'react';
import { OverallAnalysisResult, JobVacancy, CandidateResume } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  Copy, 
  Check, 
  FileText, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Send, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Building2,
  Info
} from 'lucide-react';

interface ResultsSectionProps {
  analysis: OverallAnalysisResult;
  resume: CandidateResume;
  jobs: JobVacancy[];
  onApplyJob: (job: JobVacancy, pitch: string) => void;
  appliedJobIds: string[];
  onNavigateToJobs: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  analysis,
  resume,
  jobs,
  onApplyJob,
  appliedJobIds,
  onNavigateToJobs
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(
    analysis.jobMatches[0]?.jobId || jobs[0]?.id || ''
  );
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [copiedBulletsId, setCopiedBulletsId] = useState<boolean>(false);

  const selectedMatch = analysis.jobMatches.find(m => m.jobId === selectedJobId);
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleCopyPitch = (pitch: string, jobId: string) => {
    navigator.clipboard.writeText(pitch);
    setCopiedPitchId(jobId);
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const handleCopyBullets = (bullets: string[]) => {
    navigator.clipboard.writeText(bullets.join('\n\n'));
    setCopiedBulletsId(true);
    setTimeout(() => setCopiedBulletsId(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Overview */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
              Relatório de Otimização & Inteligência ATS
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Análise de Compatibilidade do Currículo
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Documento: <span className="font-semibold text-slate-900">{resume.fileName}</span> ({resume.fileSize})
            </p>
          </div>

          {/* Overall Score Dial */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 self-start md:self-auto">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white font-extrabold text-xl shadow-sm">
              {analysis.atsScore}%
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Pontuação ATS Média</p>
              <p className="text-sm font-bold text-slate-900">
                {analysis.atsScore >= 80
                  ? 'Excelente Aderência Gupy/LinkedIn'
                  : analysis.atsScore >= 60
                  ? 'Aderência Moderada (Com Ajustes)'
                  : 'Necessita Reestruturação Urgente'}
              </p>
              <p className="text-xs text-slate-500">Baseado no cruzamento com {jobs.length} vagas ativos</p>
            </div>
          </div>
        </div>

        {/* Written Executive Summary */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Parecer Executivo de Diagnóstico</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {analysis.overallSummary}
          </p>
        </div>

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-xs font-semibold text-slate-500">Estrutura de Seções ATS</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-slate-900">{analysis.formattingScore}%</span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Gupy Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Mede seções essenciais: Resumo, Experiência, Formação e Habilidades.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-xs font-semibold text-slate-500">Métricas & Resultados Quantificados</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-slate-900">{analysis.impactScore}%</span>
              <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {resume.detectedMetricsCount} métricas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Recrutadores corporativos priorizam conquistas com números (% e R$).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-xs font-semibold text-slate-500">Vagas de Alto Match (&gt;75%)</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-slate-900">
                {analysis.jobMatches.filter(m => m.matchScore >= 75).length} de {jobs.length}
              </span>
              <span className="text-xs font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                Pronto P/ Aplicação
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Vagas para as quais seu perfil tem maior chance de passar na triagem.
            </p>
          </div>
        </div>

        {/* Strengths & Gaps Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Strengths */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm pb-2 border-b border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pontos Fortes Identificados</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {analysis.topStrengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps & Warnings */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm pb-2 border-b border-slate-100">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Lacunas & Alertas de Triagem</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {analysis.criticalGaps.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{g}</span>
                </li>
              ))}
              {analysis.gupyWarnings.map((w, idx) => (
                <li key={`w-${idx}`} className="flex items-start gap-2 text-rose-700 font-medium">
                  <span className="text-rose-600 font-bold">!</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Per-Job Deep Matching Matrix & Pitch Generator */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
            Matriz de Compatibilidade Vaga a Vaga
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Análise Individual por Oportunidade & Gerador de Carta de Apresentação
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Selecione uma vaga para visualizar os termos que faltam no seu currículo e copiar a mensagem pronta direcionada para o recrutador.
          </p>
        </div>

        {/* Job Selector Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {jobs.map(job => {
            const match = analysis.jobMatches.find(m => m.jobId === job.id);
            const score = match ? match.matchScore : 50;
            const isSelected = job.id === selectedJobId;
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`p-3.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {job.system}
                    </span>
                    <span className={`font-bold ${
                      score >= 80 ? 'text-emerald-400 font-extrabold' : score >= 60 ? 'text-amber-300' : 'text-slate-400'
                    }`}>
                      {score}% Match
                    </span>
                  </div>
                  <p className="font-bold line-clamp-1">{job.title}</p>
                  <p className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'} truncate`}>
                    {job.company}
                  </p>
                </div>

                {isApplied && (
                  <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Candidatura Registrada</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Job Detailed Analysis Box */}
        {selectedJob && selectedMatch && (
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/60 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-700" />
                  <h4 className="text-lg font-bold text-slate-900">{selectedJob.title}</h4>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Empresa: <strong className="text-slate-900">{selectedJob.company}</strong> • Departamento: {selectedJob.department} • Sistema: {selectedJob.system}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Score de Triagem Gupy</p>
                  <p className="text-xl font-black text-slate-900">{selectedMatch.matchScore}/100</p>
                </div>
                {!appliedJobIds.includes(selectedJob.id) ? (
                  <button
                    onClick={() => onApplyJob(selectedJob, selectedMatch.tailoredPitch)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Registrar Candidatura</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Candidatado</span>
                  </span>
                )}
              </div>
            </div>

            {/* Keyword Match Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Palavras-chave Presentes no seu CV ({selectedMatch.matchedKeywords.length})
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMatch.matchedKeywords.length > 0 ? (
                    selectedMatch.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium rounded">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Nenhuma palavra-chave exata encontrada.</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
                <p className="text-xs font-bold text-rose-800 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Termos Faltantes (Recomendado Incluir) ({selectedMatch.missingKeywords.length})
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMatch.missingKeywords.length > 0 ? (
                    selectedMatch.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-medium rounded">
                        + {kw}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-emerald-600 font-medium">100% dos termos chave encontrados!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tailored Pitch / Cover Letter Generator */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Carta de Apresentação & Pitch para o Recrutador da {selectedJob.company}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Utilize este texto pré-redigido ao candidatar-se na plataforma {selectedJob.system} ou ao enviar mensagem direta no LinkedIn.
                  </p>
                </div>

                <button
                  onClick={() => handleCopyPitch(selectedMatch.tailoredPitch, selectedJob.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                >
                  {copiedPitchId === selectedJob.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                value={selectedMatch.tailoredPitch}
                rows={10}
                className="w-full text-xs font-sans p-3.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg leading-relaxed focus:outline-none"
              />
            </div>

            {/* Bullet Point Modification Recommendations */}
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Info className="w-4 h-4 text-amber-700" />
                  Ajustes Recomendados no Texto do Currículo para esta Vaga:
                </p>
                <button
                  onClick={() => handleCopyBullets(selectedMatch.bulletRecommendations)}
                  className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
                >
                  {copiedBulletsId ? 'Dicas Copiadas!' : 'Copiar Dicas'}
                </button>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-900/90 pl-5 list-disc">
                {selectedMatch.bulletRecommendations.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CTA to Jobs List */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onNavigateToJobs}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm"
          >
            <span>Ver Lista Completa de Vagas & Candidatura em Lote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
