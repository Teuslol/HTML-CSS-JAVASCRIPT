var inpProd = document.querySelector(".inpProd");
var inpPreco = document.querySelector(".inpPreco");
var list = document.querySelector(".listaProduto");
var addTask = document.querySelector(".btnTask");
var taskClear = document.querySelector(".btnClear");
var inpPesquisa = document.querySelector(".campo-pesquisa");
var btnPesquisar = document.querySelector(".btnPesquisar");
var listaProduto = [];



addTask.addEventListener("click", w => {
  var preco = parseFloat(inpPreco.value);
  var produto = inpProd.value.toUpperCase();
  if (produto !== "" && preco !== "") {
    var listagem = {nome: produto, preco: preco}
    listaProduto.push(listagem);
    inpProd.value = "";
    inpPreco.value = "";
    render(listaProduto);
    taskClear.style.display = "block";
    localStorage.setItem("mylist", JSON.stringify(listaProduto));
  } else {
    alert("Preencha todos os Campos");
  }
});

function render(elemments) {
  list.innerHTML = "";
  elemments.forEach((e, index) => {
    let newEl = document.createElement("li");
    newEl.innerHTML = e.nome + " - R$ " + e.preco;

    let editButton = document.createElement("button");
    editButton.innerHTML = "Editar";
    editButton.addEventListener("click", function() {
      editarItem(index);
    });

    newEl.appendChild(editButton);
    newEl.classList.add("list-group-item");
    list.appendChild(newEl);
  });
}


let saved = localStorage.getItem("mylist");
if (saved) {
  listaProduto = JSON.parse(localStorage.getItem("mylist"));
  render(listaProduto);
} else {
  taskClear.style.display = "none";
}

taskClear.addEventListener("click", function() {
  localStorage.clear();
  list.innerHTML = "";
  listaProduto = [];
  taskClear.style.display = "none";
});


function editarItem(index) {
  var novoNome = prompt("Digite o novo nome:");
  var novoPreco = parseFloat(prompt("Digite o novo preço:"));
  
  if (novoNome !== null && novoPreco !== null) {
    listaProduto[index].nome = novoNome;
    listaProduto[index].preco = novoPreco;
    
    localStorage.setItem("mylist", JSON.stringify(listaProduto));
    render(listaProduto);
  }
}

