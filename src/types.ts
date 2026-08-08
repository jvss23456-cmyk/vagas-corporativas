export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  location: string;
  workModel: 'Híbrido' | 'Presencial' | 'Remoto';
  system: 'Gupy' | 'LinkedIn' | 'Catho' | 'Solides' | 'Interno';
  department: string;
  level: 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista' | 'Gerência' | 'Direção';
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  keywords: string[];
  postedDate: string;
  applicantsCount: number;
  matchScore?: number;
  matchReasoning?: string;
}

export interface CandidateResume {
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'txt';
  rawText: string;
  parsedName?: string;
  parsedRole?: string;
  parsedEmail?: string;
  parsedPhone?: string;
  detectedMetricsCount: number;
  detectedSections: string[];
}

export interface DetailedMatchAnalysis {
  jobId: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  atsStatus: 'Altamente Compatível' | 'Compatibilidade Média' | 'Risco de Incompatibilidade';
  gupyScoreEstimate: number; // 0 to 100
  tailoredPitch: string;
  bulletRecommendations: string[];
}

export interface OverallAnalysisResult {
  atsScore: number;
  formattingScore: number;
  impactScore: number;
  overallSummary: string;
  topStrengths: string[];
  criticalGaps: string[];
  gupyWarnings: string[];
  jobMatches: DetailedMatchAnalysis[];
}

export interface BatchApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  system: string;
  appliedDate: string;
  status: 'Triagem ATS' | 'Visualizado por Recrutador' | 'Entrevista Agendada' | 'Proposta Recebida';
  pitchText: string;
  notes: string;
}
