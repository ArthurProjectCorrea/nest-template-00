# nest-template

Template NestJS com TypeScript, ESLint, Prettier e fluxo de qualidade (CI, hooks, semantic-release). Use como ponto de partida para novos projetos backend.

---

## Primeiros passos (após clonar)

Ao clonar este repositório como template, o projeto ainda terá o nome, versão e histórico do template. Siga um dos fluxos abaixo.

### Opção 1: Script automático (recomendado)

Execute **uma vez** após clonar. O script:

- Define o **nome** do projeto no `package.json` com o nome do repositório (extraído do `git remote origin`)
- Zera a **versão** para `0.0.0`
- **Remove** o `CHANGELOG.md` do template
- Atualiza o **primeiro commit** com a mensagem `chore: first commit` (incluindo essas alterações)

```bash
git clone <URL_DO_SEU_REPO>
cd <nome-do-repo>

npm run init
```

Depois:

```bash
npm install
npm run prepare   # instala os git hooks (lefthook)
npm run start:dev
```

> **Importante:** o script usa o nome do repositório a partir de `git remote get-url origin`. Configure o remote antes de rodar `npm run init` se você clonou por outro meio.

### Opção 2: Passos manuais

1. **Altere o nome e a versão** em `package.json`:
   - `name`: nome do seu projeto (recomendado: mesmo nome do repositório)
   - `version`: `0.0.0`

2. **Remova o changelog do template:** apague o arquivo `CHANGELOG.md` (o semantic-release criará um novo ao fazer releases).

3. **Padronize o primeiro commit** (opcional):

   ```bash
   git add -A
   git commit --amend -m "chore: first commit"
   ```

   > Modificar o último commit reescreve o histórico. Se já tiver enviado ao remoto, será necessário `git push --force-with-lease origin <branch>` (use com cuidado).

4. **Instale dependências e prepare os hooks:**

   ```bash
   npm install
   npm run prepare
   npm run start:dev
   ```

---

## Tecnologias do template

| Área          | Tecnologia                                      |
| ------------- | ----------------------------------------------- |
| **Framework** | NestJS 11                                       |
| **Linguagem** | TypeScript 5                                    |
| **Qualidade** | ESLint, Prettier, Lefthook, lint-staged         |
| **Testes**    | Jest, Supertest                                 |
| **CI/CD**     | GitHub Actions (CI + Release), semantic-release |

- **Node:** `>=20.9.0` (definido em `engines` no `package.json` e nos workflows).

---

## Variáveis de ambiente

- Copie `.env.example` para `.env` e ajuste os valores. O `.env` não é versionado.
- A aplicação usa `process.env.PORT` (padrão `3000`) em `src/main.ts`. Para validar variáveis na subida, considere `@nestjs/config` em projetos reais.

---

## Qualidade e boas práticas

- **Antes de commitar**, rode:
  - `npm run format` — formata o código (Prettier)
  - `npm run lint` — ESLint nos arquivos do projeto
  - `npm run build` — garante que o projeto compila

- **Git hooks (Lefthook):** o script `prepare` instala hooks que rodam **lint-staged** e **ESLint** no pre-commit. Mantenha `npm run prepare` após clonar.

- **Commits:** use [Conventional Commits](https://www.conventionalcommits.org/) (ex.: `feat:`, `fix:`, `chore:`) para o semantic-release gerar changelog e versões corretamente.

- **Validar workflow (espelha o CI):**

  ```bash
  npm run validate:workflow   # build + lint + test
  npx lefthook run pre-commit
  ```

---

## Comandos úteis

```bash
# Desenvolvimento
npm run start:dev    # servidor com watch
npm run start:debug  # servidor com debug + watch

# Build e produção
npm run build        # build de produção
npm run start:prod   # inicia o servidor (após build; usa dist/main)

# Testes
npm run test         # testes unitários
npm run test:e2e     # testes e2e
npm run test:cov     # cobertura

# A aplicação expõe GET /health (status para load balancers/Kubernetes).

# Qualidade
npm run format       # Prettier (escreve nos arquivos)
npm run lint         # ESLint
npm run validate:workflow   # build + lint
npx lefthook run pre-commit # roda o hook de pre-commit manualmente

# Template (após clonar)
npm run init         # primeiros passos: nome, versão, changelog, primeiro commit
```

---

## Releases automatizados

O repositório usa **semantic-release** na CI: a cada push em `main` (após o workflow de CI passar), o job de release pode criar tags, GitHub Release e atualizar o `CHANGELOG.md`. A publicação no npm está **desativada** por padrão (`release.config.js`).

- **Repositório:** a URL do repo é obtida automaticamente do `git remote origin` (ver `release.config.js`).
- **Tokens:** o workflow usa `GITHUB_TOKEN`; se precisar de permissões extras (ex.: branch protection), crie um Personal Access Token com escopo `repo` e defina o secret `SEMANTIC_RELEASE_TOKEN`.
- **Branch protection:** em repositórios com proteção em `main`, pode ser necessário permitir que o GitHub Actions faça push (ou usar o token acima).

O workflow de release está em `.github/workflows/release.yml` e depende do CI (`.github/workflows/ci.yml`).

---

## Próximos passos (para projetos reais)

- **Configuração:** `@nestjs/config` + validação (ex.: Joi ou class-validator) para variáveis de ambiente.
- **Docker:** `Dockerfile` multi-stage e `.dockerignore` para deploy.
- **Logging:** Logger estruturado (ex.: Pino com `nestjs-pino`) em produção.
- **Segurança:** Helmet, CORS e rate limiting (`@nestjs/throttler`) conforme a necessidade.
- **API:** Swagger/OpenAPI (`@nestjs/swagger`) para documentar endpoints.

---

## Documentação NestJS

- [Documentação oficial](https://docs.nestjs.com)
- [Primeiros passos](https://docs.nestjs.com/first-steps)
- [Visão geral](https://docs.nestjs.com/overview)

---

Se precisar de ajuda com algo específico, abra uma issue ou envie uma PR. Obrigado por usar o template.
