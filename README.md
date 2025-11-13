**Project**

- **Name**: Kanban Project — um exemplo simples de quadro Kanban em React + TypeScript.
- **Purpose**: Demonstrar gerenciamento de tarefas com frontend em React (Vite + TS) e uma API falsa via `json-server` (usa `db.json`).

**Features**

- **Boards**: Exibe tarefas por status (por exemplo: todo, doing, done).
- **Criar tarefa**: Formulário simples para adicionar tarefas.
- **Persistência local**: Dados de exemplo em `db.json` servidos com `json-server`.

**Tech Stack**

- **Frontend**: React 19, TypeScript, Vite.
- **HTTP**: Axios.
- **Dev**: `json-server` para mock API.

**Setup Rápido**

1. Instale dependências:

```powershell
npm install
```

2. Inicie a API falsa em outra janela/terminal:

```powershell
npm run json-server
```

Isso iniciará o `json-server` lendo `db.json` (por padrão em `http://localhost:3000`).

3. Inicie a aplicação React:

```powershell
npm run dev
```

Abra o endereço exibido pelo Vite (geralmente `http://localhost:5173`).

**Scripts Úteis**

- **`npm run dev`**: Inicia o servidor de desenvolvimento Vite.
- **`npm run build`**: Compila a aplicação para produção.
- **`npm run preview`**: Visualiza o build produzido.
- **`npm run json-server`**: Inicia `json-server` para servir `db.json`.

**API / Dados**

- Arquivo fonte: `db.json` (array `tasks`).
- Endpoints padrão do `json-server` estão disponíveis, por exemplo:
  - `GET /tasks` — lista tarefas
  - `POST /tasks` — cria tarefa
  - `PUT /tasks/:id` — atualiza tarefa

**Estrutura Principal do Projeto**

- `src/components/` — componentes React (`TaskBoard`, `TaskCard`, `CreateTaskForm`).
- `src/contexts/TasksContext.tsx` — contexto para gerenciar tarefas no app.
- `src/hooks/useTasks.ts` — hook personalizado.
- `src/services/` — configuração do `axios` e `tasksService` para chamadas HTTP.

**Observações**

- O projeto é intencionalmente simples para fins didáticos. Para produção, substitua `json-server` por uma API real e adicione validação/autenticação.
- Ajuste portas do `json-server` usando parâmetros CLI se necessário: `json-server --watch db.json --port 4000` e atualize o `baseURL` em `src/services/api.ts`.

**Contribuição**

- Faça fork, crie branch, envie PR. Mantenha mudanças pequenas e documentadas.

**Licença**

- Use conforme desejar; este repositório é um exemplo educacional.
