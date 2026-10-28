import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  HelpCircle, 
  FolderPlus, 
  FileCode, 
  Play, 
  Lightbulb, 
  Layers, 
  Code2, 
  BookOpen, 
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { GLOSSARY_TERMS, STEP_BY_STEP_PROJECT } from '../data/mentorContent';

interface BeginnerGuideProps {
  onNavigateToTab?: (tab: string) => void;
}

export const BeginnerGuide: React.FC<BeginnerGuideProps> = ({ onNavigateToTab }) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(GLOSSARY_TERMS[0].term);
  const [activeStep, setActiveStep] = useState<number>(1);

  const activeTermData = GLOSSARY_TERMS.find((t) => t.term === selectedTerm);

  return (
    <div className="space-y-8">
      {/* Banner Principal do Mentor */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-indigo-950/40 border border-blue-800/40 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-600/30 text-blue-400 rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                Trilha do Iniciante
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Como construir este projeto no seu computador do zero
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Aqui está o roteiro prático e sem complicações. Você não precisa instalar Node.js, banco de dados ou ferramentas difíceis para começar: apenas um editor de texto (como o VS Code) e o seu navegador!
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl shrink-0 text-center md:text-right">
            <span className="text-xs text-slate-400 block mb-1">Duração estimada</span>
            <span className="text-lg font-bold text-amber-400">15 a 30 minutos</span>
            <span className="text-[11px] text-slate-500 block mt-1">Pronto para rodar offline</span>
          </div>
        </div>
      </div>

      {/* Passo a Passo Interativo (Os 5 Passos Práticos) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Os 5 Passos Práticos para o seu Computador
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Siga cada um dos passos para ver a mágica acontecer na sua máquina
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            Passo {activeStep} de 5
          </span>
        </div>

        {/* Marcadores de passos horizontais */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {STEP_BY_STEP_PROJECT.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeStep === s.step
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] uppercase font-bold opacity-80 mb-0.5">Passo {s.step}</div>
              <div className="text-xs font-semibold truncate">{s.title.split(' ')[1] || s.title}</div>
            </button>
          ))}
        </div>

        {/* Conteúdo do passo selecionado */}
        {(() => {
          const stepData = STEP_BY_STEP_PROJECT.find((s) => s.step === activeStep)!;
          return (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold flex items-center justify-center text-sm">
                  {stepData.step}
                </span>
                <h4 className="text-base font-bold text-white">{stepData.title}</h4>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {stepData.instruction}
              </p>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <strong>Dica do Mentor:</strong> {stepData.tip}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Passo Anterior
                </button>

                {activeStep < 5 ? (
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
                    className="text-xs px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow"
                  >
                    Próximo Passo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateToTab && onNavigateToTab('code')}
                    className="text-xs px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow"
                  >
                    Ver Códigos para Copiar
                    <FileCode className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Dicionário de Termos do Iniciante (Glossário) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="mb-6 pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Dicionário Descomplicado do Iniciante
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Termos técnicos explicados com analogias da vida real para você nunca mais esquecer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Lista de Termos (4 colunas) */}
          <div className="lg:col-span-4 space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
            {GLOSSARY_TERMS.map((term) => (
              <button
                key={term.term}
                onClick={() => setSelectedTerm(term.term)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  selectedTerm === term.term
                    ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-0.5">
                    {term.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 block truncate">
                    {term.term.split(' ')[0]}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            ))}
          </div>

          {/* Card Detalhado do Termo Selecionado (8 colunas) */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner">
            {activeTermData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {activeTermData.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1.5">{activeTermData.term}</h4>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
                    Significado em Uma Frase:
                  </span>
                  <p className="text-sm font-semibold text-amber-300">
                    "{activeTermData.simpleMeaning}"
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">
                    Explicação Completa:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
                    {activeTermData.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Regras de Ouro e Próximos Desafios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regras de Ouro */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            3 Regras de Ouro do Programador Iniciante
          </h4>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-400 font-bold font-mono">1.</span>
              <span>
                <strong>Use muito o <code>console.log()</code>:</strong> Quando algo não funcionar, imprima a variável no console com F12 para ver o que está dentro dela.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-400 font-bold font-mono">2.</span>
              <span>
                <strong>O código lê de cima para baixo:</strong> As variáveis precisam ser criadas antes de serem usadas.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-400 font-bold font-mono">3.</span>
              <span>
                <strong>Erros em vermelho no console são normais:</strong> Eles são mensagens de ajuda do navegador dizendo exatamente em qual linha está o problema.
              </span>
            </li>
          </ul>
        </div>

        {/* Desafios para a Etapa 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Desafios para a sua Etapa 2 (Evolução)
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Quando você dominar o MVP de hoje, tente implementar sozinho:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Adicionar campo de <strong>Categoria</strong> (Alimentação, Moradia, Salário)</span>
            </li>
            <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Adicionar campo de <strong>Data da Transação</strong> personalizada</span>
            </li>
            <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>Botão para <strong>Exportar em CSV (Excel)</strong> os dados salvos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
