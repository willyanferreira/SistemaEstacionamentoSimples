const PLACA = document.getElementById("cadastrar");
const PLACAS = [];
const LISTAR_PLACAS = document.getElementById("exibirVeiculos");

// CHECANDO O LENGTH DO LOCALSTORAGE E CRIANDO O OBJETO PLACAS, SE JÁ EXISTIR RECUPERANDO OS ELEMENTOS.
if (localStorage.length == 0 ) {
    localStorage.setItem("placas", PLACAS);
    localStorage.removeItem("placas", PLACAS[0]);
}else if(localStorage.getItem("placas", PLACAS) == ''){
    localStorage.removeItem("placas", PLACAS[0]);
} else {
    const RECUPERANDo_PLACAS = localStorage.placas.split(',');
    for(let x = 0; x < RECUPERANDo_PLACAS.length; x++){
        PLACAS[x] = RECUPERANDo_PLACAS[x];
    }
}

const MSG_SECTION_CADASTRAR = document.getElementById('msgCadastrar');
const MSG_SECTION_LIBERAR = document.getElementById('msgLiberar');

function removeAvisoSpan(){
    document.getElementById('msgCadastrar').style.display = 'none';
}

function CadastrarVeiculo() {

    if (PLACAS.includes(PLACA.value.toUpperCase())) {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.innerHTML = 'Veículo já cadastrado';
        setTimeout(removeAvisoSpan, 2000);
    } else if (PLACA.value == "") {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.innerHTML = 'Digite uma placa';
        setTimeout(removeAvisoSpan, 2000);
    } else if (PLACA.value.length != 7) {
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.innerHTML = 'Placa inválida';
        setTimeout(removeAvisoSpan, 2000);
    } else {
        PLACAS.push(PLACA.value.toUpperCase());
        localStorage.setItem('placas', PLACAS);
        PLACA.value = "";
        MSG_SECTION_CADASTRAR.style.display = 'block';
        MSG_SECTION_CADASTRAR.innerHTML = 'veículo cadastrado com sucesso';
        setTimeout(removeAvisoSpan(), 2000);
    }

}

function ExibirVeiculos(){
    LISTAR_PLACAS.innerHTML = '';
    for(let x = 0; x < PLACAS.sort().length; x++){
        LISTAR_PLACAS.innerHTML += `<li>${PLACAS[x]}</li>`;
    }
    LISTAR_PLACAS.style.display = 'block';
}

function OcultarVeiculos(){
    // LISTAR_PLACAS.style.display = 'none';
    document.getElementById('exibirVeiculo').style.display='none';
}

const REMOVER_VEICULOS = document.getElementById('remover')
function RemoverVeiculo(){
    const DELETAR_INDEX = PLACAS.indexOf(REMOVER_VEICULOS.value.toUpperCase());
    if(REMOVER_VEICULOS.value == ''){
        console.log('Digite uma placa');
    }else if(REMOVER_VEICULOS.value.length != 7){
        console.log('Placa inválida')
    }else if(DELETAR_INDEX < 0){
        console.log('Veículo não localizado');
    }else{
        delete PLACAS[DELETAR_INDEX];
        PLACAS[DELETAR_INDEX] = PLACAS[0];
        PLACAS.shift();
        console.log('Veículo liberado');
        localStorage.setItem('placas', PLACAS);
        console.log(localStorage);
        REMOVER_VEICULOS.value = "";
    }
}

// EXIBINDO O CONTEÚDO DE ACORDO COM OPÇÃO ESCOLHIDA NA NAVEGAÇÃO

const LISTA_NAVEGACAO = document.getElementsByClassName('listaNavegacao');
console.log(LISTA_NAVEGACAO);
for(let x = 0; x < LISTA_NAVEGACAO.length; x++){
    LISTA_NAVEGACAO[x].addEventListener('click', () => {
        if(LISTA_NAVEGACAO[x].innerHTML == 'Cadastrar'){
            document.getElementById('liberarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='none';
            document.getElementById('cadastrarVeiculo').style.display='flex';
        }
        if(LISTA_NAVEGACAO[x].innerHTML == 'Liberar'){
            document.getElementById('cadastrarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='none';
            document.getElementById('liberarVeiculo').style.display='flex';
        }
        if(LISTA_NAVEGACAO[x].innerHTML == 'Exibir'){
            document.getElementById('cadastrarVeiculo').style.display='none';
            document.getElementById('liberarVeiculo').style.display='none';
            document.getElementById('exibirVeiculo').style.display='block';
            ExibirVeiculos()
        }
    })
}