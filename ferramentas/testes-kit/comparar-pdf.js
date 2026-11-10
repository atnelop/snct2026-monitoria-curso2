// Compara o Starter Kit com o codigo dos Passos 2.5, 2.6 e 2.7 do PDF da Frente 2.
//
// Uso:  node comparar-pdf.js [pasta-do-kit]
// Gera: relatorios/divergencias-pdf.md
//
// Regra da comparacao: recuo e linhas em branco nao contam. O CSS e reorganizado
// em uma declaracao por linha, porque o PDF junta varias na mesma linha.
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const PASTA_REFERENCIA = path.join(__dirname, 'referencia-pdf');

const ARQUIVOS = [
  { caminho: 'index.html', passo: 'Passo 2.5', tipo: 'html' },
  { caminho: 'js/app.js', passo: 'Passo 2.6', tipo: 'js' },
  { caminho: 'css/estilo.css', passo: 'Passo 2.7', tipo: 'css' },
];

// Devolve [{ texto, linha }] ja sem recuo e sem linhas em branco.
function normalizar(conteudo, tipo) {
  const linhas = conteudo.replace(/\r\n?/g, '\n').split('\n');
  if (tipo !== 'css') {
    return linhas
      .map((texto, i) => ({ texto: texto.trim(), linha: i + 1 }))
      .filter((l) => l.texto !== '');
  }
  // CSS: quebra em "seletor {", "propriedade: valor;" e "}".
  const saida = [];
  let atual = '';
  let linhaInicial = 0;
  const fechar = () => {
    const texto = atual.replace(/\s+/g, ' ').trim();
    if (texto) saida.push({ texto, linha: linhaInicial });
    atual = '';
    linhaInicial = 0;
  };
  linhas.forEach((textoLinha, i) => {
    for (const letra of textoLinha + ' ') {
      if (!linhaInicial && letra.trim()) linhaInicial = i + 1;
      if (letra === '}') {
        fechar();
        saida.push({ texto: '}', linha: i + 1 });
      } else {
        atual += letra;
        if (letra === '{' || letra === ';') fechar();
      }
    }
  });
  fechar();
  return saida;
}

// Diff por maior subsequencia comum (os arquivos sao pequenos).
function diff(a, b) {
  const n = a.length;
  const m = b.length;
  const t = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      t[i][j] = a[i].texto === b[j].texto ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
    }
  }
  const passos = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i].texto === b[j].texto) {
      i++;
      j++;
    } else if (j < m && (i === n || t[i][j + 1] >= t[i + 1][j])) {
      passos.push({ lado: 'repo', ...b[j++] });
    } else {
      passos.push({ lado: 'pdf', ...a[i++] });
    }
  }
  return passos;
}

function compararArquivo(pastaKit, arquivo) {
  const caminhoRepo = path.join(pastaKit, arquivo.caminho);
  const caminhoPdf = path.join(PASTA_REFERENCIA, arquivo.caminho);
  if (!fs.existsSync(caminhoRepo)) {
    return { arquivo, divergencias: [`arquivo ausente no kit: ${arquivo.caminho}`], resumo: 'arquivo ausente', passos: [] };
  }
  const repoBruto = fs.readFileSync(caminhoRepo, 'utf8');
  const pdfBruto = fs.readFileSync(caminhoPdf, 'utf8');
  const passos = diff(normalizar(pdfBruto, arquivo.tipo), normalizar(repoBruto, arquivo.tipo));
  const divergencias = passos.map((p) =>
    p.lado === 'pdf' ? `so no PDF (linha ${p.linha}): ${p.texto}` : `so no repo (linha ${p.linha}): ${p.texto}`
  );
  const formato = {
    recuoRepo: detectarRecuo(repoBruto),
    linhasRepo: repoBruto.split('\n').length,
    linhasPdf: pdfBruto.trimEnd().split('\n').length,
    terminaComQuebra: repoBruto.endsWith('\n'),
  };
  const resumo = `${arquivo.caminho} x ${arquivo.passo}: ${divergencias.length} linha(s) divergente(s)`;
  return { arquivo, divergencias, resumo, passos, formato };
}

function detectarRecuo(conteudo) {
  const recuos = conteudo.split('\n').map((l) => l.match(/^( +)\S/)).filter(Boolean).map((m) => m[1].length);
  return recuos.length ? Math.min(...recuos) : 0;
}

function gerarRelatorio(pastaKit) {
  const linhas = [
    '# Divergências entre o Starter Kit e o PDF da Frente 2',
    '',
    'Gerado por `ferramentas/testes-kit/comparar-pdf.js`. Não editar à mão.',
    '',
    `- Kit comparado: \`${path.relative(RAIZ, pastaKit) || '.'}\``,
    '- Referência: Roteiro Prático SNCT 02, Passos 2.5, 2.6 e 2.7 (páginas 7 a 9)',
    '- Recuo e linhas em branco não contam como divergência.',
    '- No CSS, cada declaração é comparada separadamente, porque o PDF junta várias na mesma linha.',
    '',
  ];
  let total = 0;
  for (const arquivo of ARQUIVOS) {
    const r = compararArquivo(pastaKit, arquivo);
    total += r.divergencias.length;
    linhas.push(`## \`${arquivo.caminho}\` (${arquivo.passo})`, '');
    if (r.divergencias.length === 0) {
      linhas.push('Conteúdo igual ao PDF.', '');
    } else if (!r.passos.length) {
      linhas.push(`**${r.divergencias[0]}**`, '');
    } else {
      linhas.push(`${r.divergencias.length} linha(s) divergente(s):`, '', '| Onde | Linha | Conteúdo |', '| --- | --- | --- |');
      for (const p of r.passos) {
        const onde = p.lado === 'pdf' ? 'Só no PDF' : 'Só no repo';
        linhas.push(`| ${onde} | ${p.linha} | \`${p.texto.replace(/\|/g, '\\|').replace(/`/g, "'")}\` |`);
      }
      linhas.push('');
    }
    if (r.formato) {
      linhas.push(
        `Formatação (não conta como divergência): recuo de ${r.formato.recuoRepo} espaços no repo ` +
          `(o PDF usa 2); ${r.formato.linhasRepo} linhas no repo e ${r.formato.linhasPdf} no PDF; ` +
          `o arquivo do repo ${r.formato.terminaComQuebra ? 'termina' : 'não termina'} com quebra de linha.`,
        ''
      );
    }
  }
  linhas.splice(9, 0, `**Total: ${total} linha(s) divergente(s).**`, '');
  return { texto: linhas.join('\n'), total };
}

module.exports = { ARQUIVOS, compararArquivo, normalizar, gerarRelatorio };

if (require.main === module) {
  const pastaKit = path.resolve(process.argv[2] || process.env.KIT_DIR || path.join(RAIZ, 'vendor', 'starter-kit'));
  const { texto, total } = gerarRelatorio(pastaKit);
  const destino = path.join(RAIZ, 'relatorios', 'divergencias-pdf.md');
  fs.writeFileSync(destino, texto);
  console.log(`${total} linha(s) divergente(s). Relatorio: ${path.relative(process.cwd(), destino)}`);
}
