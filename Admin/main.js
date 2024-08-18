const hamBurger = document.querySelector(".toggle-btn");
const mainSection = document.querySelector(".main");

hamBurger.addEventListener("click", function () {
  const sidebar = document.querySelector("#sidebar");
  sidebar.classList.toggle("expand");
  
  // Adicionar ou remover uma classe à seção principal
  mainSection.classList.toggle("sidebar-expand");
});




  
//=============================ADMINISTRAÇÃO=======================





//pesquisa de nome

$(document).ready(function() {
    // Função para adicionar um novo funcionário
    $('#formCadastrarFuncionario').on('submit', function(event) {
        event.preventDefault();

        // Pega os valores do formulário
        const nome = $('#nome-funcionario').val();
        const email = $('#email-funcionario').val();
        const senha = $('#senha-funcionario').val();
        const chaveAcesso = $('#chave-acesso-funcionario').val();
        const funcao = $('#funcao-funcionario').val();

        // Adiciona uma nova linha na tabela de funcionários
        const newRow = `
            <tr>
                <td>${new Date().getTime()}</td>
                <td>${nome}</td>
                <td>${email}</td>
                <td>${'*'.repeat(senha.length)}</td>
                <td>${chaveAcesso}</td>
                <td>${funcao}</td>
                <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i> Apagar
                    </button>
                </td>
            </tr>
        `;
        $('#funcionarios-list').append(newRow);

        // Reseta o formulário e fecha o modal
        $('#formCadastrarFuncionario')[0].reset();
        $('#modalCadastrarFuncionario').modal('hide');
    });

    // Função de busca para Alunos
    $('#search-alunos').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        $('#alunos-list tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Função de busca para Funcionários
    $('#search-funcionarios').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        $('#funcionarios-list tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});