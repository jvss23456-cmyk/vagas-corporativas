import { JobVacancy } from '../types';

export const MOCK_CORPORATE_JOBS: JobVacancy[] = [
  {
    id: 'vaga-01',
    title: 'Gerente de Projetos & Transformação Digital',
    company: 'Ambev Tech',
    location: 'São Paulo, SP (Híbrido)',
    workModel: 'Híbrido',
    system: 'Gupy',
    department: 'Tecnologia & Operações',
    level: 'Gerência',
    salaryRange: 'R$ 16.000 - R$ 21.000 / mês',
    description: 'Liderar iniciativas estratégicas de transformação digital para otimização de processos logísticos e comerciais. Gestão de equipes multidisciplinares e orçamentos de projetos com metodologia Ágil (Scrum/Kanban) e acompanhamento de OKRs.',
    requiredSkills: [
      'Gestão de Projetos (PMI/Scrum)',
      'Agile / Scrum Master',
      'Análise de KPIs e OKRs',
      'Gestão de Stakeholders',
      'Transformação Digital',
      'Jira / Confluence',
      'Melhoria Contínua (Lean/Six Sigma)'
    ],
    keywords: ['Scrum', 'Agile', 'PMI', 'OKRs', 'KPIs', 'Transformação Digital', 'Stakeholders', 'Jira', 'Six Sigma', 'Orçamento', 'Cronograma'],
    postedDate: 'Há 1 dia',
    applicantsCount: 142
  },
  {
    id: 'vaga-02',
    title: 'Analista de Dados & BI Senior',
    company: 'Nubank',
    location: 'São Paulo, SP (Remoto)',
    workModel: 'Remoto',
    system: 'LinkedIn',
    department: 'Data & Analytics',
    level: 'Sênior',
    salaryRange: 'R$ 12.500 - R$ 16.500 / mês',
    description: 'Responsável por estruturar pipelines de dados, dashboards analíticos para liderança e modelos de dados para suporte à decisão de negócios em produtos financeiros. Forte atuação em SQL avançado, Python e visualização em Power BI / Tableau.',
    requiredSkills: [
      'SQL Avançado (BigQuery/PostgreSQL)',
      'Python para Análise de Dados',
      'Power BI / Tableau / Metabase',
      'Modelagem de Dados',
      'A/B Testing & Análise Estatística',
      'Storytelling com Dados'
    ],
    keywords: ['SQL', 'Python', 'Power BI', 'Tableau', 'BigQuery', 'ETL', 'Dashboard', 'Data Studio', 'Analytics', 'OKRs', 'A/B Test'],
    postedDate: 'Há 3 horas',
    applicantsCount: 89
  },
  {
    id: 'vaga-03',
    title: 'Especialista em Marketing de Performance & Growth',
    company: 'iFood',
    location: 'Osasco, SP (Híbrido)',
    workModel: 'Híbrido',
    system: 'Gupy',
    department: 'Growth & Aquisição',
    level: 'Especialista',
    salaryRange: 'R$ 13.000 - R$ 17.000 / mês',
    description: 'Gestão direta de verbas de mídia paga (Google Ads, Meta Ads, TikTok Ads) com foco em ROI, CAC e LTV. Planejamento de campanhas corporativas em grande escala e testes de conversão com times de produto.',
    requiredSkills: [
      'Mídia Paga (Google Ads, Meta Ads)',
      'Otimização de CAC & LTV',
      'Google Analytics 4 (GA4)',
      'Growth Hacking & A/B Testing',
      'Gestão de Orçamento de Mídia',
      'Atribuição de Mídia'
    ],
    keywords: ['Meta Ads', 'Google Ads', 'GA4', 'CAC', 'LTV', 'ROI', 'ROAS', 'Growth', 'Performance', 'A/B Testing', 'Conversion Rate'],
    postedDate: 'Há 2 dias',
    applicantsCount: 210
  },
  {
    id: 'vaga-04',
    title: 'Especialista / Lead de Recursos Humanos (BP & D&I)',
    company: 'Natura &Co',
    location: 'São Paulo, SP (Híbrido)',
    workModel: 'Híbrido',
    system: 'Gupy',
    department: 'Gente & Cultura',
    level: 'Especialista',
    salaryRange: 'R$ 11.000 - R$ 15.000 / mês',
    description: 'Atuação corporativa como HR Business Partner estratégico para áreas executivas. Desenvolvimento de programas de retenção de talentos, Diversidade & Inclusão, People Analytics e suporte no plano de carreira corporativo.',
    requiredSkills: [
      'HR Business Partner (HRBP)',
      'People Analytics',
      'Diversidade, Equidade & Inclusão (DEI)',
      'Gestão de Desempenho e Metas',
      'Cultura Organizacional & Clima',
      'Pesquisa de Engajamento'
    ],
    keywords: ['HRBP', 'People Analytics', 'Diversidade', 'Inclusão', 'Engajamento', 'Avaliação de Desempenho', 'Nine Box', 'Succession Planning', 'Workday'],
    postedDate: 'Há 1 dia',
    applicantsCount: 165
  },
  {
    id: 'vaga-05',
    title: 'Gerente de FP&A e Planejamento Financeiro',
    company: 'Itaú Unibanco',
    location: 'São Paulo, SP (Presencial)',
    workModel: 'Presencial',
    system: 'Catho',
    department: 'Finanças Corporativas',
    level: 'Gerência',
    salaryRange: 'R$ 18.000 - R$ 24.000 / mês',
    description: 'Liderar o ciclo de orçamento anual (Budget/Forecast), DRE gerencial, fluxo de caixa e modelagem financeira para projeções corporativas. Reporte executivo para diretoria e conselho.',
    requiredSkills: [
      'Modelagem Financeira Avançada',
      'Budgeting & Forecasting',
      'DRE, Balanço & Fluxo de Caixa',
      'Análise de Variância Financeira',
      'Excel Avançado (VBA/Power Query)',
      'Apresentações Executivas'
    ],
    keywords: ['FP&A', 'Budget', 'Forecast', 'DRE', 'EBITDA', 'Fluxo de Caixa', 'Valuation', 'Excel', 'Corporate Finance', 'Reporte Executivo'],
    postedDate: 'Há 4 dias',
    applicantsCount: 98
  },
  {
    id: 'vaga-06',
    title: 'Product Manager Sr. - Plataformas B2B',
    company: 'Stone Co.',
    location: 'Rio de Janeiro, RJ (Remoto)',
    workModel: 'Remoto',
    system: 'LinkedIn',
    department: 'Produtos Digitais',
    level: 'Sênior',
    salaryRange: 'R$ 14.000 - R$ 19.000 / mês',
    description: 'Definição da visão do produto, priorização de backlog com frameworks RICE/ICE, descoberta contínua de usuários (Continuous Discovery) e alinhamento estratégico com times de engenharia e negócios.',
    requiredSkills: [
      'Product Management & Discovery',
      'Métricas de Produto (NPS, Churn, Engagement)',
      'Frameworks de Priorização (RICE/Kano)',
      'Scrum / Kanban / Agile',
      'Metodologia Product-Led Growth (PLG)',
      'Design Thinking & UX'
    ],
    keywords: ['Product Manager', 'Roadmap', 'Backlog', 'RICE', 'NPS', 'Churn', 'PLG', 'UX', 'Scrum', 'OKRs', 'B2B'],
    postedDate: 'Há 12 horas',
    applicantsCount: 175
  },
  {
    id: 'vaga-07',
    title: 'Tech Lead / Arquiteto de Software',
    company: 'Mercado Livre',
    location: 'São Paulo, SP (Híbrido)',
    workModel: 'Híbrido',
    system: 'LinkedIn',
    department: 'Engenharia de Software',
    level: 'Especialista',
    salaryRange: 'R$ 17.000 - R$ 23.000 / mês',
    description: 'Liderança técnica de tribo de pagamentos e logística. Definição de arquiteturas de microsserviços orientadas a eventos em alta escala, mentoring de desenvolvedores seniores e garantia de observabilidade e segurança.',
    requiredSkills: [
      'Arquitetura de Microsserviços',
      'Node.js / Java / Go',
      'Cloud (AWS / GCP / Azure)',
      'Mensageria (Kafka / RabbitMQ)',
      'Desenvolvimento de APIs REST e gRPC',
      'DevOps & CI/CD'
    ],
    keywords: ['Tech Lead', 'Arquitetura', 'Microsserviços', 'AWS', 'Docker', 'Kubernetes', 'Node.js', 'Java', 'Kafka', 'CI/CD', 'API'],
    postedDate: 'Há 2 dias',
    applicantsCount: 112
  },
  {
    id: 'vaga-08',
    title: 'Coordenador de Operações & Logística Corporativa',
    company: 'LuizaLabs (Magazine Luiza)',
    location: 'Francas / SP (Híbrido)',
    workModel: 'Híbrido',
    system: 'Gupy',
    department: 'Supply Chain & Logística',
    level: 'Pleno',
    salaryRange: 'R$ 10.000 - R$ 13.500 / mês',
    description: 'Coordenação de fluxos de last-mile e centros de distribuição. Gestão de SLAs de entrega, otimização de custos operacionais e implementação de automações industriais e sistemas WMS/TMS.',
    requiredSkills: [
      'Gestão de Cadeia de Suprimentos (Supply Chain)',
      'Sistemas WMS e TMS',
      'Controle de SLA e Last Mile',
      'Análise de Custos Operacionais',
      'Gestão de Equipes Operacionais',
      'Metodologia 5S / KAIZEN'
    ],
    keywords: ['Supply Chain', 'WMS', 'TMS', 'Logística', 'Last Mile', 'SLA', 'KAIZEN', 'Frete', 'Estoque', 'Inventário'],
    postedDate: 'Há 3 dias',
    applicantsCount: 130
  }
];
