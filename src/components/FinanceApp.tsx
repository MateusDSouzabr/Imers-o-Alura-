import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Sparkles, 
  RefreshCw, 
  HelpCircle,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  Info
} from 'lucide-react';
import { Transaction, TransactionType } from '../types/finance';

const STORAGE_KEY = 'minhas_transacoes_mvp';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 3500.00,
    type: 'receita',
    date: new Date().toISOString()
  },
  {
    id: '2',
    description: 'Aluguel do Apartamento',
    amount: 1200.00,
    type: 'despesa',
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    description: 'Supermercado Mensal',
    amount: 450.50,
    type: 'despesa',
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    description: 'Trabalho Freelance (Site)',
    amount: 800.00,
    type: 'receita',
    date: new Date(Date.now() - 259200000).toISOString()
  }
];

interface FinanceAppProps {
  onInspectStorage?: () => void;
  onViewCode?: (fileKey: string) => void;
}

export const FinanceApp: React.FC<FinanceAppProps> = ({ onInspectStorage, onViewCode }) => {
  // Estado das transações (carregadas do LocalStorage)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao ler do LocalStorage:', e);
    }
    return SAMPLE_TRANSACTIONS;
  });

  // Campos do formulário
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('receita');

  // Filtros e busca
  const [filterType, setFilterType] = useState<'todos' | 'receita' | 'despesa'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Notificação didática de feedback
  const [mentorToast, setMentorToast] = useState<{ message: string; subtext: string } | null>(null);

  // Efeito para salvar no LocalStorage sempre que a lista de transações mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Erro ao salvar no LocalStorage:', e);
    }
  }, [transactions]);

  // Cálculos automáticos dos totais
  const totalReceitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  // Função para formatar moeda em Reais (BRL)
  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Enviar formulário
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanDescription = description.trim();
    const parsedAmount = parseFloat(amount.replace(',', '.'));

    if (!cleanDescription) {
      showToast('⚠️ Ops!', 'Por favor, digite a descrição da transação.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('⚠️ Valor inválido', 'Digite um valor numérico maior que zero.');
      return;
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      description: cleanDescription,
      amount: parsedAmount,
      type: type,
      date: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);
    setDescription('');
    setAmount('');

    showToast(
      '✨ Transação Adicionada!',
      `O JavaScript executou "transactions.unshift()" e gravou em "localStorage.setItem('${STORAGE_KEY}', ...)"`
    );
  };

  // Excluir transação
  const handleDelete = (id: string, desc: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast(
      '🗑️ Transação Removida',
      `O JavaScript usou "array.filter()" para retirar "${desc}" e atualizou o saldo automaticamente!`
    );
  };

  // Carregar dados de exemplo
  const handleLoadSamples = () => {
    setTransactions(SAMPLE_TRANSACTIONS);
    showToast('📦 Exemplos Carregados', 'Restauramos 4 transações de teste para você explorar a matemática.');
  };

  // Limpar tudo
  const handleClearAll = () => {
    if (transactions.length === 0) return;
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
    showToast('🧹 Tudo Limpo!', 'A lista foi esvaziada e o LocalStorage foi resetado.');
  };

  // Disparar aviso do mentor
  const showToast = (message: string, subtext: string) => {
    setMentorToast({ message, subtext });
    setTimeout(() => {
      setMentorToast(null);
    }, 4500);
  };

  // Filtragem da lista
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'todos' || t.type === filterType;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Didático do Mentor */}
      {mentorToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-blue-500/30 flex items-start gap-3 animate-bounce-in">
          <div className="p-2 bg-blue-600/30 rounded-lg text-blue-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-blue-200">{mentorToast.message}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{mentorToast.subtext}</p>
          </div>
        </div>
      )}

      {/* Banner de Boas-Vindas Didático */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/30 border border-blue-800/40 rounded-2xl p-5 text-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl shrink-0 mt-0.5">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Aplicativo de Gestão Financeira (MVP)</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                100% Funcional
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Teste adicionar receitas e despesas abaixo. O saldo é recalculado na hora e cada registro fica salvo no 
              <strong className="text-blue-300 font-medium"> LocalStorage</strong> do seu navegador!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleLoadSamples}
            className="text-xs px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Carregar transações de exemplo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Exemplos
          </button>
          {onInspectStorage && (
            <button
              onClick={onInspectStorage}
              className="text-xs px-3 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Info className="w-3.5 h-3.5" />
              Ver no LocalStorage
            </button>
          )}
        </div>
      </div>

      {/* 1. Cards de Resumo dos Saldos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card Saldo Atual */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          saldoAtual > 0 
            ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50' 
            : saldoAtual < 0 
              ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50' 
              : 'bg-slate-900/40 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Saldo Atual
            </span>
            <div className={`p-2 rounded-xl ${
              saldoAtual >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
              saldoAtual > 0 ? 'text-emerald-400' : saldoAtual < 0 ? 'text-rose-400' : 'text-slate-200'
            }`}>
              {formatMoney(saldoAtual)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            {saldoAtual > 0 && <span className="text-emerald-400 font-medium">✓ No azul (Positivo)</span>}
            {saldoAtual < 0 && <span className="text-rose-400 font-medium">⚠ No vermelho (Negativo)</span>}
            {saldoAtual === 0 && <span className="text-slate-400">Contas zeradas</span>}
            <span className="text-slate-500 ml-auto">Receitas - Despesas</span>
          </p>
        </div>

        {/* Card Receitas */}
        <div className="p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Receitas (Entradas)
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 tracking-tight">
              + {formatMoney(totalReceitas)}
            </span>
          </div>
          <p className="text-[11px] text-emerald-400/80 mt-2 flex items-center justify-between">
            <span>Total recebido</span>
            <span className="font-mono text-[10px] bg-emerald-900/30 px-1.5 py-0.5 rounded text-emerald-300">
              {transactions.filter(t => t.type === 'receita').length} entrada(s)
            </span>
          </p>
        </div>

        {/* Card Despesas */}
        <div className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Despesas (Saídas)
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-extrabold text-rose-400 tracking-tight">
              - {formatMoney(totalDespesas)}
            </span>
          </div>
          <p className="text-[11px] text-rose-400/80 mt-2 flex items-center justify-between">
            <span>Total gasto</span>
            <span className="font-mono text-[10px] bg-rose-900/30 px-1.5 py-0.5 rounded text-rose-300">
              {transactions.filter(t => t.type === 'despesa').length} saída(s)
            </span>
          </p>
        </div>
      </div>

      {/* Grid: Formulário de Adicionar + Histórico de Transações */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Formulário (4 colunas em telas grandes) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-400" />
                Nova Transação
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Preencha os campos para testar a gravação
              </p>
            </div>
            {onViewCode && (
              <button
                type="button"
                onClick={() => onViewCode('html')}
                className="text-[11px] text-blue-400 hover:text-blue-300 underline font-medium flex items-center gap-1"
                title="Ver o código HTML deste formulário"
              >
                Ver HTML
              </button>
            )}
          </div>

          <form onSubmit={handleAddTransaction} className="space-y-4">
            {/* Campo 1: Descrição */}
            <div>
              <label htmlFor="form-desc" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Descrição da Transação:
              </label>
              <input
                id="form-desc"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Salário, Conta de Luz, Café..."
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                O que foi esse dinheiro?
              </span>
            </div>

            {/* Campo 2: Valor */}
            <div>
              <label htmlFor="form-val" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Valor (R$):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                  R$
                </span>
                <input
                  id="form-val"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Digite o número (ex: 50.00 ou 1500)
              </span>
            </div>

            {/* Campo 3: Tipo (Receita / Despesa) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tipo da Transação:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('receita')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    type === 'receita'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-900/30'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-emerald-300" />
                  Receita (Entrada)
                </button>

                <button
                  type="button"
                  onClick={() => setType('despesa')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    type === 'despesa'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm shadow-rose-900/30'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 text-rose-300" />
                  Despesa (Saída)
                </button>
              </div>
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <PlusCircle className="w-4 h-4" />
              Adicionar Transação
            </button>
          </form>

          {/* Dica do Mentor abaixo do formulário */}
          <div className="mt-5 p-3 rounded-xl bg-blue-950/20 border border-blue-800/30 text-xs text-slate-300 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong className="text-blue-300">Como funciona nos bastidores:</strong> O formulário usa 
              <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300 ml-1">e.preventDefault()</code> para 
              não recarregar a tela, cria um objeto JavaScript com os 3 campos e salva no LocalStorage.
            </p>
          </div>
        </div>

        {/* Lista de Transações (7 colunas em telas grandes) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
          
          {/* Topo da lista com filtros e busca */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Histórico de Transações
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {transactions.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exibição dinâmica dos dados gravados
              </p>
            </div>

            <div className="flex items-center gap-2">
              {transactions.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1"
                  title="Apagar todas as transações cadastradas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar Tudo
                </button>
              )}
            </div>
          </div>

          {/* Barra de Filtro e Busca */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por nome..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
              />
            </div>
            
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setFilterType('todos')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterType === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterType('receita')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterType === 'receita' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setFilterType('despesa')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterType === 'despesa' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-300'
                }`}
              >
                Despesas
              </button>
            </div>
          </div>

          {/* Itens da lista */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/60 flex items-center justify-center text-slate-500 mb-3">
                  <Filter className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300">Nenhuma transação encontrada</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {transactions.length === 0
                    ? 'Use o formulário ao lado ou clique em "Exemplos" para cadastrar suas primeiras entradas e saídas.'
                    : 'Nenhum resultado corresponde à sua busca ou filtro atual.'}
                </p>
                {transactions.length === 0 && (
                  <button
                    onClick={handleLoadSamples}
                    className="mt-4 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium inline-flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Carregar Exemplos Prontos
                  </button>
                )}
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    tx.type === 'receita'
                      ? 'bg-slate-950/60 border-emerald-950 hover:border-emerald-500/40 border-l-4 border-l-emerald-500'
                      : 'bg-slate-950/60 border-rose-950 hover:border-rose-500/40 border-l-4 border-l-rose-500'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-200 truncate">
                        {tx.description}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        tx.type === 'receita'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {tx.type === 'receita' ? 'Receita' : 'Despesa'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(tx.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="font-mono text-[10px] text-slate-600">
                        ID: {tx.id.slice(-5)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-sm md:text-base font-bold font-mono ${
                      tx.type === 'receita' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {tx.type === 'receita' ? '+' : '-'} {formatMoney(tx.amount)}
                    </span>

                    <button
                      onClick={() => handleDelete(tx.id, tx.description)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Excluir transação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé explicativo do histórico */}
          {transactions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <span>
                Mostrando <strong className="text-slate-300">{filteredTransactions.length}</strong> de <strong className="text-slate-300">{transactions.length}</strong> transações
              </span>
              <span className="text-slate-400">
                Memória do Navegador: <span className="font-mono text-emerald-400">{STORAGE_KEY}</span>
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
