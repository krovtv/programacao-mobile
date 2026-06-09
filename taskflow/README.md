# TaskFlow 📋

Sistema de gerenciamento de tarefas com interface mobile-first, desenvolvido em React.
Projeto para a disciplina de Programação de Dispositivos Móveis.

---

## 🚀 Como rodar no VSCode

### Pré-requisitos
- **Node.js** instalado (versão 16 ou superior)  
  Baixe em: https://nodejs.org/

### Passos

1. **Abra a pasta do projeto no VSCode**

2. **Abra o terminal integrado**  
   Menu → Terminal → Novo Terminal  
   (ou atalho: Ctrl + `)

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

5. **Acesse no navegador**  
   O app abrirá automaticamente em: http://localhost:3000

---

## 📁 Estrutura do Projeto

```
taskflow/
├── public/
│   └── index.html          # HTML base
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Cabeçalho com progresso e busca
│   │   ├── TabBar.jsx       # Abas de filtro (Todas, Hoje...)
│   │   ├── CategoryFilter.jsx  # Chips de categoria
│   │   ├── TaskCard.jsx     # Card individual de tarefa
│   │   ├── AddTaskModal.jsx # Modal para adicionar tarefa
│   │   └── BottomNav.jsx    # Navegação inferior
│   ├── data/
│   │   └── initialTasks.js  # Dados iniciais de exemplo
│   ├── App.jsx              # Componente principal
│   ├── index.js             # Entrada da aplicação
│   └── index.css            # Estilos globais
├── package.json
└── README.md
```

---

## ✨ Funcionalidades

- ✅ Criar tarefas com título, categoria, prioridade e prazo
- ✅ Marcar tarefas como concluídas
- ✅ Excluir tarefas (passe o mouse sobre o card)
- ✅ Busca em tempo real
- ✅ Filtros por aba: Todas, Pendentes, Concluídas, Hoje
- ✅ Filtros por categoria: Trabalho, Pessoal, Estudo, Saúde
- ✅ Barra de progresso de conclusão
- ✅ Indicadores de prazo (atrasada, hoje, amanhã)
- ✅ Interface mobile-first com frame de celular
- ✅ Bottom Navigation Bar
- ✅ FAB (Floating Action Button)
- ✅ Modal com animação slide-up

---

## 🧩 Conceitos de React aplicados

| Conceito | Onde é usado |
|---|---|
| `useState` | Gerenciamento de tarefas, filtros, modal |
| `useMemo` | Filtragem e ordenação performática |
| `props` | Comunicação entre componentes |
| Componentização | Header, TabBar, TaskCard, Modal, etc. |
| Eventos | onClick, onChange, onKeyDown |
| Renderização condicional | Modal, empty state, botão deletar |
| Listas com `.map()` | Renderização das tarefas |

---

## 📱 Relação com React Native

Este projeto web simula a arquitetura de um app React Native:

| React (Web) | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>` | `<Text>` |
| `style={{ }}` | `StyleSheet.create({ })` |
| `onClick` | `onPress` |
| `position: fixed` | Absolutamente posicionado com `position: 'absolute'` |
| CSS animations | `Animated` API |
| Bottom Nav div | `createBottomTabNavigator` |
| Modal div | `<Modal>` do React Native |
