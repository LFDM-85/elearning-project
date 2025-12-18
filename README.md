# 🎓 Elearning Management System

Um projeto Full-stack desenvolvido com **NestJS** e **React**, projetado para ser um ambiente de demonstração funcional para práticas de **Docker Swarm** e **Kubernetes**.

O sistema permite a gestão de cursos, lições, alunos e professores, com autenticação robusta e controle de acesso baseado em funções (RBAC).

---

## 🚀 Como Iniciar Rapidamente

### 1. Requisitos
- Docker e Docker Compose
- Node.js v18+ (opcional para execução local)

### 2. Configuração Automática (Recomendado)
Para subir todo o ambiente (Banco, Backend, Frontend e Mock Data), execute o script na raiz:
```bash
chmod +x start-all.sh
./start-all.sh
```

### 3. Configuração via Docker Compose
Se preferir usar apenas o Docker:
```bash
docker-compose up --build
```
*Após os containers subirem, execute o seed no backend para popular os dados:*
```bash
cd Backend-main && npm install && node seed.js
```

---

## 🔑 Credenciais de Demonstração (Mock Data)

O sistema já vem pré-configurado com dados de teste através do script `seed.js`:

| Role | Email | Senha | Descrição |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@admin.com` | `qwertyuiop` | Acesso total ao painel de gestão. |
| **Professor** | `prof1@elearning.com` | `professorpassword` | Gestão de cursos e lições. |
| **Aluno** | `student1@elearning.com` | `studentpassword` | Visualização de cursos e notas. |

> **Dica:** Na página de Login, utilize o botão **"Admin Demonstration Sign IN"** para entrar instantaneamente com a conta principal.

---

## 🛠️ Arquitetura e Tecnologias

### Backend (NestJS)
- **Porta:** 5000
- **Banco de Dados:** MongoDB (via Mongoose)
- **Autenticação:** JWT com Refresh Tokens e hash **Argon2**.
- **Documentação:** Swagger disponível em `http://localhost:5000/api`

### Frontend (React + TypeScript)
- **Porta:** 3000 (Docker) ou 3001 (Local)
- **UI:** Material UI (MUI)
- **Estado Global:** Context API para Autenticação.
- **Segurança:** Interceptores Axios para gestão de tokens e normalização de rotas.

---

## 📦 Estrutura de Mock Data Criada
Ao rodar o seed, o sistema gera:
- **1 Admin** (com permissões de professor).
- **5 Professores** distintos.
- **20 Alunos** reais.
- **10 Cursos** com 5 lições cada.
- Distribuição automática de alunos pelos cursos com logs de presença e notas simuladas.

---

## 🔧 Correções Realizadas para Demonstração
- ✅ **Blank Page Fix:** Proteção contra tokens corrompidos no `jwt_decode`.
- ✅ **Routing Normalization:** Interceptor Axios para garantir que chamadas de API em sub-rotas (`/my/...`) não colidam com o roteamento do React.
- ✅ **Argon2 Compatibility:** Sincronização do hash de senhas entre o script de Seed e o serviço de Auth do NestJS.
- ✅ **Nginx Proxy:** Configuração de produção ajustada para redirecionar corretamente pedidos de API.

---

## 👨‍💻 Próximos Passos (DevOps)
Este projeto foi otimizado para:
1. **Docker Swarm:** Deploy de stacks com réplicas para o backend.
2. **Kubernetes:** Criação de Deployments, Services e Ingress Controllers.
3. **CI/CD:** Pipelines para build de imagens e deploy automático.