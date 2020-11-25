const { join } = require('path')
const { readFileSync } = require('fs')

/**
 * Gera o modelo PDF baseado nos dados da
 * ficha catalográfica gerados pelo usuário final
 * @param {PDFKit.PDFDocument} doc
 * @param {String} font
 * @param {Object} {
 *  cutter: String
 *  authors: {
      authorName: String,
      authorSurname: String,
      author2Name: String,
      author2Surname: String
    },
    work: {
      workTitle: String,
      workSubtitle: String,
      presentationYear: String,
      workImagesType: String,
      totalPages: String,
      workType: String
    },
    advisors: {
      advisorName: String,
      advisorSurname: String,
      isFemaleAdvisor: Boolean,
      advisorTitle: String,
      coadvisorName: String,
      coadvisorSurname: String,
      isFemaleCoadvisor: Boolean,
      coadvisorTitle: String
    },
    academicDetailNames: {
      programName: String,
      acdUnityName: String
    },
    cdd: String
 */
function catalogCard(
  catalogFont,
  { cutter, authorHeader, workTitleHeader, pagesHeader, advisorHeader, workHeader, keywordHeader, cdd }
) {
  const header = `
Dados Internacionais de Catalogação na Publicação (CIP) de acordo com ISBD
Sistema de Bibliotecas da Universidade Federal do Pará
Gerada automaticamente pelo módulo Ficat, mediante os dados fornecidos pelo(a) autor(a)`

  
  let coadvisorHeader = ''


  const fontSize = 10 // catalogFont === 'times' ? 9 : 10
  const withCoadvisorHeader = coadvisorHeader
    ? `<p class="ml">${coadvisorHeader}</p>`
    : ''


  const templatePath = join('./testeCatalogCard.html')

  const fontFamily =
    catalogFont === 'times' ? "'Nimbus Roman', serif" : "'Arimo', sans-serif"

  // HTML model and script should always have same file name
  const htmlTemplate = readFileSync(templatePath, 'utf8')

  console.log("ok")
  let author = authorHeader
  console.log(author)


  return htmlTemplate
    .replace('__fontFamily__', fontFamily)
    .replace('__fontSize__', fontSize)
    .replace('{{cutter}}', cutter)
    .replace('{{header}}', header)
    .replace('{{authorHeader}}', authorHeader)
    .replace('{{workTitleHeader}}', workTitleHeader)
    .replace('{{pagesHeader}}', pagesHeader)
    .replace('{{advisorHeader}}', advisorHeader)
    .replace('{{coadvisorHeader}}', withCoadvisorHeader)
    .replace('{{workHeader}}', workHeader)
    .replace('{{keywordHeader}}', keywordHeader)
    .replace('{{cdd}}', cdd)
}

function getLocal(acdUnityName) {
  const arr = acdUnityName.split(' ')
  return arr[arr.length - 1]
}

module.exports = catalogCard
