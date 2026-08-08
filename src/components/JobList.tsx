import React, { useState } from 'react';
import { JobVacancy, OverallAnalysisResult } from '../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  MapPin, 
  Send, 
  Sparkles, 
  Layers, 
  CheckSquare, 
  Square,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Users
} from 'lucide-react';

interface JobListProps {
  jobs: JobVacancy[];
  analysis: OverallAnalysisResult | null;
  onApplySingleJob: (job: JobVacancy, pitch: string) => void;
  onApplyBatchJobs: (selectedJobs: JobVacancy[]) => void;
  appliedJobIds: string[];
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  analysis,
  onApplySingleJob,
  onApplyBatchJobs,
  appliedJobIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState<string>('todos');
  const [workModelFilter, setWorkModelFilter] = useState<string>('todos');
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [previewJob, setPreviewJob] = useState<JobVacancy | null>(null);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSystem = systemFilter === 'todos' || job.system === systemFilter;
    const matchesWorkModel = workModelFilter === 'todos' || job.workModel === workModelFilter;

    return matchesSearch && matchesSystem && matchesWorkModel;
  });

  const toggleSelectJob = (id: string) => {
    if (selectedJobIds.includes(id)) {
      setSelectedJobIds(selectedJobIds.filter(jId => jId !== id));
    } else {
      setSelectedJobIds([...selectedJobIds, id]);
    }
  };

  const handleSelectAllFiltered = () => {
    if (selectedJobIds.length === filteredJobs.length) {
      setSelectedJobIds([]);
    } else {
      setSelectedJobIds(filteredJobs.map(j => j.id));
    }
  };

  const handleExecuteBatchApply = () => {
    const selectedJobsList = jobs.filter(j => selectedJobIds.includes(j.id));
    onApplyBatchJobs(selectedJobsList);
    setSelectedJobIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
              Otimização de Candidatura em Lote
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Vagas Corporativas em Destaque no Brasil
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Filtre vagas por plataforma ATS e selecione múltiplas oportunidades para candidatar-se com o currículo otimizado.
            </p>
          </div>

          {/* Batch Apply Trigger Button */}
          {selectedJobIds.length > 0 && (
            <div className="flex items-center gap-3 animate-fade-in">
              <button
                onClick={handleExecuteBatchApply}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Candidatar em Lote ({selectedJobIds.length} Vagas Selecionadas)</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cargo, empresa (ex: Nubank, Ambev) ou tecnologia..."
              className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* System Filter */}
          <div className="sm:col-span-3">
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="w-full text-xs px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
            >
              <option value="todos">Todas as Plataformas (Gupy, LinkedIn...)</option>
              <option value="Gupy">Gupy ATS</option>
              <option value="LinkedIn">LinkedIn Recruiter</option>
              <option value="Catho">Catho Corporativo</option>
            </select>
          </div>

          {/* Work Model Filter */}
          <div className="sm:col-span-3">
            <select
              value={workModelFilter}
              onChange={(e) => setWorkModelFilter(e.target.value)}
              className="w-full text-xs px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium"
            >
              <option value="todos">Todos os Modelos de Trabalho</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">100% Remoto</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>
        </div>

        {/* Batch Select Controls Bar */}
        <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-100">
          <button
            onClick={handleSelectAllFiltered}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
          >
            {selectedJobIds.length === filteredJobs.length && filteredJobs.length > 0 ? (
              <CheckSquare className="w-4 h-4 text-slate-900" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
            <span>
              {selectedJobIds.length === filteredJobs.length && filteredJobs.length > 0
                ? 'Desmarcar Todas'
                : 'Selecionar Todas as Vagas da Lista'}
            </span>
          </button>

          <span className="text-slate-500 font-medium">
            Exibindo {filteredJobs.length} de {jobs.length} vagas ativas
          </span>
        </div>
      </div>

      {/* Jobs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map(job => {
          const matchAnalysis = analysis?.jobMatches.find(m => m.jobId === job.id);
          const matchScore = matchAnalysis?.matchScore || 70;
          const isSelected = selectedJobIds.includes(job.id);
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className={`p-6 bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-slate-900 ring-2 ring-slate-900/10 bg-slate-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Top Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSelectJob(job.id)}
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      title="Selecionar para candidatura em lote"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-slate-900" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>

                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider rounded">
                      {job.system}
                    </span>

                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded">
                      {job.workModel}
                    </span>
                  </div>

                  {/* Match Score Badge */}
                  {analysis && (
                    <div className="text-right">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                        matchScore >= 80
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : matchScore >= 60
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {matchScore}% Match ATS
                      </span>
                    </div>
                  )}
                </div>

                {/* Job Title & Company */}
                <h3 className="text-base font-bold text-slate-900 hover:text-slate-700 cursor-pointer" onClick={() => setPreviewJob(job)}>
                  {job.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.company}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.requiredSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-medium rounded">
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{job.requiredSkills.length - 4} mais
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>{job.postedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {job.applicantsCount} candidatos
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewJob(job)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Detalhes
                  </button>

                  {!isApplied ? (
                    <button
                      onClick={() => onApplySingleJob(job, matchAnalysis?.tailoredPitch || '')}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>Candidatar</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Inscrito</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Quick Preview Overlay */}
      {previewJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {previewJob.system} • {previewJob.level}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{previewJob.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {previewJob.company} • {previewJob.location}
                </p>
              </div>

              <button
                onClick={() => setPreviewJob(null)}
                className="text-slate-400 hover:text-slate-900 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Faixa Salarial Estimada:</h4>
                <p className="font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block border border-emerald-100">
                  {previewJob.salaryRange}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Descrição da Posição Corporativa:</h4>
                <p className="text-slate-600">{previewJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Requisitos Técnicos & Habilidades Exigidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {previewJob.requiredSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Palavras-chave dos Filtros de ATS ({previewJob.system}):</h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewJob.keywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-900 text-white text-[10px] rounded font-mono">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewJob(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Fechar
              </button>

              {!appliedJobIds.includes(previewJob.id) ? (
                <button
                  onClick={() => {
                    onApplySingleJob(previewJob, '');
                    setPreviewJob(null);
                  }}
                  className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-slate-800"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirmar Candidatura</span>
                </button>
              ) : (
                <span className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl">
                  Já Candidatado
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
