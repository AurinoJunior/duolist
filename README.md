# 🛒 Lista de Compras

Uma aplicação moderna e minimalista para gerenciar suas listas de compras, inspirada no design limpo do Headspace.

## ✨ Funcionalidades

- ✅ **Múltiplas Listas**: Crie e gerencie várias listas (ex: "Compra Semanal", "Churrasco")
- 🏷️ **Categorias Pré-definidas**: Organize itens por categorias com cores e emojis
- ✔️ **Marcar Completos**: Check items off as you shop
- 🔄 **Drag & Drop**: Reordene itens arrastando
- 📦 **Histórico**: Archive listas antigas para referência futura
- 📋 **Compartilhar**: Copie listas como texto para compartilhar
- 💾 **LocalStorage**: Dados salvos localmente (preparado para migração futura para DB)
- 📱 **Responsivo**: Funciona perfeitamente em mobile e desktop

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# 1. Navegue até a pasta do projeto
cd grocery-list

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:3000
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Rodar build de produção
npm start
```

## 🏗️ Estrutura do Projeto

```
grocery-list/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout raiz
│   └── globals.css       # Estilos globais
├── components/
│   ├── GroceryItemComponent.tsx  # Item individual
│   ├── AddItemForm.tsx           # Formulário de adicionar
│   └── ListSelector.tsx          # Seletor de listas
├── hooks/
│   └── useGroceryLists.ts        # Hook principal de estado
├── lib/
│   ├── constants.ts      # Configurações e constantes
│   └── storage.ts        # Utilitários de localStorage
├── types/
│   └── index.ts          # Tipos TypeScript
└── package.json
```

## 🎨 Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Armazenamento**: LocalStorage (preparado para DB)

## 📝 Como Usar

### Criar uma Lista

1. Clique no botão "Nova Lista" no seletor
2. Digite o nome (ex: "Compra da Semana")
3. Pressione Enter ou clique em "Criar"

### Adicionar Itens

1. Clique em "Adicionar Item"
2. Digite o nome do produto
3. Selecione a categoria
4. Clique em "Adicionar"

### Organizar Itens

- **Marcar como comprado**: Clique no círculo ao lado do item
- **Reordenar**: Arraste o item pela alça (ícone de linhas)
- **Deletar**: Clique no ícone de lixeira (aparece ao passar o mouse)

### Gerenciar Listas

- **Trocar de lista**: Clique no seletor de listas no topo
- **Compartilhar**: Clique no ícone de compartilhar na lista
- **Arquivar**: Clique no ícone de arquivo para mover para histórico
- **Ver arquivadas**: Clique em "Ver Arquivadas" no topo

## 🔮 Roadmap Futuro

- [ ] Backend com API Routes
- [ ] Banco de dados (PostgreSQL/MongoDB)
- [ ] Autenticação de usuários
- [ ] Sincronização entre dispositivos
- [ ] Compartilhamento colaborativo em tempo real
- [ ] Sugestões inteligentes baseadas em histórico
- [ ] Integração com supermercados
- [ ] PWA (Progressive Web App)
- [ ] Modo offline

## 🎯 Preparação para Migração

O código está estruturado para facilitar a migração futura:

### LocalStorage → Banco de Dados

1. **Hooks personalizados**: Toda lógica está em `useGroceryLists.ts`
2. **Camada de storage**: `lib/storage.ts` abstrai o localStorage
3. **Tipos definidos**: TypeScript facilita validação de dados

### Próximos Passos para DB

```typescript
// 1. Criar API Routes em app/api/
// app/api/lists/route.ts
// app/api/lists/[id]/route.ts
// app/api/items/route.ts

// 2. Substituir storage.ts por chamadas fetch
// lib/api.ts
export async function getLists() {
  const res = await fetch('/api/lists');
  return res.json();
}

// 3. Atualizar hook para usar API
// hooks/useGroceryLists.ts
const { data, mutate } = useSWR('/api/lists', getLists);
```

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Este é um projeto pessoal, mas feedback é sempre apreciado.

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

Feito com 🧡 para facilitar suas compras
