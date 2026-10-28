import React, { useState } from 'react';
import { 
  Wallet, 
  Code2, 
  HardDrive, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { FinanceApp } from './components/FinanceApp';
import { MentorCodeViewer } from './components/MentorCodeViewer';
import { LocalStorageInspector } from './components/LocalStorageInspector';
import { BeginnerGuide } from './components/BeginnerGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<'app' | 'code' | 'storage' | 'guide'>('app');
  const [initialCodeFile, setInitialCodeFile] = useState<'html' | 'css' | 'js'>('js');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleNavigateToCode = (file: string) => {
    if (file === 'html' || file === 'css' || file === 'js') {
      setInitialCodeFile(file);
    }
    setActiveTab('code');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header / Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-base tracking-tight text-white">
                    FinanDev
                  </h1>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    MVP Iniciante
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Gestor Financeiro Pessoal & Mentor de Programação
                </p>
              </div>
            </div>

            {/* Menu de Navegação Superior */}
            <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('app')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'app'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1.</span> App em Ação
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'code'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2.</span> Código & Linha a Linha
              </button>

              <button
                onClick={() => setActiveTab('storage')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'storage'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3.</span> LocalStorage
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'guide'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">4.</span> Guia & Glossário
              </button>
            </nav>

          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'app' && (
          <FinanceApp 
            onInspectStorage={() => setActiveTab('storage')}
            onViewCode={handleNavigateToCode}
          />
        )}

        {activeTab === 'code' && (
          <MentorCodeViewer initialFile={initialCodeFile} />
        )}

        {activeTab === 'storage' && (
          <LocalStorageInspector />
        )}

        {activeTab === 'guide' && (
          <BeginnerGuide onNavigateToTab={(tab) => {
            if (tab === 'code') setActiveTab('code');
            if (tab === 'app') setActiveTab('app');
          }} />
        )}
      </main>

      {/* Rodapé Didático */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tecnologias: <strong>HTML5</strong>, <strong>CSS3</strong>, <strong>JavaScript Vanilla</strong> & <strong>LocalStorage</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('code')}
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              Ver código puro
            </button>
            <button 
              onClick={() => setActiveTab('guide')}
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Tirar dúvidas do iniciante
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
