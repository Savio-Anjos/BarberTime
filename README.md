# BarberTime

## 🚀 Tecnologias

Este projeto está utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [Vitest](https://vitest.dev/)

## 📜 Descrição

O **BarberTime** é um sistema de agendamento para barbearias, permitindo que os clientes agendem horários online de forma simples e intuitiva. O barbeiro pode gerenciar seus serviços, horários disponíveis e acompanhar seus atendimentos diretamente pelo painel administrativo.

## ⚙️ Como funciona?

## ✅ Requisitos Funcionais (RFs)

### **Cliente (Usuário Final)**

- [ ] Cadastro e login (e-mail/senha ou autenticação via Google/Facebook).
- [ ] Gerenciamento de perfil com histórico de agendamentos.
- [ ] Seleção de data e hora disponíveis com base na agenda do barbeiro.
- [ ] Escolha de serviços disponíveis (corte, barba, combos).
- [ ] E ibição do preço total antes da confirmação.
- [ ] Confirmação e cancelamento de agendamentos (respeitando regras de cancelamento).
- [ ] Visualização de agendamentos futuros e passados.
- [ ] Notificações por e-mail ou push para lembrete de agendamento.
- [ ] Avaliação do serviço após o atendimento (1 a 5 estrelas).

### **Administrador (Barbeiro)**

- [ ] Dashboard com lista de agendamentos do dia.
- [ ] Gerenciamento de horários disponíveis.
- [ ] Cadastro e edição de serviços (nome, descrição, preço, duração).
- [ ] Configuração do horário de funcionamento e intervalos.
- [ ] Relatórios financeiros por período (e .: total arrecadado no mês).
- [ ] Histórico de clientes atendidos.

## 📋 Regras de Negócio (RNs)

- [ ] Um cliente só pode agendar horários disponíveis.
- [ ] Cancelamento permitido apenas até **24 horas antes** do horário agendado.
- [ ] O barbeiro pode bloquear horários específicos.
- [ ] Apenas o administrador pode gerenciar serviços e horários disponíveis.
- [ ] Apenas clientes autenticados podem realizar agendamentos.
- [ ] Cada agendamento está vinculado a um único cliente e barbeiro.
- [ ] Não é permitido dois agendamentos no mesmo horário para o mesmo barbeiro.
- [ ] Os horários disponíveis devem respeitar o e pediente e intervalos configurados pelo barbeiro.
- [ ] Os clientes podem avaliar o serviço apenas após a realização do agendamento.

## 📌 Rotas da aplicação

### **Usuários (Clientes e Administradores)**

- **POST** `/users/register` → Cadastrar novo usuário.
- **POST** `/users/login` → Autenticar usuário.
- **GET** `/users/profile/:id` → Buscar perfil do usuário.
- **PUT** `/users/profile/:id` → Atualizar perfil do usuário.
- **DELETE** `/users/profile/:id` → Deletar usuário.

### **Agendamentos**

- **POST** `/appointments` → Criar um novo agendamento.
- **GET** `/appointments/:id` → Buscar um agendamento.
- **GET** `/appointments/user/:userId` → Listar agendamentos de um usuário.
- **GET** `/appointments/admin/:barberId` → Listar agendamentos do barbeiro.
- **DELETE** `/appointments/:id` → Cancelar um agendamento (seguindo regras de cancelamento).

### **Serviços**

- **POST** `/services` → Criar um novo serviço.
- **GET** `/services/:id` → Buscar um serviço.
- **GET** `/services` → Listar todos os serviços.
- **PUT** `/services/:id` → Atualizar um serviço.
- **DELETE** `/services/:id` → Deletar um serviço.

### **Horários e Funcionamento**

- **POST** `/schedule` → Definir horários de funcionamento.
- **GET** `/schedule/:barberId` → Consultar horários disponíveis.
- **PUT** `/schedule/:id` → Atualizar horários de funcionamento.

## 🎲 Como acessar o projeto?

### Clone este repositório

```bash
git clone https://github.com/seu-usuario/barbertime.git
```

### Navegue até o diretório do projeto

```bash
cd barbertime
```

### Instale as dependências

```bash
npm i
```

```bash
yarn
```

### Crie um arquivo .env e cole os dados de .env.example

### Execute o docker compose

```bash
docker compose up
```

### Rode as migrations

```bash
npx prisma migrate dev
```

### Inicie a aplicação

```bash
npm run start:dev
```

---
