const hamBurger = document.querySelector(".toggle-btn");
const mainSection = document.querySelector(".main");

hamBurger.addEventListener("click", function() {
  const sidebar = document.querySelector("#sidebar");
  sidebar.classList.toggle("expand");

  // Adicionar ou remover uma classe à seção principal
  mainSection.classList.toggle("sidebar-expand");
});

// Treinos

function openViewModal() {
  document.getElementById('view-modal').style.display = 'block';
}

function openModal() {
  // Selecione o formulário do modal
  const form = document.getElementById('formTreinamento');

  // Adicione um ouvinte de evento para o envio do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtenha os valores do formulário
    const nomeTreino = document.getElementById('nome-treino').value;
    const dataTreino = document.getElementById('data-treino').value;

    // Crie o HTML para o novo container de treinamento
    const novoTreinamentoHTML = `
            <div class="training-item">
                <div class="training-info">
                    <div class="training-name">${nomeTreino}</div>
                    <div class="training-date">Criado em: ${dataTreino}</div>
                </div>
                <div class="training-actions">
                <button type="button" class="btn btn-dark" id="editar-treino">Editar</button>
                <button class="view" data-id="1" >Visualizar</button>
                    <button class="delete">Apagar</button>
                </div>
            </div>
        `;

    // Selecione o elemento onde os treinamentos são listados
    const trainingList = document.querySelector('.training-list');

    // Insira o novo container de treinamento no DOM
    trainingList.insertAdjacentHTML('beforeend', novoTreinamentoHTML);

    // Feche o modal
    const modal = document.getElementById('modalTreinamento');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  });
}

//EXERCICIOS

function openExerciseModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeExerciseModal() {
  document.getElementById('modal').style.display = 'none';
}

function addExercise() {
  const exerciseList = document.getElementById('exercise-list');
  const exerciseItem = document.createElement('div');
  exerciseItem.classList.add('exercise-item');
  exerciseItem.innerHTML = `
        <div class="upload-image">
        <label for="file-upload" class="custom-file-upload">
        <i class="lni lni-plus"></i> Adicionar Arquivo
        </label>
        <input id="file-upload" type="file">
        </div>
        <div style="flex: 1;">
            <label>Nome do Exercício</label>
            <input type="text" placeholder="Nome do Exercício">
            <div class="exercise-row">
                <div>
                    <label>Série</label>
                    <input type="number" placeholder="Série">
                </div>
                <div>
                    <label>Repetição</label>
                    <input type="number" placeholder="Repetição">
                </div>
            </div>
            <label>Descrição</label>
            <textarea placeholder="Descrição do Exercício"></textarea>
            <label>Tempo de Descanso (segundos)</label>
            <input type="number" placeholder="Tempo de Descanso">
        </div>
        <button class="delete-exercise" onclick="deleteExercise(this)"><span class="delete-icon">&#128465;</span></button>
    `;
  exerciseList.appendChild(exerciseItem);
}

function deleteExercise(button) {
  const exerciseItem = button.parentElement;
  exerciseItem.remove();
}

function saveData() {
  // Aqui você pode enviar os dados para o servidor usando Ajax ou Fetch
  // Por exemplo, você pode serializar os dados do formulário e enviar para o servidor
  // Depois de receber uma resposta do servidor, você pode fechar o modal ou exibir uma mensagem de sucesso
  closeModal(); // Fechar o modal após salvar os dados
}

//visualizar o treino

$(document).ready(function() {
  // Aplicar máscara no campo de telefone
  $('#telefone-aluno').mask('(00) 0000-0000');
  $('#data-matricula').mask('00/00/0000')
  $('#data-treino').mask('00/00/0000')

  // Handler para adicionar ou editar aluno
  $('#formAluno').submit(function(e) {
    e.preventDefault();

    let alunoId = $('#aluno-id').val();
    let formData = new FormData(this);
    let isEditing = Boolean(alunoId);

    let student = {
      id: alunoId || Date.now(), // Use a timestamp for a temporary unique ID if creating a new student
      foto: URL.createObjectURL($('#foto-aluno')[0].files[0]),
      nome: $('#nome-aluno').val(),
      telefone: $('#telefone-aluno').val(),
      email: $('#email-aluno').val(),
      senha: $('#senha-aluno').val(),
      treino: $('#treino-aluno').val(),
      matricula: $('#matricula-aluno').val()
    };

    if (isEditing) {
      updateStudentInList(student);
    } else {
      addStudentToList(student);
    }

    $('#modalAluno').modal('hide');
    $('#formAluno')[0].reset();
    $('#modalAlunoLabel').text('Novo Aluno');
    $('#aluno-id').val('');
  });

  // Função para adicionar aluno na lista
  function addStudentToList(student) {
    let studentItem = `
            <div class="student-item" data-id="${student.id}">
                <div class="student-info">
                <div class="card">
                     <h2>Aluno</h2>
                     <img src="${student.foto}" alt="Foto do Aluno" class="user-photo">
                </div>
                    <div class="student-details">
                        <button class="btn btn-danger delete-student" data-id="${student.id}"><span class="delete-icon">&#128465;</span></button>
                        <div class="student-name">${student.nome}</div>
                        <div class="student-phone">Telefone: ${student.telefone}</div>
                        <div class="student-email">Email: ${student.email}</div>
                        <div class="student-matricula">Data de Matrícula: ${student.matricula}</div>
                    </div>
                </div>
                <div class="student-actions">
                    <button class="add-tip" data-bs-toggle="modal" data-bs-target="#modalDicas" data-id="${student.id}">Adicionar Dicas</button>
                    <button class="view-training" data-id="${student.id}">Ver Treino</button>
                    <button class="edit-student" data-id="${student.id}">Editar</button>
                    <button class="btn btn-secondary view-ficha" data-bs-toggle="modal" data-bs-target="#modalFicha" data-id="${student.id}" id="open-ficha-modal">Ficha de Avaliação</button>
                </div>
            </div>
        `;
    $('.student-list').append(studentItem);
  }

  // Função para atualizar aluno na lista
  function updateStudentInList(student) {
    let studentItem = $(`.student-item[data-id='${student.id}']`);
    studentItem.find('.student-info .user-photo').attr('src', student.foto);
    studentItem.find('.student-details .student-name').text(student.nome);
    studentItem.find('.student-details .student-phone').text(`Telefone: ${student.telefone}`);
    studentItem.find('.student-details .student-email').text(`Email: ${student.email}`);
    studentItem.find('.student-details .student-matricula').text(`Data de Matrícula: ${student.matricula}`);
  }

  // Handler para editar aluno
  $(document).on('click', '.edit-student', function() {
    let studentItem = $(this).closest('.student-item');
    let student = {
      id: studentItem.data('id'),
      foto: studentItem.find('.user-photo').attr('src'),
      nome: studentItem.find('.student-name').text(),
      telefone: studentItem.find('.student-phone').text().replace('Telefone: ', ''),
      email: studentItem.find('.student-email').text().replace('Email: ', ''),
      matricula: studentItem.find('.student-matricula').text().replace('Data de Matrícula: ', '')
    };

    $('#aluno-id').val(student.id);
    $('#modalAlunoLabel').text('Editar Aluno');
    // Here we should not set the file input value directly for security reasons
    $('#foto-aluno').val(student.foto);
    $('#nome-aluno').val(student.nome);
    $('#telefone-aluno').val(student.telefone).mask('(00) 0000-0000');
    $('#email-aluno').val(student.email);
    $('#senha-aluno').val('');
    $('#treino-aluno').val(student.treino); // Assuming we store and set treino data correctly
    $('#matricula-aluno').val(student.matricula);
    $('#modalAluno').modal('show');
  });

  // Handler para excluir aluno
  $(document).on('click', '.delete-student', function() {
    let studentId = $(this).data('id');
    $(`.student-item[data-id='${studentId}']`).remove();
  });

  // Handler para abrir o modal de ficha de avaliação
  $(document).on('click', '#open-ficha-modal', function() {
    let studentId = $(this).data('id');
    $('#aluno-id-ficha').val(studentId);
    $('#modalFichaLabel').text('Ficha de Avaliação');
    $('#formFicha')[0].reset();
    $('#modalFicha').modal('show');
  });

  // Handler para salvar ficha de avaliação
  $('#salvarFicha').click(function() {
    let studentId = $('#aluno-id-ficha').val();
    let peso = $('#peso').val();
    let altura = $('#altura').val();
    let imc = $('#imc').val();
    let gordura = $('#gordura').val();
    let circunferencia = $('#circunferencia').val();
    let antebraco = $('#antebraco').val();
    let biceps = $('#biceps').val();
    let peito = $('#peito').val();
    let cintura = $('#cintura').val();
    let gluteo = $('#gluteo').val();
    let quadriceps = $('#quadriceps').val();
    let panturrilhas = $('#panturrilhas').val();

    // Aqui você pode fazer o que desejar com os dados da ficha de avaliação,
    // como enviar para o backend ou realizar operações no frontend
    customAlert('Ficha de Avaliação salva com sucesso!');
    $('#modalFicha').modal('hide');
  });

  // Função para exibir mensagem customizada
  function customAlert(message) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3bac1e',
      customClass: {
        icon: 'custom-icon',
        confirmButton: 'custom-button'
      },
      buttonsStyling: false
    });
  }
});