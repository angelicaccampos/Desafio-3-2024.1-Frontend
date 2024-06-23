// Redireciona o usuário para a página index.html
function showHome() {
    window.location.href = "index.html";
}

// Manipulação do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM pelos seus IDs da main
    const selecaoEstado = document.getElementById('selecaoUF');
    const coluna1 = document.getElementById('municipios1');
    const coluna2 = document.getElementById('municipios2');
    const coluna3 = document.getElementById('municipios3');

    // Função para obter os estados (UF)
    function obterEstados() {
        // Requisições http para a api
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            // Converte as respostas da API em JSON
            .then(resposta => resposta.json())
            .then(estados => {
                estados.forEach(estado => {
                    // Cria um elemento <option> para cada estado
                    const opcao = document.createElement('option');
                    opcao.value = estado.sigla; // Define o valor da opção
                    opcao.textContent = estado.sigla; // Define o texto da opção
                    selecaoEstado.appendChild(opcao);
                });
            });
    }

    // Função para obter os municípios de um estado específico
    function obterMunicipios(ufSigla) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`)
            .then(resposta => resposta.json())
            .then(municipios => {
                // Limpar as colunas antes de adicionar novos municípios
                coluna1.innerHTML = '';
                coluna2.innerHTML = '';
                coluna3.innerHTML = '';

                // Adiciona cada município à sua respectiva coluna
                municipios.forEach((municipio, indice) => {
                    const divMunicipio = document.createElement('div');
                    divMunicipio.textContent = municipio.nome;

                    // Distribuir os municípios nas colunas, comçando em zero até dois
                    if (indice % 3 === 0) {
                        coluna1.appendChild(divMunicipio);
                    } else if (indice % 3 === 1) {
                        coluna2.appendChild(divMunicipio);
                    } else {
                        coluna3.appendChild(divMunicipio);
                    }
                });
                
            });
    }

    // Evento para detectar mudança na seleção do estado (UF)
    selecaoEstado.addEventListener('change', () => {
        const ufSelecionada = selecaoEstado.value; // Obtém o valor selecionado
        obterMunicipios(ufSelecionada); // Chama a função obterMunicipios para obter os municípios do estado já selecionado
    });

    // Iniciar obtendo os estados
    obterEstados();
});
