const LOCAIS_COLETA = [
    {
        nome: "Ecoponto Central — Secretaria de Meio Ambiente",
        bairro: "Centro",
        categoria: "Eletronicos",
        horario: "Segunda a Sexta, 08h as 17h",
        mapaUrl: "https://maps.google.com/?q=Garopaba+Centro"
    },
    {
        nome: "Ponto Verde IFSC Campus Garopaba",
        bairro: "Campo D'Una",
        categoria: "Reciclaveis",
        horario: "Segunda a Sexta, 08h as 22h",
        mapaUrl: "https://maps.google.com/?q=IFSC+Garopaba"
    },
    {
        nome: "Coleta de Vidro e Oleo — Associacao Comunitaria",
        bairro: "Ferrugem",
        categoria: "Vidro",
        horario: "Sabados, 09h as 13h",
        mapaUrl: "https://maps.app.goo.gl/r5PxGL6jaeWf9rwJ7"
    },
];
function filtrarEcopontos(categoriaEscolhida) {
    const grade = document.getElementById("gradeEcopontos");
    const filtrados = categoriaEscolhida === "Todos"
        ? LOCAIS_COLETA
        : LOCAIS_COLETA.filter(item => item.categoria === categoriaEscolhida);
    grade.innerHTML = filtrados.map(local => `
<article class="cartao-ecoponto">
<span class="tag-residuo">${local.categoria}</span>
<h2>${local.nome}</h2>
<p><strong>Bairro:</strong> ${local.bairro} · ${local.horario}</p>
<a class="link-mapa" href="${local.mapaUrl}" target="_blank" rel="noopener">
Abrir localizacao no Google Maps
</a>
</article>
`).join("");
}
filtrarEcopontos("Todos");