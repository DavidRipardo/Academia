const hamBurger = document.querySelector(".toggle-btn");
const mainSection = document.querySelector(".main");

hamBurger.addEventListener("click", function() {
  const sidebar = document.querySelector("#sidebar");
  sidebar.classList.toggle("expand");

  // Adicionar ou remover uma classe à seção principal
  mainSection.classList.toggle("sidebar-expand");
});

function visualizarTreino(treino) {
  // Redireciona para a página de visualização do treino correspondente
  window.location.href = 'visualizar_treino.html';
}
function voltar(treino) {
  // Redireciona para a página de visualização do treino correspondente
  window.location.href = 'listagem_treinos.html';
}
// Função para carregar os dados do treino (exemplo estático)
function carregarDadosDoTreino() {
  const treino = {
    nome: "Treino de Exemplo",
    data: "25/05/2024",
    nomePersonal: "João Silva",
    objetivo: "Ganhar Massa Muscular",
    aquecimento: [{
      duracao: 10,
      atividade: "Corrida Leve"
    }],
    exercicios: [{
        nome: "Supino Reto",
        serie: 4,
        repeticao: 12,
        descricao: "Execução no banco reto, com pegada aberta.",
        descanso: 60
      },
      {
        nome: "Agachamento Livre",
        serie: 3,
        repeticao: 15,
        descricao: "Agachamento com barra, mantendo as costas retas.",
        descanso: 90
      }
    ]
  };

  document.getElementById("nome-treino").innerText = treino.nome;
  document.getElementById("data-treino").innerText = treino.data;
  document.getElementById("nome-personal").innerText = treino.nomePersonal;
  document.getElementById("objetivo-treino").innerText = treino.objetivo;

  const aquecimentoList = document.getElementById("aquecimento-list");
  treino.aquecimento.forEach((item, index) => {
    const duracao = document.createElement("p");
    duracao.innerHTML = `<span>Duração: </span><span class="aquecimento-duracao">${item.duracao}</span> minutos`;
    const atividade = document.createElement("p");
    atividade.innerHTML = `<span>Atividade: </span><span class="aquecimento-exercicio">${item.atividade}</span>`;
    aquecimentoList.appendChild(duracao);
    aquecimentoList.appendChild(atividade);
  });

  const exerciseList = document.getElementById("exercise-list");
  treino.exercicios.forEach((exercicio, index) => {
    const exerciseItem = document.createElement("div");
    exerciseItem.classList.add("exercise-item");
    exerciseItem.innerHTML = `
                <p><strong>Nome do Exercício:</strong> <span class="exercise-nome">${exercicio.nome}</span></p>
                <p><strong>Série:</strong> <span class="exercise-serie">${exercicio.serie}</span></p>
                <p><strong>Repetição:</strong> <span class="exercise-repeticao">${exercicio.repeticao}</span></p>
                <p><strong>Descrição:</strong></p>
                <p class="exercise-descricao">${exercicio.descricao}</p>
                <p><strong>Tempo de Descanso:</strong> <span class="exercise-descanso">${exercicio.descanso}</span> segundos</p>
                <div id="checklist">
                    <input type="checkbox" id="exercise-${index + 1}" value="1">
                    <label for="exercise-${index + 1}">Concluído</label>
                </div>
            `;
    exerciseList.appendChild(exerciseItem);
  });
}

// Carrega os dados ao carregar a página
window.onload = carregarDadosDoTreino;

$(document).ready(function() {
  let selectedDates = [];
  const treinos = {};

  // Configuração de regionalização para português
  $.datepicker.regional['pt'] = {
    closeText: 'Fechar',
    prevText: 'Anterior',
    nextText: 'Próximo',
    currentText: 'Hoje',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $.datepicker.setDefaults($.datepicker.regional['pt']);

  // Inicializa o multiDatesPicker
  $("#calendario").multiDatesPicker({
    dateFormat: 'dd/mm/yy',
    onSelect: function(dateText, inst) {
      selectedDates = $("#calendario").multiDatesPicker('getDates');
    }
  });

  // Exibe ou oculta o calendário quando o botão "Marcar Treino" é clicado
  $("#marcar-treino-btn").click(function() {
    $("#calendario").toggle();
  });

  // Captura o evento de submissão do formulário do modal
  $("#treinoForm").submit(function(event) {
    event.preventDefault();
    const nomeTreino = $("#nome-treino").val();
    selectedDates.forEach(date => {
      treinos[date] = nomeTreino;
    });
    alert('Treino ' + nomeTreino + ' marcado para as datas: ' + selectedDates.join(', '));
    $("#treinoModal").modal('hide');
    $("#nome-treino").val('');
    $("#calendario").multiDatesPicker('resetDates');
    selectedDates = [];
  });

  // Mostra o nome do treino para uma data específica
  $("#calendario").datepicker({
    onSelect: function(dateText, inst) {
      if (treinos[dateText]) {
        alert('Treino para ' + dateText + ': ' + treinos[dateText]);
      } else {
        alert('Nenhum treino marcado para ' + dateText);
      }
    }
  });
});



//minha ficha
document.addEventListener('DOMContentLoaded', function() {
  // Suponha que os dados foram obtidos do backend, por exemplo, via API
  const fichaData = {
    peso: "70",
    altura: "175",
    imc: "22.9",
    gordura: "15%",
    circunferencia: "85",
    antebraco: "30",
    biceps: "35",
    peito: "90",
    cintura: "80",
    gluteo: "95",
    quadriceps: "60",
    panturrilhas: "40"
  };

  // Preenche os dados na seção
  document.getElementById('peso').textContent = fichaData.peso;
  document.getElementById('altura').textContent = fichaData.altura;
  document.getElementById('imc').textContent = fichaData.imc;
  document.getElementById('gordura').textContent = fichaData.gordura;
  document.getElementById('circunferencia').textContent = fichaData.circunferencia;
  document.getElementById('antebraco').textContent = fichaData.antebraco;
  document.getElementById('biceps').textContent = fichaData.biceps;
  document.getElementById('peito').textContent = fichaData.peito;
  document.getElementById('cintura').textContent = fichaData.cintura;
  document.getElementById('gluteo').textContent = fichaData.gluteo;
  document.getElementById('quadriceps').textContent = fichaData.quadriceps;
  document.getElementById('panturrilhas').textContent = fichaData.panturrilhas;
});