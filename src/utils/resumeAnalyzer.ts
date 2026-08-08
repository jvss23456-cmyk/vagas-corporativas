import { CandidateResume, JobVacancy, OverallAnalysisResult, DetailedMatchAnalysis } from '../types';

export function analyzeResumeAgainstJobs(
  resume: CandidateResume,
  jobs: JobVacancy[]
): OverallAnalysisResult {
  const textUpper = resume.rawText.toUpperCase();

  // 1. Check sections formatting (ATS Gupy requirement)
  const requiredSections = ['EXPERIÊNCIA', 'FORMAÇÃO', 'RESUMO', 'HABILIDADES'];
  const foundSections = requiredSections.filter(s => textUpper.includes(s));
  const formattingScore = Math.round((foundSections.length / requiredSections.length) * 100);

  // 2. Detect Impact Numbers/Metrics (% or R$ or X+ or anos)
  const numbersRegex = /(\d+\%|\d+\s*anos|R\$\s*[\d\.\,]+[kKmM]?|\d+\s*projetos|\d+\s*colaboradores|\d+\s*esquadras|\d+\s*pontos)/gi;
  const matches = resume.rawText.match(numbersRegex) || [];
  const metricsCount = matches.length;
  let impactScore = Math.min(100, Math.round((metricsCount / 6) * 100));
  if (impactScore < 40) impactScore = 45; // baseline

  // 3. Evaluate each job
  const jobMatches: DetailedMatchAnalysis[] = jobs.map(job => {
    let matchedKw: string[] = [];
    let missingKw: string[] = [];

    job.keywords.forEach(kw => {
      // Check for keyword presence in resume text (case-insensitive)
      const regex = new RegExp(`\\b${escapeRegExp(kw)}\\b`, 'i');
      if (regex.test(resume.rawText) || textUpper.includes(kw.toUpperCase())) {
        matchedKw.push(kw);
      } else {
        missingKw.push(kw);
      }
    });

    const kwRatio = job.keywords.length > 0 ? matchedKw.length / job.keywords.length : 0.5;
    
    // Formula for Gupy ATS score: 55% keyword match + 25% impact metrics + 20% structure
    let baseScore = Math.round((kwRatio * 55) + (impactScore * 0.25) + (formattingScore * 0.20));
    
    // Normalize score to look realistic (e.g., 62% to 98%)
    baseScore = Math.max(35, Math.min(98, baseScore));

    let atsStatus: 'Altamente Compatível' | 'Compatibilidade Média' | 'Risco de Incompatibilidade' = 'Compatibilidade Média';
    if (baseScore >= 80) {
      atsStatus = 'Altamente Compatível';
    } else if (baseScore < 60) {
      atsStatus = 'Risco de Incompatibilidade';
    }

    // Generate custom recruiter pitch for LinkedIn / Gupy
    const candidateRole = resume.parsedRole || 'Profissional Corporativo';
    const candidateName = resume.parsedName || 'Candidato(a)';
    
    const pitch = `Prezado(a) Recrutador(a) da ${job.company},

Acompanho a trajetória de inovação da ${job.company} e gostaria de apresentar minha candidatura para a posição de ${job.title}.

Com atuação sólida em ${candidateRole}, destaco entregas com impacto quantificável:
• Domínio em ${matchedKw.slice(0, 3).join(', ') || job.requiredSkills.slice(0, 2).join(', ')}.
• Experiência comprovada em gestão de resultados, projetos e times multidisciplinares.

Estou totalmente alinhado aos requisitos da vaga e à cultura da ${job.company}. Gostaria de agendar uma breve conversa para detalhar como minhas experiências podem gerar valor direto para a equipe de ${job.department}.

Atenciosamente,
${candidateName}
Email: ${resume.parsedEmail || 'Disponível no CV'}
Telefone: ${resume.parsedPhone || 'Disponível no CV'}`;

    // Bullet optimization recommendations
    const bulletRecommendations: string[] = [];
    if (missingKeywordsForJob(missingKw).length > 0) {
      const top3Missing = missingKw.slice(0, 3).join(', ');
      bulletRecommendations.push(`Adicione termos exatos no resumo: "${top3Missing}" para pontuar nos robôs da ${job.system}.`);
    }
    bulletRecommendations.push(`Destaque métricas numéricas claras de ROI ou eficiência operacional vinculadas a ${job.requiredSkills[0] || 'sua última função'}.`);
    bulletRecommendations.push(`Garanta que o título no topo do documento inclua "${job.title.split('&')[0].trim()}" para elevar o Match Score no ATS.`);

    return {
      jobId: job.id,
      matchScore: baseScore,
      matchedKeywords: matchedKw,
      missingKeywords: missingKw,
      atsStatus,
      gupyScoreEstimate: baseScore,
      tailoredPitch: pitch,
      bulletRecommendations
    };
  });

  // Calculate overall average ATS readiness
  const avgJobScore = Math.round(
    jobMatches.reduce((acc, curr) => acc + curr.matchScore, 0) / (jobMatches.length || 1)
  );
  const overallAtsScore = Math.round((avgJobScore * 0.7) + (formattingScore * 0.15) + (impactScore * 0.15));

  // Strengths & Gaps
  const topStrengths: string[] = [];
  if (metricsCount >= 5) {
    topStrengths.push(`Excelente quantificação de resultados com ${metricsCount} métricas/números detectados.`);
  } else {
    topStrengths.push('Estrutura de experiências cronológicas organizada.');
  }

  if (formattingScore >= 75) {
    topStrengths.push('Títulos de seções tradicionais compatíveis com leitores de ATS (Gupy / Workday).');
  }

  topStrengths.push(`Compatibilidade acima de 75% em ${jobMatches.filter(j => j.matchScore >= 75).length} das ${jobs.length} vagas analisadas.`);

  const criticalGaps: string[] = [];
  const gupyWarnings: string[] = [];

  if (formattingScore < 100) {
    gupyWarnings.push('Faltam títulos padronizados de seções (ex: "Experiência Profissional", "Formação Acadêmica").');
  }
  if (metricsCount < 4) {
    criticalGaps.push('Poucas métricas quantificáveis (porcentagens, orçamentos, ROI) encontradas no histórico.');
    gupyWarnings.push('Gupy e LinkedIn Recruiter priorizam perfis com resultados mensuráveis (% ou R$).');
  }
  
  // Find most frequent missing keywords across all jobs
  const allMissingKw: Record<string, number> = {};
  jobMatches.forEach(jm => {
    jm.missingKeywords.forEach(kw => {
      allMissingKw[kw] = (allMissingKw[kw] || 0) + 1;
    });
  });
  const topMissing = Object.entries(allMissingKw)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([kw]) => kw);

  if (topMissing.length > 0) {
    criticalGaps.push(`Palavras-chave frequentes não encontradas: ${topMissing.join(', ')}.`);
  }

  let overallSummary = `Seu currículo apresenta uma base sólida para o mercado corporativo brasileiro. `;
  if (overallAtsScore >= 80) {
    overallSummary += `Você possui excelente aderência aos filtros automatizados dos sistemas ATS (Gupy / LinkedIn Recruiter), com alto potencial de aprovação na triagem inicial.`;
  } else if (overallAtsScore >= 60) {
    overallSummary += `A pontuação de triagem está na média. Com pequenos ajustes em palavras-chave estratégicas e destaque para resultados quantificados, sua taxa de conversão para entrevistas pode dobrar.`;
  } else {
    overallSummary += `Recomenda-se otimizar a estrutura e incluir termos técnicos exatos requeridos pelas vagas para evitar o descarte automatizado pelos algoritmos de ATS.`;
  }

  return {
    atsScore: overallAtsScore,
    formattingScore,
    impactScore,
    overallSummary,
    topStrengths,
    criticalGaps,
    gupyWarnings,
    jobMatches
  };
}

function missingKeywordsForJob(missing: string[]): string[] {
  return missing;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
