export interface FileCodeData {
  filename: string;
  language: string;
  description: string;
  code: string;
  lines: {
    lineNum: number;
    text: string;
    explanation: string;
    concept?: string;
  }[];
}

export const HTML_CODE_DATA: FileCodeData = {
  filename: 'index.html',
  language: 'html',
  description: 'O "esqueleto" do nosso aplicativo. Aqui criamos os elementos visuais que o usuário vai enxergar na tela.',
  code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Gestor Financeiro</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="container">
    <header>
      <h1>💰 Gestor Financeiro Pessoal</h1>
      <p>Controle fácil das suas entradas e saídas</p>
    </header>

    <!-- Seção dos Saldos -->
    <section class="cards-resumo">
      <div class="card card-saldo">
        <h3>Saldo Atual</h3>
        <p id="saldo-valor" class="valor">R$ 0,00</p>
      </div>

      <div class="card card-receita">
        <h3>Receitas (Entradas)</h3>
        <p id="receitas-valor" class="valor positivo">+ R$ 0,00</p>
      </div>

      <div class="card card-despesa">
        <h3>Despesas (Saídas)</h3>
        <p id="despesas-valor" class="valor negativo">- R$ 0,00</p>
      </div>
    </section>

    <!-- Formulário para Adicionar Transação -->
    <section class="form-secao">
      <h2>Nova Transação</h2>
      <form id="form-transacao">
        
        <div class="campo">
          <label for="descricao">Descrição:</label>
          <input 
            type="text" 
            id="descricao" 
            placeholder="Ex: Salário, Aluguel, Supermercado" 
            required
          >
        </div>

        <div class="campo">
          <label for="valor">Valor (R$):</label>
          <input 
            type="number" 
            id="valor" 
            step="0.01" 
            min="0.01" 
            placeholder="0,00" 
            required
          >
        </div>

        <div class="campo">
          <label for="tipo">Tipo da Transação:</label>
          <select id="tipo" required>
            <option value="receita">🟢 Receita (Entrada de Dinheiro)</option>
            <option value="despesa">🔴 Despesa (Saída de Dinheiro)</option>
          </select>
        </div>

        <button type="submit" id="btn-adicionar">Adicionar Transação</button>
      </form>
    </section>

    <!-- Lista de Transações Registradas -->
    <section class="lista-secao">
      <h2>Histórico de Transações</h2>
      <ul id="lista-transacoes">
        <!-- O JavaScript vai inserir os itens aqui dinamicamente -->
      </ul>
      <p id="mensagem-vazia" class="mensagem-vazia">Nenhuma transação cadastrada ainda.</p>
    </section>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
  lines: [
    {
      lineNum: 1,
      text: '<!DOCTYPE html>',
      explanation: 'Diz ao navegador que este arquivo está usando a versão mais moderna do HTML (HTML5).',
      concept: 'DOCTYPE'
    },
    {
      lineNum: 2,
      text: '<html lang="pt-BR">',
      explanation: 'É a tag raiz que envolve todo o documento. O "lang=pt-BR" avisa que o conteúdo é em Português do Brasil.',
      concept: 'Tag Raiz'
    },
    {
      lineNum: 3,
      text: '<head>',
      explanation: 'Cabeçalho invisível para o usuário comum. Guarda configurações técnicas, títulos e ligações com outros arquivos.',
      concept: 'Head'
    },
    {
      lineNum: 4,
      text: '  <meta charset="UTF-8">',
      explanation: 'Configuração que permite usar acentos e caracteres especiais (como ç, ã, é, ó) sem que o texto fique quebrado.',
      concept: 'Codificação UTF-8'
    },
    {
      lineNum: 5,
      text: '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      explanation: 'Garante que a página se adapte bem à tela de celulares e tablets (design responsivo).',
      concept: 'Responsividade'
    },
    {
      lineNum: 6,
      text: '  <title>Meu Gestor Financeiro</title>',
      explanation: 'O texto que aparece lá em cima, na aba do navegador do usuário.',
      concept: 'Título da Aba'
    },
    {
      lineNum: 7,
      text: '  <link rel="stylesheet" href="style.css">',
      explanation: 'Faz a ponte com o arquivo "style.css". É aqui que "vestimos" nosso HTML com cores e estilos visuais.',
      concept: 'Importação de CSS'
    },
    {
      lineNum: 8,
      text: '</head>',
      explanation: 'Fechamento da área de configurações da página.',
    },
    {
      lineNum: 9,
      text: '<body>',
      explanation: 'Início do "corpo" da página. Tudo o que colocamos aqui dentro aparece visivelmente na janela do navegador.',
      concept: 'Body'
    },
    {
      lineNum: 11,
      text: '  <div class="container">',
      explanation: 'Uma caixa organizadora (divisão) para centralizar todo o conteúdo no meio da tela.',
      concept: 'Div Container'
    },
    {
      lineNum: 18,
      text: '    <section class="cards-resumo">',
      explanation: 'Uma área temática (section) feita para mostrar o resumo financeiro: Saldo, Receitas e Despesas.',
      concept: 'Semântica HTML'
    },
    {
      lineNum: 21,
      text: '        <p id="saldo-valor" class="valor">R$ 0,00</p>',
      explanation: 'O parágrafo onde o saldo vai aparecer. O "id=\'saldo-valor\'" é como um CPF ou RG: permite ao JavaScript achar esse número exato e alterá-lo.',
      concept: 'Atributo ID'
    },
    {
      lineNum: 35,
      text: '      <form id="form-transacao">',
      explanation: 'O formulário! Agrupa os campos para o usuário preencher dados e enviar de uma só vez.',
      concept: 'Formulário'
    },
    {
      lineNum: 39,
      text: '          <input type="text" id="descricao" required>',
      explanation: 'Caixa de texto para a descrição. O "required" não deixa o usuário enviar se o campo estiver vazio.',
      concept: 'Validação Required'
    },
    {
      lineNum: 48,
      text: '          <input type="number" id="valor" step="0.01" min="0.01" required>',
      explanation: 'Caixa para números. O "step=\'0.01\'" permite centavos (moeda) e "min=\'0.01\'" impede valores zerados ou negativos no campo.',
      concept: 'Input Numérico'
    },
    {
      lineNum: 58,
      text: '          <select id="tipo" required>',
      explanation: 'Uma caixinha de seleção (menu suspenso) para o usuário escolher entre Receita e Despesa.',
      concept: 'Select Dropdown'
    },
    {
      lineNum: 65,
      text: '        <button type="submit" id="btn-adicionar">Adicionar Transação</button>',
      explanation: 'Botão com "type=\'submit\'". Quando clicado, dispara o evento de envio do formulário.',
      concept: 'Botão Submit'
    },
    {
      lineNum: 71,
      text: '      <ul id="lista-transacoes">',
      explanation: 'Uma lista desordenada (ul = unordered list). Começa vazia no HTML porque o JavaScript criará os <li> itens com cada transação.',
      concept: 'Lista Dinâmica'
    },
    {
      lineNum: 78,
      text: '  <script src="script.js"></script>',
      explanation: 'Importa nosso arquivo JavaScript. Fica bem no fim do body para garantir que todo o HTML já carregou antes de rodar o código.',
      concept: 'Importação de Script'
    }
  ]
};

export const CSS_CODE_DATA: FileCodeData = {
  filename: 'style.css',
  language: 'css',
  description: 'A "roupa" e a "maquiagem" do aplicativo. Transforma o HTML básico em uma interface bonita, legível e moderna.',
  code: `/* 1. Reset básico para tirar margens indesejadas */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f0f2f5;
  color: #333333;
  padding: 20px;
  display: flex;
  justify-content: center;
}

/* 2. Container principal centralizado */
.container {
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

header {
  text-align: center;
  margin-bottom: 24px;
}

header h1 {
  font-size: 1.6rem;
  color: #1a202c;
  margin-bottom: 6px;
}

header p {
  color: #718096;
  font-size: 0.95rem;
}

/* 3. Cards de Resumo (Saldo, Receita e Despesa) */
.cards-resumo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

@media (min-width: 480px) {
  .cards-resumo {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  padding: 16px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.card h3 {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.card .valor {
  font-size: 1.25rem;
  font-weight: bold;
}

.valor.positivo {
  color: #16a34a; /* Verde */
}

.valor.negativo {
  color: #dc2626; /* Vermelho */
}

/* 4. Estilos do Formulário */
.form-secao {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.form-secao h2 {
  font-size: 1.2rem;
  margin-bottom: 14px;
  color: #1e293b;
}

.campo {
  margin-bottom: 14px;
}

.campo label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #475569;
}

.campo input,
.campo select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.campo input:focus,
.campo select:focus {
  border-color: #2563eb;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #1d4ed8;
}

/* 5. Lista de Transações */
.lista-secao h2 {
  font-size: 1.2rem;
  margin-bottom: 14px;
  color: #1e293b;
}

#lista-transacoes {
  list-style: none;
}

.item-transacao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: #f8fafc;
  border-left: 5px solid #cbd5e1;
}

/* Borda verde para receitas */
.item-transacao.receita {
  border-left-color: #16a34a;
}

/* Borda vermelha para despesas */
.item-transacao.despesa {
  border-left-color: #dc2626;
}

.info-transacao {
  display: flex;
  flex-direction: column;
}

.descricao-item {
  font-weight: 600;
  color: #1e293b;
}

.tipo-item {
  font-size: 0.8rem;
  color: #64748b;
}

.acoes-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-excluir {
  background-color: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
}

.btn-excluir:hover {
  background-color: #fca5a5;
}

.mensagem-vazia {
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  padding: 16px 0;
}`,
  lines: [
    {
      lineNum: 2,
      text: '* { margin: 0; padding: 0; box-sizing: border-box; }',
      explanation: 'O "Reset universal". Retira espaçamentos padrão do navegador e garante que a largura dos elementos inclua bordas e preenchimentos.',
      concept: 'Box Sizing'
    },
    {
      lineNum: 9,
      text: 'body { background-color: #f0f2f5; display: flex; ... }',
      explanation: 'Dá cor de fundo acinzentada suave ao site e usa o "flex" para centralizar o aplicativo na tela.',
      concept: 'Flexbox'
    },
    {
      lineNum: 18,
      text: '.container { max-width: 600px; border-radius: 12px; ... }',
      explanation: 'Cria uma folha branca como um cartão elegante com cantos arredondados (border-radius) e sombra suave (box-shadow).',
      concept: 'Cards e Sombras'
    },
    {
      lineNum: 39,
      text: '.cards-resumo { display: grid; gap: 12px; }',
      explanation: 'Usa CSS Grid para organizar os 3 blocos (Saldo, Receita e Despesa) lado a lado de forma automática.',
      concept: 'CSS Grid'
    },
    {
      lineNum: 62,
      text: '.valor.positivo { color: #16a34a; }',
      explanation: 'Deixa os números de receita e saldo positivo em verde agradável.',
      concept: 'Cores Semânticas'
    },
    {
      lineNum: 66,
      text: '.valor.negativo { color: #dc2626; }',
      explanation: 'Deixa as despesas e saldo negativo em vermelho, alertando visualmente.',
      concept: 'Cores de Alerta'
    },
    {
      lineNum: 147,
      text: '.item-transacao.receita { border-left-color: #16a34a; }',
      explanation: 'Um detalhe visual elegante: uma faixinha vertical verde na borda esquerda de cada item que for receita.',
      concept: 'Destaque de Borda'
    }
  ]
};

export const JS_CODE_DATA: FileCodeData = {
  filename: 'script.js',
  language: 'javascript',
  description: 'O "cérebro" do nosso aplicativo! Ele ouve o clique do usuário, calcula a matemática e grava tudo na memória do navegador (LocalStorage).',
  code: `// ========================================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML (Buscar as referências)
// ========================================================
const form = document.getElementById('form-transacao');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const selectTipo = document.getElementById('tipo');

const saldoElemento = document.getElementById('saldo-valor');
const receitasElemento = document.getElementById('receitas-valor');
const despesasElemento = document.getElementById('despesas-valor');

const listaTransacoes = document.getElementById('lista-transacoes');
const mensagemVazia = document.getElementById('mensagem-vazia');

// Nome da chave que usaremos para guardar no LocalStorage
const CHAVE_STORAGE = 'minhas_transacoes';

// ========================================================
// 2. ESTADO DA APLICAÇÃO (A lista de transações na memória)
// ========================================================
// Buscamos o que já está salvo no LocalStorage. Se não houver nada, usamos lista vazia []
let transacoes = carregarTransacoesDoLocalStorage();

// ========================================================
// 3. FUNÇÕES PRINCIPAIS
// ========================================================

// Carrega as transações do LocalStorage com segurança
function carregarTransacoesDoLocalStorage() {
  const dadosTexto = localStorage.getItem(CHAVE_STORAGE);
  
  if (dadosTexto) {
    // Transforma o texto guardado de volta em um Array de Objetos JavaScript
    return JSON.parse(dadosTexto);
  }
  
  // Se for a primeira vez abrindo o app, começa com uma lista vazia
  return [];
}

// Salva o Array atual de transações no LocalStorage
function salvarTransacoesNoLocalStorage() {
  // O LocalStorage só aceita texto puro (String).
  // JSON.stringify transforma nossa lista de objetos em um texto seguro.
  const dadosTexto = JSON.stringify(transacoes);
  localStorage.setItem(CHAVE_STORAGE, dadosTexto);
}

// Formata números para o padrão de moeda do Brasil (R$ 1.234,56)
function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Calcula Saldo, Total de Receitas e Total de Despesas
function atualizarTotais() {
  let totalReceitas = 0;
  let totalDespesas = 0;

  // Percorre cada transação da nossa lista
  transacoes.forEach(function(item) {
    if (item.tipo === 'receita') {
      totalReceitas += item.valor;
    } else {
      totalDespesas += item.valor;
    }
  });

  // Saldo é o que entrou menos o que saiu
  const saldoAtual = totalReceitas - totalDespesas;

  // Atualiza os textos na tela
  receitasElemento.textContent = '+ ' + formatarMoeda(totalReceitas);
  despesasElemento.textContent = '- ' + formatarMoeda(totalDespesas);
  saldoElemento.textContent = formatarMoeda(saldoAtual);

  // Muda a cor do saldo: verde se positivo ou zero, vermelho se negativo
  saldoElemento.className = 'valor';
  if (saldoAtual >= 0) {
    saldoElemento.classList.add('positivo');
  } else {
    saldoElemento.classList.add('negativo');
  }
}

// Renderiza (desenha) a lista de transações na tela
function renderizarLista() {
  // Limpa o conteúdo anterior da lista
  listaTransacoes.innerHTML = '';

  // Se a lista estiver vazia, exibe mensagem amigável
  if (transacoes.length === 0) {
    mensagemVazia.style.display = 'block';
    return;
  }

  mensagemVazia.style.display = 'none';

  // Cria um elemento <li> para cada transação cadastrada
  transacoes.forEach(function(transacao) {
    const li = document.createElement('li');
    li.classList.add('item-transacao', transacao.tipo);

    // Define o símbolo visual (+ ou -)
    const sinal = transacao.tipo === 'receita' ? '+' : '-';
    const classeCor = transacao.tipo === 'receita' ? 'positivo' : 'negativo';

    li.innerHTML = \`
      <div class="info-transacao">
        <span class="descricao-item">\${transacao.descricao}</span>
        <span class="tipo-item">\${transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}</span>
      </div>
      <div class="acoes-item">
        <span class="valor \${classeCor}">\${sinal} \${formatarMoeda(transacao.valor)}</span>
        <button class="btn-excluir" onclick="excluirTransacao('\${transacao.id}')">Excluir</button>
      </div>
    \`;

    listaTransacoes.appendChild(li);
  });
}

// Adiciona uma nova transação a partir dos dados do formulário
function adicionarTransacao(evento) {
  // Evita o recarregamento da página ao enviar o formulário
  evento.preventDefault();

  const descricao = inputDescricao.value.trim();
  const valor = parseFloat(inputValor.value);
  const tipo = selectTipo.value;

  // Validação simples
  if (!descricao || isNaN(valor) || valor <= 0) {
    alert('Por favor, preencha a descrição e um valor maior que zero!');
    return;
  }

  // Cria o novo objeto da transação
  const novaTransacao = {
    id: Date.now().toString(), // Cria um identificador único baseado no milissegundo atual
    descricao: descricao,
    valor: valor,
    tipo: tipo
  };

  // Adiciona a nova transação no início da lista
  transacoes.unshift(novaTransacao);

  // Salva no LocalStorage
  salvarTransacoesNoLocalStorage();

  // Atualiza os totais e a lista na tela
  atualizarTotais();
  renderizarLista();

  // Limpa os campos do formulário para o próximo cadastro
  form.reset();
  inputDescricao.focus();
}

// Exclui uma transação pelo seu ID
function excluirTransacao(id) {
  // Filtra a lista mantendo apenas os itens que têm ID diferente do clicado
  transacoes = transacoes.filter(function(item) {
    return item.id !== id;
  });

  // Atualiza o LocalStorage e a tela
  salvarTransacoesNoLocalStorage();
  atualizarTotais();
  renderizarLista();
}

// ========================================================
// 4. INICIALIZAÇÃO E EVENTOS (Ligar os fios)
// ========================================================
// Quando o formulário for submetido, chama nossa função adicionarTransacao
form.addEventListener('submit', adicionarTransacao);

// Ao abrir o app pela primeira vez, calcula os valores e desenha a lista
atualizarTotais();
renderizarLista();`,
  lines: [
    {
      lineNum: 4,
      text: "const form = document.getElementById('form-transacao');",
      explanation: 'O "getElementById" é uma vara de pescar do JavaScript. Ele procura no HTML a tag que tem exatamente aquele id e guarda na variável "form".',
      concept: 'DOM & getElementById'
    },
    {
      lineNum: 16,
      text: "const CHAVE_STORAGE = 'minhas_transacoes';",
      explanation: 'É o "rótulo da caixinha" onde guardaremos nossos dados no navegador. Como o armário tem muitas gavetas, usamos essa chave para encontrar a nossa.',
      concept: 'Chave do LocalStorage'
    },
    {
      lineNum: 22,
      text: 'let transacoes = carregarTransacoesDoLocalStorage();',
      explanation: 'Usamos "let" (e não "const") porque a lista de transações vai mudar sempre que o usuário adicionar ou apagar algo.',
      concept: 'Variável let vs const'
    },
    {
      lineNum: 30,
      text: 'const dadosTexto = localStorage.getItem(CHAVE_STORAGE);',
      explanation: 'Acessa o LocalStorage do navegador e pergunta: "Tem algum texto guardado com a chave minhas_transacoes?".',
      concept: 'localStorage.getItem'
    },
    {
      lineNum: 34,
      text: 'return JSON.parse(dadosTexto);',
      explanation: 'O LocalStorage só guarda texto puro (string). O JSON.parse faz o papel de "desempacotar", transformando o texto de volta em objetos de verdade que o JavaScript entende.',
      concept: 'JSON.parse'
    },
    {
      lineNum: 45,
      text: 'const dadosTexto = JSON.stringify(transacoes);',
      explanation: 'O inverso do parse: pega nossa lista com objetos e "empacota" em uma única linha de texto para que possa ser guardada no LocalStorage.',
      concept: 'JSON.stringify'
    },
    {
      lineNum: 46,
      text: 'localStorage.setItem(CHAVE_STORAGE, dadosTexto);',
      explanation: 'Guarda definitivamente o texto na memória do navegador. Mesmo que o usuário feche a aba ou desligue o PC, os dados não somem!',
      concept: 'localStorage.setItem'
    },
    {
      lineNum: 59,
      text: 'transacoes.forEach(function(item) { ... });',
      explanation: 'O "forEach" é um laço de repetição. Ele pega item por item da lista de transações e executa a nossa função para somar.',
      concept: 'Laço forEach'
    },
    {
      lineNum: 68,
      text: 'const saldoAtual = totalReceitas - totalDespesas;',
      explanation: 'A regra de ouro da matemática financeira: o que entrou menos o que saiu é o seu saldo final.',
      concept: 'Cálculo Financeiro'
    },
    {
      lineNum: 88,
      text: 'listaTransacoes.innerHTML = "";',
      explanation: 'Antes de desenhar a lista de novo, limpamos o que estava lá para evitar duplicar itens na tela.',
      concept: 'Limpeza de DOM'
    },
    {
      lineNum: 99,
      text: 'const li = document.createElement("li");',
      explanation: 'Cria uma nova tag <li> (item de lista) diretamente na memória do navegador usando JavaScript.',
      concept: 'createElement'
    },
    {
      lineNum: 122,
      text: 'evento.preventDefault();',
      explanation: 'MUITO IMPORTANTE! Por padrão, quando você clica em enviar um formulário no HTML, a página pisca e recarrega. O "preventDefault()" cancela esse recarregamento para manter nosso app rodando suavemente.',
      concept: 'preventDefault()'
    },
    {
      lineNum: 136,
      text: 'id: Date.now().toString()',
      explanation: 'Date.now() retorna o número de milissegundos desde 1970. Como cada clique acontece em um milissegundo diferente, ele gera um ID único e perfeito para identificar cada transação!',
      concept: 'ID Único com Date.now'
    },
    {
      lineNum: 143,
      text: 'transacoes.unshift(novaTransacao);',
      explanation: 'O método "unshift" coloca a nova transação no topo da lista (na posição 0), para que os gastos mais recentes apareçam primeiro na tela!',
      concept: 'Array unshift'
    },
    {
      lineNum: 159,
      text: 'transacoes = transacoes.filter(function(item) { return item.id !== id; });',
      explanation: 'O "filter" é como uma peneira: ele mantém todos os itens cujo ID seja diferente daquele que você clicou em excluir. O item excluído fica de fora!',
      concept: 'Array filter'
    },
    {
      lineNum: 172,
      text: "form.addEventListener('submit', adicionarTransacao);",
      explanation: 'Conecta o formulário à função. Significa: "Fique atento! Quando o usuário tentar enviar este formulário, chame imediatamente a função adicionarTransacao".',
      concept: 'Event Listener'
    }
  ]
};

export const README_CODE_DATA: FileCodeData = {
  filename: 'README.md',
  language: 'markdown',
  description: 'Documentação completa com objetivos de uso, funcionamento detalhado passo a passo e todos os complementos e tecnologias utilizadas.',
  code: `# 💰 FinanDev - Gestor Financeiro Pessoal & Laboratório Didático

> Um sistema de gestão financeira pessoal e ambiente de aprendizado interativo projetado para ensinar iniciantes a construir aplicações web completas a partir dos fundamentos puros: **HTML5**, **CSS3**, **JavaScript Vanilla** e **LocalStorage**.

---

## 🎯 1. Objetivos de Uso

### A. Objetivo Prático (Para o Usuário do Aplicativo)
- Organização Financeira Descomplicada: Registro ágil de entradas (salários, freelas) e saídas (aluguel, contas, alimentação).
- Diagnóstico Instantâneo do Saldo: Visibilidade visual se a conta está no azul (positivo) ou no vermelho (negativo).
- Privacidade e Acesso Offline: Dados salvos no próprio navegador com LocalStorage, sem necessidade de servidores ou contas.

### B. Objetivo Didático e Pedagógico (Para o Estudante de Programação)
- Aprender a Base Real da Web: Dominar HTML5, CSS3 e JS Puro antes de depender de frameworks.
- Perder o Medo do DOM: Aprender como o JS "pesca" elementos (getElementById) e reage a eventos (addEventListener).
- Dominar a Persistência: Compreender como gravar na memória permanente do navegador com JSON.stringify e JSON.parse.
- Estruturação de Código Limpo: Separar Estrutura (HTML), Estilo (CSS) e Regras de Negócio (JS).

---

## ⚙️ 2. Como o Software Funciona (Fluxo em 5 Etapas)

1. Entrada de Dados: Usuário preenche Descrição, Valor numérico e Tipo (Receita ou Despesa).
2. Interceptação do Evento: e.preventDefault() cancela o recarregamento da página e valida os campos.
3. Criação do Objeto & LocalStorage: Gera ID único com Date.now(), adiciona ao Array com unshift() e salva em texto via JSON.stringify().
4. Cálculo Matemático: Percorre o array somando receitas e despesas, aplicando Saldo = Receitas - Despesas.
5. Renderização no DOM: Atualiza os textos formatados em R$ e recria a lista <li> na tela com botão de exclusão.

---

## 📦 3. Complementos e Tecnologias Utilizadas

### No Projeto do Aluno (Offline & Autônomo):
- HTML5 Semântico: <header>, <section>, <form>, <input>, <select>, <ul>.
- CSS3 Moderno: Flexbox e CSS Grid para layout responsivo.
- JavaScript Vanilla: Funções, manipulação de arrays (forEach, filter, unshift) e eventos.
- Web Storage API (localStorage): Armazenamento permanente nativo de até 5MB.
- Intl.NumberFormat: Formatação nativa de moeda brasileira (R$).

### No Ambiente Interativo do Mentor:
- React 19 & TypeScript: Para interface em abas e tipagem segura.
- Tailwind CSS v4: Estilização moderna e contraste de alta legibilidade.
- Lucide React: Ícones vetoriais.
- Vite: Bundler rápido de desenvolvimento.`,
  lines: [
    {
      lineNum: 1,
      text: '# 💰 FinanDev - Gestor Financeiro Pessoal & Laboratório Didático',
      explanation: 'Título do projeto. Em Markdown, o caractere # define o cabeçalho de nível 1.',
      concept: 'Título Markdown'
    },
    {
      lineNum: 7,
      text: '## 🎯 1. Objetivos de Uso',
      explanation: 'Divide claramente os objetivos entre a utilidade prática do usuário e o aprendizado do aluno.',
      concept: 'Objetivos de Uso'
    },
    {
      lineNum: 23,
      text: '## ⚙️ 2. Como o Software Funciona (Fluxo em 5 Etapas)',
      explanation: 'Descreve o ciclo de vida completo de uma transação: da digitação à renderização no DOM.',
      concept: 'Arquitetura de Dados'
    },
    {
      lineNum: 33,
      text: '## 📦 3. Complementos e Tecnologias Utilizadas',
      explanation: 'Lista todos os recursos nativos utilizados pelo aluno e as bibliotecas do ambiente didático.',
      concept: 'Stack Tecnológica'
    }
  ]
};


export const GLOSSARY_TERMS = [
  {
    term: 'HTML (HyperText Markup Language)',
    category: 'Estrutura',
    simpleMeaning: 'O esqueleto da página.',
    explanation: 'Define os tijolos e elementos da tela: títulos, botões, campos de texto e listas. Não tem inteligência nem beleza por si só.',
    icon: 'FileCode'
  },
  {
    term: 'CSS (Cascading Style Sheets)',
    category: 'Visual',
    simpleMeaning: 'A roupa e maquiagem do site.',
    explanation: 'Define as cores, fontes, tamanhos, espaçamentos e como os itens ficam dispostos na tela (lado a lado, um embaixo do outro, etc.).',
    icon: 'Palette'
  },
  {
    term: 'JavaScript (JS)',
    category: 'Lógica',
    simpleMeaning: 'O cérebro do aplicativo.',
    explanation: 'Dá vida à página! Reage aos cliques do mouse, faz contas de matemática (Receitas - Despesas), valida o formulário e grava na memória.',
    icon: 'Cpu'
  },
  {
    term: 'DOM (Document Object Model)',
    category: 'Conexão',
    simpleMeaning: 'A ponte entre o HTML e o JavaScript.',
    explanation: 'É a representação da sua página que o navegador cria na memória. Permite ao JavaScript alterar um texto ou criar um botão dinamicamente.',
    icon: 'Layers'
  },
  {
    term: 'LocalStorage',
    category: 'Armazenamento',
    simpleMeaning: 'O caderno de anotações do navegador.',
    explanation: 'Um espaço no computador do usuário onde o site pode salvar pequenas informações em texto. Não apaga quando a página recarrega ou fecha!',
    icon: 'HardDrive'
  },
  {
    term: 'JSON (JavaScript Object Notation)',
    category: 'Formato',
    simpleMeaning: 'Um jeito de escrever objetos como texto.',
    explanation: 'Como o LocalStorage só aceita texto puro, usamos JSON.stringify para transformar nossos dados em texto e JSON.parse para transformar de volta em objetos.',
    icon: 'Braces'
  },
  {
    term: 'Evento & EventListener',
    category: 'Interação',
    simpleMeaning: 'Um alarme que toca quando o usuário faz algo.',
    explanation: 'Exemplos de eventos: "clique", "digitação", "envio de formulário". O addEventListener é o segurança que fica esperando o evento acontecer.',
    icon: 'Zap'
  },
  {
    term: 'Array',
    category: 'Dados',
    simpleMeaning: 'Uma lista ordenada de coisas.',
    explanation: 'É como uma lista de compras: [transacao1, transacao2, transacao3]. Tem posições (índices 0, 1, 2) e métodos úteis como forEach, push, unshift e filter.',
    icon: 'ListOrdered'
  }
];

export const STEP_BY_STEP_PROJECT = [
  {
    step: 1,
    title: 'Criar a Pasta no seu Computador',
    instruction: 'Crie uma nova pasta chamada "meu-gestor-financeiro" na sua Área de Trabalho ou Documentos e abra ela no VS Code (ou no Bloco de Notas).',
    tip: 'Organização é o primeiro passo de qualquer programador sênior!'
  },
  {
    step: 2,
    title: 'Criar o arquivo index.html',
    instruction: 'Dentro dessa pasta, crie um arquivo chamado "index.html". Copie o código HTML disponibilizado na aba "Código & Linha a Linha" e salve o arquivo.',
    tip: 'Esse é o esqueleto com os campos de Descrição, Valor e Tipo (Receita/Despesa).'
  },
  {
    step: 3,
    title: 'Criar o arquivo style.css',
    instruction: 'Na mesma pasta, crie o arquivo "style.css". Cole o código CSS e salve.',
    tip: 'Observe como a tag <link rel="stylesheet" href="style.css"> no HTML faz a ligação automática!'
  },
  {
    step: 4,
    title: 'Criar o arquivo script.js',
    instruction: 'Crie o arquivo "script.js" e cole o código JavaScript. Ele contém o cálculo do saldo e o salvamento no LocalStorage.',
    tip: 'No final do index.html, a linha <script src="script.js"></script> carrega essa lógica.'
  },
  {
    step: 5,
    title: 'Rodar no seu Navegador',
    instruction: 'Basta dar um duplo clique no arquivo "index.html" para abrir no Google Chrome, Firefox ou Edge. Teste adicionar uma transação!',
    tip: 'Pressione a tecla F12 no navegador e clique na aba "Application" (ou Aplicativo) -> "Local Storage" para ver seus dados salvos em tempo real!'
  }
];
