import React, { useState } from 'react';
import { 
  FileCode, 
  Code2, 
  Palette, 
  Check, 
  Copy, 
  Info, 
  Lightbulb, 
  Sparkles, 
  Download,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { HTML_CODE_DATA, CSS_CODE_DATA, JS_CODE_DATA, README_CODE_DATA, FileCodeData } from '../data/mentorContent';

interface MentorCodeViewerProps {
  initialFile?: 'html' | 'css' | 'js' | 'readme';
}

export const MentorCodeViewer: React.FC<MentorCodeViewerProps> = ({ initialFile = 'js' }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'readme'>(initialFile);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const currentFileData: FileCodeData = 
    activeTab === 'html' ? HTML_CODE_DATA :
    activeTab === 'css' ? CSS_CODE_DATA : 
    activeTab === 'readme' ? README_CODE_DATA : JS_CODE_DATA;

  const rawLines = currentFileData.code.split('\n');

  // Copiar código para a área de transferência
  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFileData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Encontrar explicação cadastrada para a linha selecionada ou mais próxima
  const activeExplanation = currentFileData.lines.find(
    (l) => l.lineNum === selectedLine
  );

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Visualizador Didático */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Laboratório de Código: HTML, CSS & JS Vanilla</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Clique em qualquer linha com marcador <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mx-1"></span> para ler a explicação do mentor em linguagem 100% iniciante!
          </p>
        </div>

        {/* Abas dos arquivos */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto flex-wrap">
          <button
            onClick={() => { setActiveTab('html'); setSelectedLine(35); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'html'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-orange-300" />
            index.html
          </button>

          <button
            onClick={() => { setActiveTab('css'); setSelectedLine(39); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'css'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-cyan-300" />
            style.css
          </button>

          <button
            onClick={() => { setActiveTab('js'); setSelectedLine(68); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'js'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-300" />
            script.js
          </button>

          <button
            onClick={() => { setActiveTab('readme'); setSelectedLine(7); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'readme'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            README.md
          </button>
        </div>
      </div>

      {/* Grid: Código Fonte na esquerda e Card Explicativo na direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Painel do Código (8 colunas em lg) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Barra de controle do arquivo */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono font-medium text-slate-300 ml-2">
                {currentFileData.filename}
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                {rawLines.length} linhas
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar {currentFileData.filename}</span>
                </>
              )}
            </button>
          </div>

          {/* Breve resumo do arquivo */}
          <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{currentFileData.description}</span>
          </div>

          {/* Bloco de Código com linhas interativas */}
          <div className="p-4 font-mono text-xs overflow-x-auto max-h-[600px] overflow-y-auto select-text leading-relaxed">
            {rawLines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const hasAnnotation = currentFileData.lines.some((l) => l.lineNum === lineNum);
              const isSelected = selectedLine === lineNum;

              return (
                <div
                  key={lineNum}
                  onClick={() => hasAnnotation && setSelectedLine(lineNum)}
                  className={`group flex items-start py-0.5 px-2 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-blue-600/25 border-l-2 border-l-blue-400'
                      : hasAnnotation
                      ? 'hover:bg-slate-900/90 cursor-pointer'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  {/* Número da linha */}
                  <span className="w-8 shrink-0 text-slate-600 text-right pr-3 select-none flex items-center justify-end gap-1">
                    {hasAnnotation && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                    )}
                    {lineNum}
                  </span>

                  {/* Texto do código */}
                  <pre className="text-slate-200 flex-1 whitespace-pre font-mono">
                    {lineText || ' '}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel do Mentor com Explicação Linha a Linha (4 colunas em lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-200 font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Explicação do Mentor</span>
            </div>

            {activeExplanation ? (
              <div className="mt-4 space-y-3.5">
                {activeExplanation.concept && (
                  <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs font-semibold">
                    Conceito: {activeExplanation.concept}
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                    Linha {activeExplanation.lineNum} do código:
                  </span>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-300/90 break-words">
                    {activeExplanation.text}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-1">
                    💡 O que isso faz na prática?
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                    {activeExplanation.explanation}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Outras linhas importantes para você explorar:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentFileData.lines.map((l) => (
                      <button
                        key={l.lineNum}
                        onClick={() => setSelectedLine(l.lineNum)}
                        className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
                          selectedLine === l.lineNum
                            ? 'bg-blue-600 text-white border-blue-500 font-bold'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        Linha {l.lineNum} ({l.concept || 'Info'})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 space-y-3">
                <Lightbulb className="w-8 h-8 text-amber-400/80 mx-auto" />
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Clique em qualquer uma das linhas destacadas com a bolinha azul à esquerda para abrir a explicação detalhada!
                </p>
                <div className="flex flex-col gap-1.5 pt-2">
                  {currentFileData.lines.slice(0, 3).map((l) => (
                    <button
                      key={l.lineNum}
                      onClick={() => setSelectedLine(l.lineNum)}
                      className="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left flex items-center justify-between"
                    >
                      <span>Linha {l.lineNum}: {l.concept}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dica Rápida de Como Montar no Computador */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/30 rounded-2xl p-4 text-xs text-slate-300">
            <h4 className="font-bold text-white text-xs mb-1.5 flex items-center gap-1.5">
              🚀 Como testar no seu computador:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
              <li>Copie o <strong>index.html</strong> para sua pasta.</li>
              <li>Copie o <strong>style.css</strong> na mesma pasta.</li>
              <li>Copie o <strong>script.js</strong> na mesma pasta.</li>
              <li>Dê dois cliques no <strong>index.html</strong> e pronto!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};
