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
if(localStorage.length == 2){
    alert(`Bem vindo de volta ${localStorage.getItem('operador')}`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
}else if (localStorage.length == 0 ) {
    LISTA_NAVEGACAO[0].style.display = 'none';
    LISTA_NAVEGACAO[1].style.display = 'none';
    LISTA_NAVEGACAO[2].style.display = 'none';
    localStorage.setItem("placas", PLACAS);
    localStorage.removeItem("placas", PLACAS[0]);
    DADOS_OPERACAO.style.display = 'block';
}else if(localStorage.getItem("placas", PLACAS) == ''){
    alert(`Bem vindo de volta ${localStorage.getItem('operador')} estou limpando o array`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    localStorage.removeItem("placas", PLACAS[0]);
} else {
    alert(`Bem vindo de volta ${localStorage.getItem('operador')} sou o else`)
    OPERADOR.innerHTML = localStorage.getItem('operador');
    TARIFA.innerHTML = localStorage.getItem('tarifa');
    const RECUPERANDo_PLACAS = localStorage.placas.split(',');
    for(let x = 0; x < RECUPERANDo_PLACAS.length; x++){
        PLACAS[x] = RECUPERANDo_PLACAS[x];
    }
}

const MSG_SECTION_CADASTRAR = document.getElementById('msgCadastrar');
const MSG_SECTION_LIBERAR = document.getElementById('msgLiberar');

function removeAvisoSpan(){
    document.getElementById('msgCadastrar').style.display = 'none';
    document.getElementById('msgLiberar').style.display = 'none';
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

function ExibirVeiculos(){
    LISTAR_PLACAS.innerHTML = '';
    for(let x = 0; x < PLACAS.sort().length; x++){
        LISTAR_PLACAS.innerHTML += `<li>${PLACAS[x]}</li>`;
    }
    // LISTAR_PLACAS.style.display = 'block';
}

function OcultarVeiculos(){
    LISTA_NAVEGACAO[2].style.background = '#363636';
    LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
    document.getElementById('exibirVeiculo').style.display='none';
}

const REMOVER_VEICULOS = document.getElementById('remover')
function RemoverVeiculo(){
    const DELETAR_INDEX = PLACAS.indexOf(REMOVER_VEICULOS.value.toUpperCase());
    if(REMOVER_VEICULOS.value == ''){
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Digite uma placa';
    }else if(REMOVER_VEICULOS.value.length != 7){
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Placa inválida';
    }else if(DELETAR_INDEX < 0){
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'red';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Veículo não localizado';
    }else{
        delete PLACAS[DELETAR_INDEX];
        PLACAS[DELETAR_INDEX] = PLACAS[0];
        PLACAS.shift();
        localStorage.setItem('placas', PLACAS);
        REMOVER_VEICULOS.value = "";
        MSG_SECTION_LIBERAR.style.display = 'block';
        MSG_SECTION_LIBERAR.style.color = 'green';
        MSG_SECTION_LIBERAR.style.fontSize = '18px';
        MSG_SECTION_LIBERAR.innerHTML = 'Veículo liberado';
    }
    setTimeout(removeAvisoSpan, 2000);
}

// EXIBINDO O CONTEÚDO DE ACORDO COM OPÇÃO ESCOLHIDA NA NAVEGAÇÃO
for(let x = 0; x < LISTA_NAVEGACAO.length; x++){
    LISTA_NAVEGACAO[x].addEventListener('click', () => {
        if(LISTA_NAVEGACAO[x].innerHTML == 'Cadastrar'){
            LISTA_NAVEGACAO[1].style.background = '#363636';
            LISTA_NAVEGACAO[2].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[1].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            document.getElementById('liberarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='none';
            document.getElementById('cadastrarVeiculo').style.display='flex';
        }
        if(LISTA_NAVEGACAO[x].innerHTML == 'Liberar'){
            LISTA_NAVEGACAO[0].style.background = '#363636';
            LISTA_NAVEGACAO[2].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[0].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[2].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            document.getElementById('cadastrarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='none';
            document.getElementById('liberarVeiculo').style.display='flex';
        }
        if(LISTA_NAVEGACAO[x].innerHTML == 'Exibir'){
            LISTA_NAVEGACAO[0].style.background = '#363636';
            LISTA_NAVEGACAO[1].style.background = '#363636';
            LISTA_NAVEGACAO[x].style.background = 'linen';
            LISTA_NAVEGACAO[0].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[1].style.borderBottom = '1px solid #363636';
            LISTA_NAVEGACAO[x].style.borderBottom = '1px solid linen';
            document.getElementById('cadastrarVeiculo').style.display='none';
            document.getElementById('liberarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='block';
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