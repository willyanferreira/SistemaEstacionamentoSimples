const PLACA = document.getElementById("cadastrar");
const PLACAS = [];
const HORARIOS = [];
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

// ACESSANDO O BTN QUE ENCERRA A SESSÃO
const ENCERRAR = document.getElementById('encerrarSessao');

// ACESSANDO O BTN LIBERAR
const LIBERAR = document.getElementById('liberar')

// CHECANDO O LENGTH DO LOCALSTORAGE E CRIANDO O OBJETO PLACAS, SE JÁ EXISTIR RECUPERANDO OS ELEMENTOS.
if (localStorage.length == 2) {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
} else if (localStorage.length == 0) {
    LISTA_NAVEGACAO[0].style.display = 'none';
    LISTA_NAVEGACAO[1].style.display = 'none';
    LISTA_NAVEGACAO[2].style.display = 'none';
    ENCERRAR.style.display = 'none';
    localStorage.setItem("placas", PLACAS);
    localStorage.setItem("horarios", HORARIOS);
    localStorage.removeItem("placas", PLACAS[0]);
    localStorage.removeItem("horarios", HORARIOS[0]);
    DADOS_OPERACAO.style.display = 'block';
} else if (localStorage.getItem("placas", PLACAS) == '') {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    localStorage.removeItem("placas", PLACAS[0]);
    localStorage.removeItem("horarios", HORARIOS[0]);
} else {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    const RECUPERANDo_PLACAS = localStorage.placas.split(',');
    const RECUPERANDo_HORARIOS = localStorage.horarios.split(',');
    for (let x = 0; x < RECUPERANDo_PLACAS.length; x++) {
        PLACAS[x] = RECUPERANDo_PLACAS[x];
        HORARIOS[x] = RECUPERANDo_HORARIOS[x];
    }
}

const MSG_SECTION_CADASTRAR = document.getElementById('msgCadastrar');
const MSG_SECTION_LIBERAR = document.getElementById('msgLiberar');
const MSG_LIBERADO = document.getElementById('msgLiberado');
const MSG_OPERADOR_TARIFA = document.getElementById('msgOperadorTarifa');

function removeAvisoSpan() {
    MSG_SECTION_CADASTRAR.style.display = 'none';
    MSG_SECTION_LIBERAR.style.display = 'none';
    MSG_LIBERADO.style.display = 'none';
    MSG_OPERADOR_TARIFA.style.display = 'none';
    INFORMAR_OPERADOR.style.boxShadow = 'none';
    INFORMAR_OPERADOR.style.border = '1px solid #cecece';
    INFORMAR_TARIFA.style.boxShadow = 'none';
    INFORMAR_TARIFA.style.border = '1px solid #cecece';
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
        HORARIOS.push(new Date().toLocaleTimeString());
        localStorage.setItem('placas', PLACAS);
        localStorage.setItem('horarios', HORARIOS);
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
    for (let x = 0; x < PLACAS.length; x++) {
        LISTAR_PLACAS.innerHTML += `<li>${PLACAS[x]} - ${HORARIOS[x]}</li>`;
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
        DIV2ETAPA.style.border = '1px solid green';
        DIV2ETAPA.style.color = 'black';

    }
    // return REMOVER_VEICULOS.value;
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
            LIBERAR.removeAttribute('disabled');
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
            ExibirVeiculos()
        }
    })
}

// ENCERRAR SESSÃO
ENCERRAR.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

// RECUPERANDO OPERADOR E TARIFA
CONFIRMAR_DADOS.addEventListener('click', () => {
    if (INFORMAR_OPERADOR.value == '' && INFORMAR_TARIFA.value == '') {
        INFORMAR_OPERADOR.style.boxShadow = '0px 0px 10px red';
        INFORMAR_OPERADOR.style.border = '1px solid red';
        INFORMAR_TARIFA.style.boxShadow = '0px 0px 10px red';
        INFORMAR_TARIFA.style.border = '1px solid red';
        MSG_OPERADOR_TARIFA.style.display = 'block';
        MSG_OPERADOR_TARIFA.style.color = 'red';
        MSG_OPERADOR_TARIFA.style.fontSize = '13px';
        MSG_OPERADOR_TARIFA.style.margin = '10px 0 10px 0';
        MSG_OPERADOR_TARIFA.innerHTML = 'Informe o nome do operador e tarifa';
    }else if(INFORMAR_OPERADOR.value == ''){
        INFORMAR_OPERADOR.style.boxShadow = '0px 0px 10px red';
        INFORMAR_OPERADOR.style.border = '1px solid red';
        MSG_OPERADOR_TARIFA.style.display = 'block';
        MSG_OPERADOR_TARIFA.style.color = 'red';
        MSG_OPERADOR_TARIFA.style.fontSize = '13px';
        MSG_OPERADOR_TARIFA.style.margin = '10px 0 10px 0';
        MSG_OPERADOR_TARIFA.innerHTML = 'Informe o nome do operador';
    }else if(INFORMAR_TARIFA.value == ''){
        INFORMAR_TARIFA.style.boxShadow = '0px 0px 10px red';
        INFORMAR_TARIFA.style.border = '1px solid red';
        MSG_OPERADOR_TARIFA.style.display = 'block';
        MSG_OPERADOR_TARIFA.style.color = 'red';
        MSG_OPERADOR_TARIFA.style.fontSize = '13px';
        MSG_OPERADOR_TARIFA.style.margin = '10px 0 10px 0';
        MSG_OPERADOR_TARIFA.innerHTML = 'Informe a tarifa';
    } else {
        localStorage.setItem('operador', INFORMAR_OPERADOR.value);
        localStorage.setItem('tarifa', INFORMAR_TARIFA.value);
        DADOS_OPERACAO.style.display = 'none';
        OPERADOR.innerHTML = localStorage.getItem('operador');
        TARIFA.innerHTML = localStorage.getItem('tarifa');
        LISTA_NAVEGACAO[0].style.display = 'flex';
        LISTA_NAVEGACAO[1].style.display = 'flex';
        LISTA_NAVEGACAO[2].style.display = 'flex';
        ENCERRAR.style.display = 'block';
    }
    setTimeout(removeAvisoSpan, 2000);
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

LIBERAR.addEventListener('click', () => {
    const DELETAR_INDEX = PLACAS.indexOf(REMOVER_VEICULOS.value.toUpperCase());
    delete PLACAS[DELETAR_INDEX];
    delete HORARIOS[DELETAR_INDEX];
    PLACAS[DELETAR_INDEX] = PLACAS[0];
    HORARIOS[DELETAR_INDEX] = HORARIOS[0];
    PLACAS.shift();
    HORARIOS.shift();
    localStorage.setItem('placas', PLACAS);
    localStorage.setItem('horarios', HORARIOS);
    REMOVER_VEICULOS.value = "";
    MSG_LIBERADO.style.display = 'block';
    MSG_LIBERADO.style.color = 'green';
    MSG_LIBERADO.style.fontSize = '18px';
    MSG_LIBERADO.innerHTML = 'Veículo liberado com sucesso';
    setTimeout(removeAvisoSpan, 2000);
    DIV3ETAPA.style.backgroundColor = 'green';
    LIBERAR.setAttribute('disabled', 'on');
})