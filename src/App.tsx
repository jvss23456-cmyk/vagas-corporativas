import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { ProcessingAnimation } from './components/ProcessingAnimation';
import { ResultsSection } from './components/ResultsSection';
import { JobList } from './components/JobList';
import { BatchTracker } from './components/BatchTracker';
import { CandidateResume, OverallAnalysisResult, JobVacancy, BatchApplication } from './types';
import { MOCK_CORPORATE_JOBS } from './data/mockJobs';
import { analyzeResumeAgainstJobs } from './utils/resumeAnalyzer';
import { CheckCircle2, Sparkles, Send, FileText, ArrowRight, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'vagas' | 'insights' | 'candidaturas'>('upload');
  const [currentResume, setCurrentResume] = useState<CandidateResume | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<OverallAnalysisResult | null>(null);
  const [batchApplications, setBatchApplications] = useState<BatchApplication[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initiates 3-second visual thinking animation and computes ATS insights
  const handleStartAnalysis = (resume: CandidateResume) => {
    setCurrentResume(resume);
    setIsAnalyzing(true);
  };

  const handleProcessingComplete = () => {
    if (currentResume) {
      const result = analyzeResumeAgainstJobs(currentResume, MOCK_CORPORATE_JOBS);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setActiveTab('insights');
      showToast('Currículo otimizado e cruzado com sucesso!');
    }
  };

  const handleApplySingleJob = (job: JobVacancy, pitch: string) => {
    if (batchApplications.some(a => a.jobId === job.id)) {
      showToast('Você já se candidatou a esta vaga!');
      return;
    }

    const newApp: BatchApplication = {
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      system: job.system,
      appliedDate: new Date().toLocaleDateString('pt-BR'),
      status: 'Triagem ATS',
      pitchText: pitch || 'Carta de Apresentação Otimizada',
      notes: ''
    };

    setBatchApplications(prev => [newApp, ...prev]);
    showToast(`Candidatura registrada com sucesso para ${job.company}!`);
  };

  const handleApplyBatchJobs = (selectedJobs: JobVacancy[]) => {
    const newApps: BatchApplication[] = [];

    selectedJobs.forEach(job => {
      if (!batchApplications.some(a => a.jobId === job.id)) {
        const match = analysisResult?.jobMatches.find(m => m.jobId === job.id);
        newApps.push({
          id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          system: job.system,
          appliedDate: new Date().toLocaleDateString('pt-BR'),
          status: 'Triagem ATS',
          pitchText: match?.tailoredPitch || '',
          notes: 'Candidatura em lote automatizada'
        });
      }
    });

    if (newApps.length > 0) {
      setBatchApplications(prev => [...newApps, ...prev]);
      showToast(`Sucesso! Candidaturas enviadas em lote para ${newApps.length} vagas.`);
      setActiveTab('candidaturas');
    } else {
      showToast('Vagas selecionadas já constam no seu histórico.');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: BatchApplication['status']) => {
    setBatchApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
    showToast('Status da candidatura atualizado!');
  };

  const handleRemoveApplication = (id: string) => {
    setBatchApplications(prev => prev.filter(app => app.id !== id));
    showToast('Candidatura removida do histórico.');
  };

  const appliedJobIds = batchApplications.map(a => a.jobId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Fixed Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalyzedResume={!!analysisResult}
        appliedCount={batchApplications.length}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAnalyzing ? (
          <ProcessingAnimation onComplete={handleProcessingComplete} />
        ) : (
          <>
            {/* TAB 1: Document Upload */}
            {activeTab === 'upload' && (
              <FileUploader
                onAnalyzeResume={handleStartAnalysis}
                currentResume={currentResume}
              />
            )}

            {/* TAB 2: Multi-Job Search & Batch Match */}
            {activeTab === 'vagas' && (
              <JobList
                jobs={MOCK_CORPORATE_JOBS}
                analysis={analysisResult}
                onApplySingleJob={handleApplySingleJob}
                onApplyBatchJobs={handleApplyBatchJobs}
                appliedJobIds={appliedJobIds}
              />
            )}

            {/* TAB 3: Written Insights & ATS Diagnostics */}
            {activeTab === 'insights' && analysisResult && currentResume && (
              <ResultsSection
                analysis={analysisResult}
                resume={currentResume}
                jobs={MOCK_CORPORATE_JOBS}
                onApplyJob={handleApplySingleJob}
                appliedJobIds={appliedJobIds}
                onNavigateToJobs={() => setActiveTab('vagas')}
              />
            )}

            {/* TAB 4: Batch Application Tracker */}
            {activeTab === 'candidaturas' && (
              <BatchTracker
                applications={batchApplications}
                onUpdateStatus={handleUpdateStatus}
                onRemoveApplication={handleRemoveApplication}
                onNavigateToJobs={() => setActiveTab('vagas')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 Otimizador de Vagas Corporativas • Desenvolvido para Profissionais no Brasil
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Privacidade & Dados Protegidos</span>
            <span>•</span>
            <span>Gupy & LinkedIn Recruiter Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
