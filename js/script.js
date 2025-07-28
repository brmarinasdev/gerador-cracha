//Seleciona os elementos do formulário
const radio01 = document.getElementById('radio01');
const radio02 = document.getElementById('radio02');
const radio03 = document.getElementById('radio03');
const inputFoto = document.getElementById('input-foto');
const inputNome = document.getElementById('input-nome');
const inputMatricula = document.getElementById('input-matricula');
const botaoBaixar = document.getElementById('baixar');
const botaoImprimir = document.getElementById('print');
const apagaFoto = document.querySelector('#input-foto');
const apagaNome = document.querySelector('#input-nome');
const apagaMatricula = document.querySelector('#input-matricula');

//Seleciona os elementos do crachá
const cracha = document.querySelector('.cracha');
const crachaFoto = document.getElementById('cracha-foto');
const crachaFotoBrigadista = document.getElementById('cracha-foto-brigadista');
const crachaNome = document.getElementById('cracha-nome');
const crachaMatricula = document.getElementById('cracha-matricula');
const crachaGeral = document.getElementById('brm');
const crachaJL = document.getElementById('brmjl');
const crachaBrigadista = document.getElementById('brmbrig');

//Atualiza os elementos no crachá em tempo real
inputFoto.addEventListener('change', () => {
  const foto = inputFoto.files[0];
  if (foto) {
    const reader = new FileReader();
    reader.readAsDataURL(foto);
    reader.onload = (event) => {
      crachaFoto.src = event.target.result;
      crachaFotoBrigadista.src = event.target.result;
    }
  }
});

//Verifica se a primeira opção está marcada
function verificaRadio() {
  if(radio01.checked) {
    crachaGeral.style.display = "block"; 
    crachaJL.style.display = "none";
    crachaBrigadista.style.display = "none";
  }
};

//Se a primeira opção estiver marcada, inicializa a pagina com o layout padrão
document.addEventListener('DOMContentLoaded', () => {
  verificaRadio();
});

//Altera o layout do crachá para o modelo padrão
radio01.addEventListener('change', (event) => {
  if (event.target.checked) {
    crachaGeral.style.display = "block"; 
    crachaJL.style.display = "none";
    crachaBrigadista.style.display = "none";
    crachaFoto.classList.remove("brigadista-foto");
    crachaNome.classList.remove("brigadista-nome");
    crachaMatricula.classList.remove("brigadista-matricula");
  }
});

//Altera o layout do crachá para o modelo JL Bracuhy
radio02.addEventListener('change', (event) => {
  if (event.target.checked) {
    crachaJL.style.display = "block";
    crachaGeral.style.display = "none";
    crachaBrigadista.style.display = "none";
    crachaFoto.classList.remove("brigadista-foto");
    crachaNome.classList.remove("brigadista-nome");
    crachaMatricula.classList.remove("brigadista-matricula");
  }
});

//Altera o layout do crachá para o modelo Brigadista
radio03.addEventListener('change', (event) => {
  if (event.target.checked) {
    crachaBrigadista.style.display = "block";
    crachaGeral.style.display = "none";
    crachaJL.style.display = "none";
    crachaFoto.classList.add("brigadista-foto"); 
    crachaNome.classList.add("brigadista-nome");
    crachaMatricula.classList.add("brigadista-matricula");
  }
});

//Só exibe a imagem se algum arquivo for carregado (oculta o icone de imagem quebrada)
inputFoto.addEventListener('change', () => {
  const foto = inputFoto.files[0];
  if (foto) {
    const reader = new FileReader();
    reader.readAsDataURL(foto);
    reader.onload = (event) => {
      crachaFoto.src = event.target.result;
      crachaFoto.style.display = 'block'; // 
    }
  } else {
    crachaFoto.style.display = 'none'; 
  }
});


//Insere o nome e matricula no crachá
inputNome.addEventListener('input', () => { crachaNome.textContent = inputNome.value });
inputMatricula.addEventListener('input', () => { crachaMatricula.textContent = inputMatricula.value });

//Apaga os valores dos campos caso a página seja atualizada
document.addEventListener('DOMContentLoaded', () => {
  apagaFoto.value = "";
});
document.addEventListener('DOMContentLoaded', () => {
  apagaNome.value = "";
});
document.addEventListener('DOMContentLoaded', () => {
  apagaMatricula.value = "";
});

//Baixa o crachá
botaoBaixar.addEventListener('click', () => {
  html2canvas(cracha, { scale: 2 }).then((canvas) => {
    canvas.toDataURL('image/png');
    const download = document.createElement('a');
    download.href = canvas.toDataURL('image/png');
    download.download = inputNome.value;
    download.click();
  });
});
