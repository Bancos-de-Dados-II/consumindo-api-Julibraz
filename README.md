# Gerenciador de Tarefas

Este projeto é uma aplicação web simples de gerenciamento de tarefas, onde você pode cadastrar, editar, excluir e listar tarefas. As tarefas podem ser do tipo "Pessoal" ou "Profissional" e têm uma data e hora associada.

## Tecnologias Utilizadas

- HTML
- CSS (com responsividade)
- JavaScript (Fetch API)
- Node.js (Backend - API) [não incluso neste repositório]

## Funcionalidades

### 1. **Cadastrar Tarefa**
- Preencha os campos de título, descrição, tipo e data/hora.
- O tipo pode ser "Pessoal" ou "Profissional".
- Não é permitido cadastrar tarefas com data e hora no passado.

### 2. **Listar Tarefas**
- Exibe todas as tarefas cadastradas, ordenadas pela data e hora.
- As tarefas podem ser do tipo "Pessoal" ou "Profissional", com cores diferenciadas.
  
### 3. **Editar Tarefa**
- Permite editar uma tarefa existente, atualizando suas informações.

### 4. **Excluir Tarefa**
- Permite excluir uma tarefa da lista.

### 5. **Notificações**
- Ao realizar ações como cadastrar, editar ou excluir uma tarefa, o sistema exibe notificações de sucesso ou erro.