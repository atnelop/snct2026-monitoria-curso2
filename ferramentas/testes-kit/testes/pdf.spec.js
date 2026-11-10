// Teste 8 da Fase 1: regra "codigo 100% igual ao PDF".
// Compara o kit com os Passos 2.5, 2.6 e 2.7 do Roteiro SNCT 02 (Frente 2),
// transcritos em referencia-pdf/. Recuo e linhas em branco sao ignorados.
const { test, expect } = require('./base');
const { ARQUIVOS, compararArquivo } = require('../comparar-pdf');

for (const arquivo of ARQUIVOS) {
  test(`8. ${arquivo.caminho} igual ao ${arquivo.passo} do PDF da Frente 2`, async ({ pastaKit }) => {
    const resultado = compararArquivo(pastaKit, arquivo);
    expect(resultado.divergencias, resultado.resumo).toEqual([]);
  });
}
