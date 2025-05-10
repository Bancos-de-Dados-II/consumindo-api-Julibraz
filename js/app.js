const URL_API = "http://localhost:3000/tasks";

let listaVisivel = false; // variável de controle da visibilidade da lista

//lista as tarefas
function listarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  const btnListar = document.getElementById("btn-listar");

  if (listaVisivel) {
    lista.innerHTML = "";
    btnListar.textContent = "Listar Tarefas";
    listaVisivel = false;
    return;
  }

  fetch(URL_API)
    .then(res => res.json())
    .then(tarefas => {
      lista.innerHTML = "";

      tarefas.forEach(tarefa => {
        const div = document.createElement("div");
      
        const titulo = document.createElement("strong");
        titulo.textContent = tarefa.titulo;
      
        const descricao = document.createElement("p");
        descricao.textContent = `Descrição: ${tarefa.descricao}`;
      
        const dataHora = document.createElement("p");
        dataHora.textContent = `Data e Hora: ${new Date(tarefa.dataHora).toLocaleString()}`;
      
        const tipo = document.createElement("p");
        tipo.textContent = `Tipo: ${tarefa.tipo}`;
      
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "🗑️";
        botaoExcluir.addEventListener("click", () => deletarTarefa(tarefa.id));

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "✏️";
        botaoEditar.addEventListener("click", () => editarTarefa(tarefa));
        
        div.appendChild(titulo);
        div.appendChild(descricao);
        div.appendChild(dataHora);
        div.appendChild(tipo);
        div.appendChild(botaoExcluir);
        div.appendChild(botaoEditar)
      
        lista.appendChild(div);
      });

      listaVisivel = true;
      btnListar.textContent = "Ocultar Tarefas";
    })
    .catch(err => {
      console.error("Erro ao buscar tarefas:", err);
    });
}

//deleta tarefa
function deletarTarefa(id){
  fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Falha ao deletar tarefa');
      }
      return res.json();
    })
    .then(() => {
      listarTarefas();  
      alert("Tarefa excluída com sucesso!");
      listaVisivel = true;  
      document.getElementById("lista-tarefas").style.display = "block";
    })
    .catch(err => {
      console.error("Erro ao deletar tarefa:", err);
    });
}

let modoEdicao = false;
let idEdicao = null;

//Editar uma tarefa já existente
function editarTarefa(tarefa){
  document.getElementById("formulario-cadastro").style.display = "block";
  document.getElementById("btn-cadastrar").disabled = true;
  document.getElementById("btn-listar").disabled = true;

  //Preenche o formulario com os dados da tarefa
  document.getElementById("titulo").value = tarefa.titulo;
  document.getElementById("descricao").value = tarefa.descricao;
  document.getElementById("tipo").value = tarefa.tipo;
  document.getElementById("dataHora").value = tarefa.dataHora.slice(0,16);

  //definindo para o modo de edição
  modoEdicao = true;
  idEdicao = tarefa.id;
  document.getElementById("btn-submit").textContent = "Atualizar";
}

//mostrar o formulário de cadastro
function mostrarFormularioCadastro(){
  document.getElementById("formulario-cadastro").style.display = "block";
  document.getElementById("lista-tarefas").innerHTML = "";  
  document.getElementById("btn-listar").disabled = false; 
  document.getElementById("btn-cadastrar").disabled = true; 
  listaVisivel = false; // reseta a visibilidade
  document.getElementById("btn-listar").textContent = "Listar Tarefas";
}

//cadastra uma nova tarefa
function cadastrarTarefa(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("tipo").value;
  const dataHora = document.getElementById("dataHora").value;

  //Impede que uma tarefa seja cadastrada no passado
  const agora = new Date();
  const dataSelecionada = new Date(dataHora);

  if(dataSelecionada < agora){
    alert("A data e hora da tarefa não podem estar no passado!");
    return;
  }

  const tarefa = { titulo, descricao, tipo, dataHora };

  const url = modoEdicao ? `${URL_API}/${idEdicao}` : URL_API;
  const metodo = modoEdicao ? "PATCH" : "POST";

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then(res => res.json())
    .then(() => {
      listarTarefas();
      document.getElementById("lista-tarefas").style.display = "block";
      document.getElementById("form-tarefa").reset();
      document.getElementById("formulario-cadastro").style.display = "none";
      document.getElementById("btn-cadastrar").disabled = false;
      document.getElementById("btn-listar").disabled = false;

      //mensagem de sucesso
      if(modoEdicao){
        alert("Tarefa editada com sucesso!");
      }else{
        alert("Tarefa cadastrada com sucesso!");
      }

      //Reseta o modo de edição
      modoEdicao = false;
      idEdicao = null;
      document.getElementById("btn-submit").textContent = "Cadastrar";
    })
    .catch(err => {
      console.error("Erro ao salvar tarefa:", err);
    });
}

//Ao carregar a página, só será exibida a lista de tarefas
window.onload = () => {
  document.getElementById("btn-listar").disabled = false;
  document.getElementById("btn-cadastrar").disabled = false;
};

function cancelar() {
  document.getElementById("formulario-cadastro").style.display = "none";
  document.getElementById("form-tarefa").reset();
  document.getElementById("btn-cadastrar").disabled = false;
  document.getElementById("btn-listar").disabled = false;
  document.getElementById("btn-submit").textContent = "Cadastrar";
  modoEdicao = false;
  idEdicao = null;
}
