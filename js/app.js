const URL_API = "http://localhost:3000/tasks";

//lista as tarefas
function listarTarefas() {
  fetch(URL_API)
    .then(res => res.json())
    .then(tarefas => {
      const lista = document.getElementById("lista-tarefas");
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
      
        const botao = document.createElement("button");
        botao.textContent = "🗑️";
        botao.addEventListener("click", () => deletarTarefa(tarefa.id));
      
        div.appendChild(titulo);
        div.appendChild(descricao);
        div.appendChild(dataHora);
        div.appendChild(tipo);
        div.appendChild(botao);
      
        lista.appendChild(div);
      });
      
    })
    .catch(err => {
      console.error("Erro ao buscar tarefas:", err);
    });
}

//deleta tarefa
function deletarTarefa(id) {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw new Error('Falha ao deletar tarefa');
        }
        return res.json();
      })
      .then(() => {
        listarTarefas();  
      })
      .catch(err => {
        console.error("Erro ao deletar tarefa:", err);
      });
  }

//mostrar o formulário de cadastro
function mostrarFormularioCadastro() {
  document.getElementById("formulario-cadastro").style.display = "block";
  document.getElementById("lista-tarefas").innerHTML = "";  
  document.getElementById("btn-listar").disabled = false; 
  document.getElementById("btn-cadastrar").disabled = true; 
}

//cadastra uma nova tarefa
function cadastrarTarefa(event) {
  event.preventDefault(); 

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("tipo").value;
  const dataHora = document.getElementById("dataHora").value;

  const novaTarefa = {
    titulo,
    descricao,
    tipo,
    dataHora
  };

  fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaTarefa),
  })
    .then(res => res.json())
    .then(() => {
      listarTarefas();  
      document.getElementById("form-tarefa").reset();  //Limpa o formulário
      document.getElementById("formulario-cadastro").style.display = "none";
      document.getElementById("btn-listar").disabled = false;  
      document.getElementById("btn-cadastrar").disabled = false; 
    })
    .catch(err => {
      console.error("Erro ao cadastrar tarefa:", err);
    });
}

//Ao carregar a página, só será exibida a lista de tarefas
window.onload = () => {
  document.getElementById("btn-listar").disabled = false;
  document.getElementById("btn-cadastrar").disabled = false;
};
