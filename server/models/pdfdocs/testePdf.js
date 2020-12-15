const catalogCardModel = require('./testeCatalogCard')
var fs = require('fs')
var pdf = require('html-pdf')
var options = {
  phantomArgs: ['--local-url-access=false'],
  orientation: 'portrait',
  format: 'A4',
  border: {
    top: '1cm',
    right: '2cm',
    bottom: '1.5cm',
    left: '2cm'
  }
}

// Descomente para testar
const testeFont = 'times'
const testeCutter = 'P475c'
const testeAuthorHeader = 'Pessôa, Fábio Tadeu de Melo.'
const testeWorkTitleHeader =
  'Ao cristão é proibido ter medo : a trajetória da Comissão Pastoral da Terra (CPT) no Sul e Sudeste do Pará durante a Ditadura Militar (1975/1985) / Fábio Tadeu de Melo Pessôa. — 2019.'
const testePagesHeader = '301 f. : il. color.'
const testeAdvisorHeader = 'Orientador(a): Dr. Pere Petit Penãrrocha'
const testeWorkHeader =
  'Tese (Doutorado) - Universidade Federal do Pará, Instituto de Filosofia e Ciências Humanas, Programa de Pós-Graduação em História, Belém, 2019.'
const testeKeywordHeader =
  '1. Comissão Pastoral da Terra. 2. Sul e Sudeste do Pará. 3. Campo político-religioso. 4. Luta pela terra. 5. Ditadura militar. I. Título.'
const testeCdd = '981.15'

const html = catalogCardModel(testeFont, {
  cutter: testeCutter,
  authorHeader: testeAuthorHeader,
  workTitleHeader: testeWorkTitleHeader,
  pagesHeader: testePagesHeader,
  advisorHeader: testeAdvisorHeader,
  workHeader: testeWorkHeader,
  keywordHeader: testeKeywordHeader,
  cdd: testeCdd
})

pdf.create(html, options).toFile('./teste_card.pdf', function(err, res) {
  if (err) return console.log(err)
  console.log(res) // { filename: '/app/businesscard.pdf' }
})
