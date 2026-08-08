import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle, FileText, Search, Sparkles, Database, Layers } from 'lucide-react';

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Lendo e padronizando estrutura do documento (PDF/Doc)',
      detail: 'Extraindo cabeçalhos de seções, contato e experiência profissional...'
    },
    {
      title: 'Cruzando com filtros de triagem ATS (Gupy / LinkedIn)',
      detail: 'Avaliando presença de palavras-chave técnicas e verificação de formato...'
    },
    {
      title: 'Calculando Match Score em 8 vagas corporativas de mercado',
      detail: 'Pontuando aderência por cargo, departamento e nível sênior/gerencial...'
    },
    {
      title: 'Sintetizando insights escritos e cartas de apresentação customizadas',
      detail: 'Gerando recomendações estratégicas para maximizar convites de entrevistas...'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 750);
    const timer2 = setTimeout(() => setCurrentStep(2), 1500);
    const timer3 = setTimeout(() => setCurrentStep(3), 2250);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 my-8 shadow-sm max-w-2xl mx-auto text-center space-y-8">
      {/* Icon Graphic */}
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin" />
        <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-inner">
          <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          Otimizando Currículo e Mapeando Vagas Corporativas
        </h3>
        <p className="text-sm text-slate-500">
          Aguarde um momento enquanto os algoritmos de triagem processam o documento...
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-3 text-left max-w-md mx-auto pt-2">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border transition-all duration-300 flex items-start gap-3 ${
                isCurrent
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : isDone
                  ? 'bg-slate-50 text-slate-800 border-slate-200'
                  : 'bg-white text-slate-400 border-slate-100 opacity-50'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300" />
                )}
              </div>

              <div>
                <p className={`text-xs font-semibold ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </p>
                <p className={`text-[11px] mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-slate-900 h-full transition-all duration-750 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
