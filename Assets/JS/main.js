const PLACA = document.getElementById("cadastrar");
const PLACAS = [];
const LISTAR_PLACAS = document.getElementById("exibirVeiculos");

// RECUPERANDO OS INTENS DA NAVEGAÇÃO
const LISTA_NAVEGACAO = document.getElementsByClassName('listaNavegacao');

// RECUPERANDO OPERADOR E TARIFA
const DADOS_OPERACAO = document.getElementById('informaNomeTarifa');
const INFORMAR_OPERADOR = document.getElementById('informarOperador');
const INFORMAR_TARIFA = document.getElementById('informarTarifa');
const CONFIRMAR_DADOS = document.getElementById('confirmarDadosIniciais');
const OPERADOR = document.getElementById('recuperarOperador');
const TARIFA = document.getElementById('recuperarTarifa');

// CHECANDO O LENGTH DO LOCALSTORAGE E CRIANDO O OBJETO PLACAS, SE JÁ EXISTIR RECUPERANDO OS ELEMENTOS.
if (localStorage.length == 2) {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
} else if (localStorage.length == 0) {
    LISTA_NAVEGACAO[0].style.display = 'none';
    LISTA_NAVEGACAO[1].style.display = 'none';
    LISTA_NAVEGACAO[2].style.display = 'none';
    localStorage.setItem("placas", PLACAS);
    localStorage.removeItem("placas", PLACAS[0]);
    DADOS_OPERACAO.style.display = 'block';
} else if (localStorage.getItem("placas", PLACAS) == '') {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    localStorage.removeItem("placas", PLACAS[0]);
} else {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    const RECUPERANDo_PLACAS = localStorage.placas.split(',');
    for (let x = 0; x < RECUPERANDo_PLACAS.length; x++) {
        PLACAS[x] = RECUPERANDo_PLACAS[x];
    }
}

const MSG_SECTION_CADASTRAR = document.getElementById('msgCadastrar');
const MSG_SECTION_LIBERAR = document.getElementById('msgLiberar');
const MSG_LIBERADO = document.getElementById('msgLiberado');

function removeAvisoSpan() {
    MSG_SECTION_CADASTRAR.style.display = 'none';
    MSG_SECTION_LIBERAR.style.display = 'none';
    MSG_LIBERADO.style.display = 'none';
}

function CadastrarVeiculo() {

    if (PLACAS.includes(PLACA.value.toUpperCase())) {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.style.color = 'red';
        MSG_SECTION_CADASTRAR.style.fontSize = '18px';
        MSG_SECTION_CADASTRAR.innerHTML = 'Veículo já cadastrado';
    } else if (PLACA.value == "") {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.style.color = 'red';
        MSG_SECTION_CADASTRAR.style.fontSize = '18px';
        MSG_SECTION_CADASTRAR.innerHTML = 'Digite uma placa';
    } else if (PLACA.value.length != 7) {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.style.color = 'red';
        MSG_SECTION_CADASTRAR.style.fontSize = '18px';
        MSG_SECTION_CADASTRAR.innerHTML = 'Placa inválida';
    } else {
        PLACAS.push(PLACA.value.toUpperCase());
        localStorage.setItem('placas', PLACAS);
        PLACA.value = "";
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.style.color = 'green';
        MSG_SECTION_CADASTRAR.style.fontSize = '18px';
        MSG_SECTION_CADASTRAR.innerHTML = 'veículo cadastrado com sucesso';
    }
    setTimeout(removeAvisoSpan, 2000);

}

function ExibirVeiculos() {
    LISTAR_PLACAS.innerHTML = '';
    for (let x = 0; x < PLACAS.sort().length; x++) {
        LISTAR_PLACAS.innerHTML += `<li>${PLACAS[x]}</li>`;
    }
    // LISTAR_PLACAS.style.display = 'block';
}

function OcultarVeiculos() {
    LISTA_NAVEGACAO[2].style.background = '#363636';
    LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
    document.getElementById('exibirVeiculo').style.display = 'none';
}

const REMOVER_VEICULOS = document.getElementById('remover')
const SPAN_VEICULO = document.getElementById('veiculo');
const TEMPO_ESTACIONADO = document.getElementById('tempoEstacionado');
const DIV_ETAPAS = document.getElementById('etapas');
const CADASTRAR_VEICULO = document.getElementById('cadastrarVeiculo');
const LIBERAR_VEICULO = document.getElementById('liberarVeiculo');
const EXIBIR_VEICULO = document.getElementById('exibirVeiculo');
const DIV1ETAPA = document.getElementById('div1');
const DIV2ETAPA = document.getElementById('div2');
const DIV3ETAPA = document.getElementById('div3');
const CONTAINER_ETAPA2 = document.getElementById('etapa2');
const CONTAINER_ETAPA3 = document.getElementById('etapa3');

function ProcurarVeiculo() {
    const PROCURAR_INDEX = PLACAS.indexOf(REMOVER_VEICULOS.value.toUpperCase());
    if (REMOVER_VEICULOS.value == '') {
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Digite uma placa';
    } else if (REMOVER_VEICULOS.value.length != 7) {
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Placa inválida';
    } else if (PROCURAR_INDEX < 0) {
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Veículo não localizado';
    } else {

        LIBERAR_VEICULO.style.display = 'none';
        CONTAINER_ETAPA2.style.display = 'block';
        SPAN_VEICULO.innerHTML = REMOVER_VEICULOS.value.toUpperCase();
        DIV1ETAPA.classList.add('divEtapaOK');
        DIV1ETAPA.style.backgroundColor = 'green';
        DIV2ETAPA.style.border= '1px solid green';
        DIV2ETAPA.style.color = 'black';

    }
    return REMOVER_VEICULOS.value;
    setTimeout(removeAvisoSpan, 2000);
}

// EXIBINDO O CONTEÚDO DE ACORDO COM OPÇÃO ESCOLHIDA NA NAVEGAÇÃO

for (let x = 0; x < LISTA_NAVEGACAO.length; x++) {
    LISTA_NAVEGACAO[x].addEventListener('click', () => {
        if (LISTA_NAVEGACAO[x].innerHTML == 'Cadastrar') {
            LISTA_NAVEGACAO[1].style.background = '#363636';
            LISTA_NAVEGACAO[2].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[1].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            DIV_ETAPAS.style.display = 'none';
            LIBERAR_VEICULO.style.display = 'none';
            EXIBIR_VEICULO.style.display = 'none';
            CONTAINER_ETAPA2.style.display = 'none';
            CONTAINER_ETAPA3.style.display = 'none';
            CADASTRAR_VEICULO.style.display = 'flex';
            DIV1ETAPA.classList.remove('divEtapaOK');
            DIV2ETAPA.classList.remove('divEtapaOK');
            DIV1ETAPA.style.border = '1px solid green';
            DIV2ETAPA.style.border = '1px solid #cecece';
            DIV3ETAPA.style.border = '1px solid #cecece';
            DIV1ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.backgroundColor = 'transparent';
            DIV3ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.color = '#cecece';    
            DIV3ETAPA.style.color = '#cecece';

        }
        if (LISTA_NAVEGACAO[x].innerHTML == 'Liberar') {
            LISTA_NAVEGACAO[0].style.background = '#363636';
            LISTA_NAVEGACAO[2].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[0].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            DIV_ETAPAS.style.display = 'flex';
            DIV1ETAPA.style.border = '1px solid green';
            DIV1ETAPA.style.color = 'black';
            CADASTRAR_VEICULO.style.display = 'none';
            EXIBIR_VEICULO.style.display = 'none';
            CONTAINER_ETAPA2.style.display = 'none';
            CONTAINER_ETAPA3.style.display = 'none';
            LIBERAR_VEICULO.style.display = 'flex';
            DIV1ETAPA.classList.remove('divEtapaOK');
            DIV2ETAPA.classList.remove('divEtapaOK');
            DIV2ETAPA.style.border = '1px solid #cecece';
            DIV3ETAPA.style.border = '1px solid #cecece';
            DIV1ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.backgroundColor = 'transparent';
            DIV3ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.color = '#cecece';    
            DIV3ETAPA.style.color = '#cecece';
        }
        if (LISTA_NAVEGACAO[x].innerHTML == 'Exibir') {
            LISTA_NAVEGACAO[0].style.background = '#363636';
            LISTA_NAVEGACAO[1].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[0].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[1].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            DIV_ETAPAS.style.display = 'none';
            CADASTRAR_VEICULO.style.display = 'none';
            LIBERAR_VEICULO.style.display = 'none';
            CONTAINER_ETAPA2.style.display = 'none';
            CONTAINER_ETAPA3.style.display = 'none';
            EXIBIR_VEICULO.style.display = 'block';
            DIV1ETAPA.classList.remove('divEtapaOK');
            DIV2ETAPA.classList.remove('divEtapaOK');
            DIV1ETAPA.style.border = '1px solid green';
            DIV2ETAPA.style.border = '1px solid #cecece';
            DIV3ETAPA.style.border = '1px solid #cecece';
            DIV1ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.backgroundColor = 'transparent';
            DIV3ETAPA.style.backgroundColor = 'transparent';
            DIV2ETAPA.style.color = '#cecece';    
            DIV3ETAPA.style.color = '#cecece';
            ExibirVeiculos()
        }
    })
}

// RECUPERANDO OPERADOR E TARIFA
CONFIRMAR_DADOS.addEventListener('click', () => {
    localStorage.setItem('operador', INFORMAR_OPERADOR.value);
    localStorage.setItem('tarifa', INFORMAR_TARIFA.value);
    DADOS_OPERACAO.style.display = 'none';
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    LISTA_NAVEGACAO[0].style.display = 'flex';
    LISTA_NAVEGACAO[1].style.display = 'flex';
    LISTA_NAVEGACAO[2].style.display = 'flex';
})

const CONFIRMACAO_VEICULO = document.getElementById('confirmacaoVeiculo');
const CONFIRMACAO_TEMPO_ESTACIONADO = document.getElementById('confirmacaoTempoEstacionado');
const VALOR_TOTAL = document.getElementById('valorTotal');

const AVANCAR = document.getElementById('avancar').addEventListener('click', () => {
    CONTAINER_ETAPA2.style.display = 'none';
    CONTAINER_ETAPA3.style.display = 'block';
    CONFIRMACAO_VEICULO.innerHTML = SPAN_VEICULO.innerHTML;
    CONFIRMACAO_TEMPO_ESTACIONADO.innerHTML = TEMPO_ESTACIONADO.value
    VALOR_TOTAL.innerHTML = (CONFIRMACAO_TEMPO_ESTACIONADO.innerHTML * TARIFA.innerHTML).toFixed(2);
    DIV2ETAPA.style.backgroundColor = 'green';
    DIV2ETAPA.style.color = 'black';
    DIV2ETAPA.classList.add('divEtapaOK');
    DIV3ETAPA.style.border = '1px solid green';
    DIV3ETAPA.style.color = 'black';
})

const LIBERAR = document.getElementById('liberar').addEventListener('click', () => {
    const DELETAR_INDEX = PLACAS.indexOf(REMOVER_VEICULOS.value.toUpperCase());
    delete PLACAS[DELETAR_INDEX];
    PLACAS[DELETAR_INDEX] = PLACAS[0];
    PLACAS.shift();
    localStorage.setItem('placas', PLACAS);
    REMOVER_VEICULOS.value = "";
    MSG_LIBERADO.style.display = 'block';
    MSG_LIBERADO.style.color = 'green';
    MSG_LIBERADO.style.fontSize = '18px';
    MSG_LIBERADO.innerHTML = 'Veículo liberado com sucesso';
    setTimeout(removeAvisoSpan, 2000);
    DIV3ETAPA.style.backgroundColor = 'green';
})