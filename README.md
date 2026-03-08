# 🛒 Duolist

Uma aplicação moderna e minimalista para gerenciar suas listas de compras, inspirada no design limpo do Headspace.

## 🛠️ Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Biome** (linter + formatter)

### Pré-requisitos

- Node.js 18+
- yarn

### Instalação

```bash
# 1. Navegue até a pasta do projeto
cd duolist

# 2. Instale as dependências
yarn

# 3. Rode em modo desenvolvimento
yarn dev

# 4. Abra no navegador
http://localhost:3000
```

### Build para Produção

```bash
# Build otimizado
yarn build

# Rodar build de produção
yarn start
```

### Outros comandos

```bash
yarn lint       # Biome
yarn typecheck  # TypeScript
```

## 🏗️ Estrutura do Projeto

```
duolist/
├── app/           # Páginas da aplicação
├── components/    # Componentes compartilhados
├── hooks/         # Hooks de estado e lógica
├── lib/           # Utilitários, constantes e camada de storage
├── types/         # Tipagem da aplicação
```

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

Feito com 🧡 para facilitar suas compras
