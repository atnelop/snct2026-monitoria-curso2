/**
 * Cria o Google Forms espelho da Pesquisa de Satisfacao (Fase 6 do PLANO.md).
 *
 * COMO USAR
 *   1. Abra https://script.google.com e clique em "Novo projeto".
 *   2. Apague o que estiver no editor e cole este arquivo inteiro.
 *   3. No topo, escolha a funcao "criarFormsEspelho" e clique em "Executar".
 *   4. Na primeira vez o Google pede autorizacao: aceite com a conta da equipe.
 *   5. Abra "Registro de execucao": os enderecos aparecem no final.
 *
 * O formulario fica na conta Google de quem executar. Rode UMA vez: cada
 * execucao cria um formulario novo.
 *
 * As 3 perguntas sao as do Roteiro Pratico SNCT 04 (Passo 2.2) e precisam
 * ficar identicas as da atividade Pesquisa do Moodle e a ferramentas/pesquisa.json.
 */

var PESQUISA = {
  titulo: 'Pesquisa de Satisfação · Painel Verde · SNCT 2026',
  descricao: 'São 3 perguntas rápidas sobre a oficina de hoje. Não pedimos nome nem e-mail.',
  agradecimento: 'Obrigado! Sua resposta foi registrada.',
  p1: 'De 1 a 5, o quanto o Micro-Roteiro e a explicação ajudaram você a colocar seu projeto no ar?',
  p1RotuloMaximo: 'Excelente',
  p2: 'Você conseguiu abrir o projeto publicado no seu smartphone via QR Code?',
  p2Opcoes: [
    'Sim, abriu perfeitamente no celular!',
    'Abriu no computador do laboratório, mas não testei no celular.',
    'Tive dificuldade na etapa do GitHub Pages.'
  ],
  p3: 'O que você mais gostou na oficina de hoje e que tema gostaria de ver na próxima edição?'
};

function criarFormsEspelho() {
  var form = FormApp.create(PESQUISA.titulo);
  form.setDescription(PESQUISA.descricao);
  form.setConfirmationMessage(PESQUISA.agradecimento);

  // Sem coleta de e-mail e sem exigir login: o publico externo nao tem conta do IFSC.
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(true); // varios participantes podem usar o mesmo computador
  tentar('desligar a exigencia de login', function () { form.setRequireLogin(false); });

  // P1: escala de 1 a 5
  form.addScaleItem()
    .setTitle(PESQUISA.p1)
    .setBounds(1, 5)
    .setLabels('', PESQUISA.p1RotuloMaximo)
    .setRequired(true);

  // P2: multipla escolha com 3 opcoes
  form.addMultipleChoiceItem()
    .setTitle(PESQUISA.p2)
    .setChoiceValues(PESQUISA.p2Opcoes)
    .setRequired(true);

  // P3: resposta curta opcional
  form.addTextItem()
    .setTitle(PESQUISA.p3)
    .setRequired(false);

  // Respostas em planilha vinculada
  var planilha = SpreadsheetApp.create(PESQUISA.titulo + ' (respostas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  // Em contas mais novas o formulario pode nascer sem estar publicado.
  tentar('publicar o formulario', function () {
    if (typeof form.isPublished === 'function' && !form.isPublished()) form.setPublished(true);
  });
  form.setAcceptingResponses(true);

  var enderecoPublico = form.getPublishedUrl();
  var enderecoCurto = enderecoPublico;
  tentar('encurtar o endereco', function () { enderecoCurto = form.shortenFormUrl(enderecoPublico); });

  Logger.log('PRONTO. Guarde estes enderecos:');
  Logger.log('Editar o formulario:   ' + form.getEditUrl());
  Logger.log('Planilha de respostas: ' + planilha.getUrl());
  Logger.log('Endereco publico:      ' + enderecoPublico);
  Logger.log('ENDERECO PARA O QR CODE (copie este): ' + enderecoCurto);
  return enderecoCurto;
}

// Algumas opcoes so existem em certos tipos de conta. Se falhar, avisa e continua.
function tentar(descricao, acao) {
  try {
    acao();
  } catch (erro) {
    Logger.log('AVISO: nao foi possivel ' + descricao + ' (' + erro + '). Confira essa opcao na tela do formulario.');
  }
}
