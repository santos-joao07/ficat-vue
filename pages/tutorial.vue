<template>
  <div class="tutorial-main content">
    <h1>O que é o FICAT?</h1>
    <p>
      FICAT é um sistema online desenvolvido pela Biblioteca Central para a
      geração automática de fichas catalográficas.
    </p>
    <hr />
    <h2>Gerando uma ficha</h2>
    <p>
      Para começar a usar o sistema e gerar uma ficha, é necessário ir até a
      página inicial do site disponível em
      <a><strong>bcficat.ufpa.br</strong></a> ou clique no ícone do FICAT no
      <strong>menu de navegação</strong> no topo dessa página.
    </p>

    <h2>Dados do autor</h2>
    <p>
      Nessa primeira seção do formulário, você deve adicionar as informações
      relacionadas ao autor ou autores. Caso queira adicionar mais de um autor,
      pressione o <strong>botão de adicionar</strong> ao lado dos campos de nome
      e sobrenome. Atualmente o FICAT aceita apenas dois autores por trabalho.
    </p>
    <img src="../assets/img/dados_autor.png" />
    <p>
      Após o preenchimento dos campos, clique em
      <strong>Próximo</strong>.
    </p>

    <h2>Dados do trabalho</h2>
    <p>
      Nessa seção você deve preencher os campos com as informações relacionadas
      ao trabalho que necessita da ficha catalográfica. Comece preenchendo a
      primeira coluna, informando o titulo do trabalho e o subtitulo, se houver.
      Depois selecione o ano em que o trabalho foi finalizado e o total de
      paginas.
    </p>
    <p>
      Caso a numeração tenha apenas números arábicos, preencha normalmente com o
      número, agora se tiver tanto números arábicos quanto romanos, preencha de
      acordo com o exemplo no campo, atentando ao fato de que
      <strong>os números romanos devem ser em letras minusculas</strong>.
    </p>
    <img src="../assets/img/dados_trabalho.png" />
    <p>
      No inicio da segunda coluna, escolha se o trabalho possui ilustração e o
      tipo dele (trabalho), se é tese, dissertação ou monografia. Depois clique
      no campo de área de conhecimento,
      <strong>isso abrirá uma caixa de dialogo</strong> para você escolher a
      opção mais adequada para o seu trabalho.
    </p>
    <p>
      Na caixa de dialógo de áreas do conhecimento, você tem duas opções de
      navegação: através da escolha de uma das categorias ou através de
      pesquisa. Ao clicar em uma categoria ou fazer uma pesquisa, uma lista de
      opções será exibida, clique na sua escolha e
      <strong
        >o campo de área de conhecimento será preenchido automaticamente </strong
      >.
    </p>
    <img src="../assets/img/caixa_kna.png" />
    <p>
      Por fim, escolha sua unidade academica. Digite o nome por extenso ou a
      sigla e selecione a opção adequada. A escolha da unidade academica exibe
      um campo para a seleção do curso ou programa.
    </p>

    <h2>Orientadores</h2>
    <p>
      Nessa seção, informe as informações relacionadas aos orientadores e
      coorientadores, de acordo com a necessidade. Informe o nome completo,
      <strong>o tipo, se é orientador ou coorientador</strong>, o genero
      (implica na forma de tratamento na ficha) e a titulação. Caso exista mais
      de um orientador ou coorientador, clique no botão de adicionar na
      extremidade direita.
    </p>
    <img src="../assets/img/orientadores.png" />
    <p>
      Abaixo dos campos de orientadores e coorientadores, existe a possibilidade
      de informar se o seu curso foi na modalidade interinstitucional. Caso
      tenha sido, marque essa opção antes passar para a próxima seção.
    </p>

    <h2>Interinstitucional (seção opcional)</h2>
    <p>
      Nessa seção, preencha os dados relacionados a instituição parceira da UFPA
      onde o curso foi realizado. Comece informando o nome completo do
      orientador, genero e titulação. Por fim, informe o nome da instituição e a
      faculdade (dessa instituição) onde o seu curso estava locado.
    </p>
    <img src="../assets/img/interinstitucional.png" />

    <h2>Palavras-chave</h2>
    <p>
      Aqui você deve inserir as palavras-chave do seu trabalho (no máximo 5).
      Para adicionar mais palavras-chave, clique no botão de adicionar.
    </p>
    <img src="../assets/img/palavras-chave.png" />

    <h2>Preparar ficha catalográfica</h2>
    <p>
      Essa é a seção final do formulário. Aqui você deve escolher o tipo de
      fonte da sua ficha catalografica e se você deseja receber uma copia da
      ficha no seu email, se sim, marque a opção e informe o endereço de email
      onde você deseja receber a ficha.
    </p>
    <p>
      Por fim, solucione o reCAPTCHA e clique em <strong>Gerar</strong>. Isso
      vai abrir uma nova aba no seu navegador com a ficha requisitada.
    </p>
    <img src="../assets/img/preparar-ficha.png" />
  </div>
</template>
<style scoped>
.tutorial-main {
  margin-top: 4%;
}
</style>
