// Seleciona os elementos do formulário
const inputFoto = document.getElementById('input-foto');
const inputNome = document.getElementById('input-nome');
const inputMatricula = document.getElementById('input-matricula');
const botaoBaixar = document.getElementById('baixar');
const botaoImprimir = document.getElementById('print');
const apagaFoto = document.querySelector('#input-foto');
const apagaNome = document.querySelector('#input-nome');
const apagaMatricula = document.querySelector('#input-matricula');

// Seleciona os elementos do crachá
const crachaFoto = document.getElementById('cracha-foto');
const crachaNome = document.getElementById('cracha-nome');
const crachaMatricula = document.getElementById('cracha-matricula');

// Seleciona os elementos o crachá
const cracha = document.querySelector('.cracha');

//Atualiza os elementos no crachá em tempo real
inputFoto.addEventListener('change', () => {
  const foto = inputFoto.files[0];
  if (foto) {
    const reader = new FileReader();
    reader.readAsDataURL(foto);

    reader.onload = (event) => {
      crachaFoto.src = event.target.result;
    }
  }
});

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
    download.download = "cracha.png"
    download.click();
  });
});

//Imprime o crachá
document.getElementById('print').addEventListener('click', () => {
  const cracha = document.querySelector('.cracha'); // Seleciona o crachá

  html2canvas(cracha, { scale: 2 }).then((canvas) => {
    const imageURL = canvas.toDataURL('image/png'); // Converte o canvas em DataURL

    // Cria um elemento overlay temporário
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'white';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999'; // Garante que fica por cima de tudo

    // Adiciona a imagem ao overlay
    const img = document.createElement('img');
    img.src = imageURL;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    overlay.appendChild(img);

    // Adiciona o overlay ao body
    document.body.appendChild(overlay);

    // Chama a impressão
    window.print();

    // Remove o overlay após a impressão
    document.body.removeChild(overlay);
  });
});
