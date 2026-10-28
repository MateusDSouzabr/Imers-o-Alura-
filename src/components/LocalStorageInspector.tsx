import React, { useState, useEffect } from 'react';
import { 
  HardDrive, 
  Braces, 
  RefreshCw, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Copy,
  Terminal,
  Layers
} from 'lucide-react';

const STORAGE_KEY = 'minhas_transacoes_mvp';

export const LocalStorageInspector: React.FC = () => {
  const [rawData, setRawData] = useState<string>('');
  const [itemCount, setItemCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [activeConsoleTest, setActiveConsoleTest] = useState<string | null>(null);

  // Lê os dados brutos salvos no navegador
  const refreshStorageData = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || '[]';
      setRawData(stored);
      const parsed = JSON.parse(stored);
      setItemCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch (e) {
      setRawData('[]');
      setItemCount(0);
    }
  };

  useEffect(() => {
    refreshStorageData();
    // Atualiza a cada 2 segundos caso o usuário tenha adicionado algo no app
    const interval = setInterval(refreshStorageData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    refreshStorageData();
  };

  // Formatação bonita para exibir o JSON
  let formattedJson = rawData;
  try {
    formattedJson = JSON.stringify(JSON.parse(rawData), null, 2);
  } catch (e) {
    formattedJson = rawData;
  }

  return (
    <div className="space-y-6">
      {/* Topo Explicativo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 mt-0.5">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Inspetor Visual da Memória (LocalStorage)</h2>
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  Navegador Real
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                O <strong>LocalStorage</strong> é uma gaveta de texto que todo navegador moderno tem. Ele permite salvar dados sem precisar de banco de dados ou servidor no início dos seus estudos!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshStorageData}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Recarregar
            </button>
            <button
              onClick={handleClear}
              className="text-xs px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Gaveta
            </button>
          </div>
        </div>
      </div>

      {/* O Fluxo Didático: Como um Dado Nasce e Fica Salvo */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          A Jornada dos Dados: Do Clique ao LocalStorage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Passo 1 */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center text-[10px] mb-2">
                1
              </span>
              <h4 className="font-semibold text-slate-200">Formulário (HTML)</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                O usuário digita: Descrição "Salário", Valor 3500 e clica em Salvar.
              </p>
            </div>
            <div className="mt-3 font-mono text-[10px] bg-slate-950 p-1.5 rounded text-slate-400 border border-slate-800">
              input.value = "Salário"
            </div>
          </div>

          {/* Passo 2 */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-400 font-bold flex items-center justify-center text-[10px] mb-2">
                2
              </span>
              <h4 className="font-semibold text-slate-200">Objeto no JS</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                O JavaScript junta esses campos dentro de um objeto na memória RAM.
              </p>
            </div>
            <div className="mt-3 font-mono text-[10px] bg-slate-950 p-1.5 rounded text-amber-300 border border-slate-800 truncate">
              {`{ desc: "Salário", val: 3500 }`}
            </div>
          </div>

          {/* Passo 3 */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-400 font-bold flex items-center justify-center text-[10px] mb-2">
                3
              </span>
              <h4 className="font-semibold text-slate-200">JSON.stringify()</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Como a gaveta só aceita texto, o JS "empacota" o objeto em texto puro.
              </p>
            </div>
            <div className="mt-3 font-mono text-[10px] bg-slate-950 p-1.5 rounded text-purple-300 border border-slate-800">
              `JSON.stringify(transacoes)`
            </div>
          </div>

          {/* Passo 4 */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center text-[10px] mb-2">
                4
              </span>
              <h4 className="font-semibold text-slate-200">localStorage.setItem()</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Grava definitivamente no disco! Se fechar o navegador, o dado continua lá.
              </p>
            </div>
            <div className="mt-3 font-mono text-[10px] bg-slate-950 p-1.5 rounded text-emerald-300 border border-slate-800 truncate">
              setItem('minhas_transacoes', ...)
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Dados Reais Armazenados + Ferramentas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Visualizador do Texto Bruto (8 colunas) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Braces className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-medium text-slate-200">
                Chave: <span className="text-emerald-400 font-bold">"{STORAGE_KEY}"</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                {itemCount} registros salvos
              </span>
            </div>

            <button
              onClick={handleCopyRaw}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar JSON</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 font-mono text-xs text-purple-300 overflow-x-auto max-h-[420px] overflow-y-auto leading-relaxed">
            <pre className="whitespace-pre">
              {formattedJson || '[]'}
            </pre>
          </div>
        </div>

        {/* Laboratório Prático de Comandos JS (4 colunas) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              Simulador de Comandos JS
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Clique nos botões abaixo para ver o que cada comando do JavaScript retorna na prática:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setActiveConsoleTest('getItem')}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all ${
                  activeConsoleTest === 'getItem'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-blue-400 mb-0.5">1. localStorage.getItem(...)</div>
                <div className="text-[11px] text-slate-400">Pega o texto cru guardado</div>
              </button>

              <button
                onClick={() => setActiveConsoleTest('parse')}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all ${
                  activeConsoleTest === 'parse'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-amber-400 mb-0.5">2. JSON.parse(texto)</div>
                <div className="text-[11px] text-slate-400">Converte texto para Array de Objetos</div>
              </button>

              <button
                onClick={() => setActiveConsoleTest('devtools')}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all ${
                  activeConsoleTest === 'devtools'
                    ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-purple-400 mb-0.5">3. Onde ver no Chrome (F12)?</div>
                <div className="text-[11px] text-slate-400">Guia de inspeção nativo do navegador</div>
              </button>
            </div>

            {/* Painel de resultado do simulador */}
            {activeConsoleTest && (
              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                {activeConsoleTest === 'getItem' && (
                  <div>
                    <span className="text-[10px] text-blue-400 font-mono block mb-1">
                      // Retorno do método:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Retorna uma string única contendo todo o texto:
                    </p>
                    <div className="mt-1.5 p-2 bg-slate-900 rounded font-mono text-[10px] text-emerald-400 break-all max-h-20 overflow-y-auto">
                      "{rawData.slice(0, 100)}..."
                    </div>
                  </div>
                )}

                {activeConsoleTest === 'parse' && (
                  <div>
                    <span className="text-[10px] text-amber-400 font-mono block mb-1">
                      // Retorno do método:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Transforma a string em uma lista real (Array) com {itemCount} objetos. Agora você pode usar <code>.filter()</code>, <code>.map()</code> e <code>.forEach()</code>!
                    </p>
                  </div>
                )}

                {activeConsoleTest === 'devtools' && (
                  <div>
                    <span className="text-[10px] text-purple-400 font-mono block mb-1">
                      // Como conferir com a tecla F12:
                    </span>
                    <ol className="list-decimal list-inside text-slate-300 text-[11px] space-y-1">
                      <li>Abra qualquer página no Chrome.</li>
                      <li>Aperte a tecla <strong>F12</strong> no teclado.</li>
                      <li>Vá na aba <strong>Application</strong> (ou Aplicativo).</li>
                      <li>No menu lateral, abra <strong>Local Storage</strong>.</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
