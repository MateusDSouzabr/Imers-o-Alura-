# 💰 FinanDev - Gestor Financeiro Pessoal & Laboratório Didático

> Um sistema de gestão financeira pessoal e ambiente de aprendizado interativo projetado para ensinar iniciantes a construir aplicações web completas a partir dos fundamentos puros: **HTML5**, **CSS3**, **JavaScript Vanilla** e **LocalStorage**.

---

## 🎯 1. Objetivos de Uso

O projeto foi concebido com dois grandes propósitos complementares:

### A. Objetivo Prático (Para o Usuário do Aplicativo)
* **Organização Financeira Descomplicada:** Permitir o registro imediato de entradas (salários, comissões, freelas) e saídas (aluguel, contas, alimentação, lazer).
* **Diagnóstico Instantâneo do Saldo:** Fornecer em tempo real a saúde financeira do usuário (indicando visualmente se está **no azul 🟢** ou **no vermelho 🔴**).
* **Privacidade e Acesso Offline:** Os dados pertencem exclusivamente ao usuário e ficam gravados no próprio navegador, sem envio para servidores externos ou necessidade de criar contas e senhas.

### B. Objetivo Didático e Pedagógico (Para o Estudante de Programação)
* **Aprender a Base Real da Web:** Compreender como a web funciona por baixo dos panos antes de utilizar frameworks complexos (como React, Angular ou Vue).
* **Perder o Medo do DOM (Document Object Model):** Aprender como o JavaScript "enxerga", escuta eventos e manipula os elementos da tela.
* **Dominar a Persistência no Navegador:** Entender como funciona a memória local (`LocalStorage`) e a serialização de dados (`JSON.stringify` e `JSON.parse`).
* **Estruturação de Código Limpo:** Separar claramente as responsabilidades entre **Estrutura (HTML)**, **Estilo (CSS)** e **Regras de Negócio (JS)**.

---

## ⚙️ 2. Como o Software Funciona (Explicação Detalhada do Fluxo)

O funcionamento do aplicativo segue um ciclo contínuo de **5 etapas**:

```
[ 1. Entrada de Dados ] ➔ [ 2. Interceptação & Validação ] ➔ [ 3. Atualização da Memória ]
                                                                      │
[ 5. Renderização no DOM ] 🠤 [ 4. Cálculo da Matemática ] 🠤───────────┘
```

### Etapa 1: Entrada de Dados no Formulário
O usuário preenche 3 informações essenciais no formulário HTML:
1. **Descrição:** Um texto identificando o lançamento (ex: *"Salário do Mês"* ou *"Almoço"*).
2. **Valor (R$):** Um número monetário positivo com suporte a centavos (ex: `1500.50`).
3. **Tipo:** A classificação financeira entre **Receita** (dinheiro que entra) e **Despesa** (dinheiro que sai).

### Etapa 2: Interceptação do Evento e Validação
Quando o botão *"Adicionar Transação"* é acionado:
1. O JavaScript ouve o evento através de `form.addEventListener('submit', adicionarTransacao)`.
2. A primeira linha executada é `evento.preventDefault()`. Ela cancela o comportamento padrão do navegador de recarregar a página, permitindo que a aplicação seja rápida e suave (*Single Page Application*).
3. O código valida se a descrição não está vazia e se o valor é um número válido maior que zero.

### Etapa 3: Criação do Objeto e Gravação no LocalStorage
Com os dados validados:
1. Um **Objeto JavaScript** é criado com um identificador único gerado pelo milissegundo atual (`id: Date.now().toString()`).
2. Esse objeto é inserido no início da lista na memória RAM (`transacoes.unshift(novaTransacao)`).
3. **A Gravação:** O navegador não permite salvar listas ou objetos diretamente no `LocalStorage`, apenas textos simples (strings). Por isso, usamos o conversor:
   ```javascript
   const dadosTexto = JSON.stringify(transacoes); // Converte lista de objetos em texto JSON
   localStorage.setItem('minhas_transacoes', dadosTexto); // Salva na memória do navegador
   ```

### Etapa 4: Cálculo Matemático do Saldo
A função `atualizarTotais()` percorre a lista de transações com um laço de repetição (`forEach`):
* Se `item.tipo === 'receita'`, soma ao `totalReceitas`.
* Se `item.tipo === 'despesa'`, soma ao `totalDespesas`.
* Aplica a fórmula matemática:
  $$\text{Saldo Atual} = \text{Total de Receitas} - \text{Total de Despesas}$$
* Compara o resultado: se o saldo for maior ou igual a zero, aplica a classe visual verde (`positivo`); se for negativo, aplica a classe vermelha (`negativo`).

### Etapa 5: Atualização Visual da Tela (Renderização no DOM)
1. Os cartões de Saldo, Receitas e Despesas têm seus textos substituídos pelos valores formatados em moeda brasileira (`R$`).
2. A lista `<ul>` é limpa (`innerHTML = ''`) para evitar itens duplicados.
3. Para cada transação da lista, um elemento `<li>` estilizado é criado contendo o nome, tipo, valor colorido e um botão de exclusão que aciona a função `excluirTransacao(id)`.

---

## 📦 3. Complementos, Tecnologias e Dependências Utilizadas

O projeto possui duas camadas: o **Código Puro para o Estudante** e o **Ambiente de Mentoria Interativo**.

### A. Na Versão Pura do Aluno (Stand-alone / Offline):
Para rodar este projeto no seu computador, **nenhuma biblioteca externa ou instalação é necessária**. Ele utiliza 100% de recursos nativos dos navegadores:

| Tecnologia / Complemento | Para que serve no projeto? |
| :--- | :--- |
| **HTML5 Semântico** | Tags como `<header>`, `<section>`, `<form>`, `<input>`, `<select>` e `<ul>` que estruturam a interface de forma acessível. |
| **CSS3 Moderno** | Flexbox e CSS Grid para organização dos cartões e responsividade em computadores e celulares. |
| **JavaScript ECMAScript 6+** | Funções, manipulação de arrays (`forEach`, `filter`, `unshift`) e tratamento de eventos (`addEventListener`). |
| **Web Storage API (`localStorage`)** | Mecanismo nativo do navegador que armazena até 5MB de dados em formato chave-valor sem expiração de data. |
| **Intl.NumberFormat / `toLocaleString`** | Recurso nativo do JavaScript para formatar números no padrão da moeda Real brasileira (`pt-BR`, `BRL`). |

### B. No Ambiente Interativo do Mentor (Plataforma Web):
Para proporcionar uma experiência didática completa no navegador com abas e inspetores visuais, este ambiente utiliza:
* **React 19 & TypeScript:** Para gerenciar o estado da navegação, alternar entre as abas e garantir código fortemente tipado.
* **Tailwind CSS v4:** Para o design moderno, contraste escuro de alta legibilidade e espaçamentos consistentes.
* **Lucide React:** Biblioteca de ícones vetoriais leves para ilustrar carteira, gráficos, alertas e arquivos.
* **Vite:** Ferramenta de compilação rápida para disponibilizar a aplicação em tempo real.

---

## 📂 4. Estrutura de Arquivos Recomendada para o seu Computador

Quando você for montar este projeto na sua máquina (usando o VS Code), estruture assim:

```text
meu-gestor-financeiro/
│
├── index.html        # Estrutura visual e campos da tela
├── style.css         # Cores, espaçamentos, sombras e layout
├── script.js         # Lógica de cálculo, eventos e LocalStorage
└── README.md         # Documentação e guia de estudo deste projeto
```

---

## 💻 5. Como Executar e Testar Localmente

1. Crie uma pasta chamada `meu-gestor-financeiro`.
2. Dentro dela, crie os arquivos `index.html`, `style.css` e `script.js`.
3. Copie os códigos de cada arquivo que estão disponíveis na aba **"2. Código & Linha a Linha"** da nossa plataforma.
4. Dê um **duplo clique no arquivo `index.html`** para abrir em qualquer navegador.
5. **Dica de Ouro:** Pressione **F12** no teclado, selecione a aba **Application** (ou **Aplicativo**) ➔ **Local Storage** e veja seus dados sendo salvos em tempo real a cada clique!

---

## 🗺️ 6. Próximos Passos e Evolução do Software (Roadmap)

Quando você dominar esta versão inicial (MVP), os próximos passos recomendados são:
1. **Categorias de Lançamento:** Permitir classificar as despesas (ex: *Alimentação*, *Transporte*, *Moradia*, *Educação*).
2. **Filtro por Período:** Visualizar apenas as transações do mês vigente.
3. **Exportação de Relatório:** Adicionar um botão para baixar os lançamentos em arquivo `.csv` para abrir no Excel ou Google Planilhas.
4. **Gráfico de Proporção:** Exibir uma barra ou gráfico de pizza comparando a porcentagem de receitas consumida pelas despesas.

---

> *"Programar não é sobre decorar comandos, mas sobre entender como as partes conversam entre si para resolver um problema real."*
