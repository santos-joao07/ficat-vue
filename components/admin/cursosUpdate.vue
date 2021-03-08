<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <!-- NOME DO CURSO -->
        <b-field class="name-input" label="Nome do curso/programa">
          <b-input
            v-model.lazy="$v.formFields.courseName.$model"
            placeholder="Ex.: Faculdade de enfermagem"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.courseName.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.courseName.minLength" class="error">
            Campo 'nome' deve ter no minimo
            {{ $v.courseName.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- PROGRAMA -->
        <b-field label="Programa">
          <b-input
            v-model.lazy="$v.formFields.courseProgram.$model"
            placeholder="Ex.: PPGCF"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.courseProgram.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.courseProgram.minLength" class="error">
            Campo 'programa' deve ter no minimo
            {{ $v.courseName.$params.minLength.min }} letras.
          </span>
        </p>

        <b-field label="Unidade academica">
          <b-input
            v-model="formFields.courseUnityId"
            type="text"
            placeholder="Ex.: ICJ"
          >
          </b-input>
        </b-field>
        <b-field label="Tipo do curso">
          <b-select
            v-model="$v.formFields.courseType.$model"
            placeholder="Selecione"
          >
            <option :value="courseTypes[0]">
              Graduação
            </option>
            <option :value="courseTypes[1]">
              Especialização
            </option>
            <option :value="courseTypes[2]">
              Mestrado
            </option>
            <option :value="courseTypes[3]">
              Doutorado
            </option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="$emit('close')" label="Fechar janela" />
        <b-button label="Adicionar" type="is-primary" />
      </footer>
    </div>
  </form>
</template>
<script>
const { required, minLength } = require('vuelidate/lib/validators')

export default {
  props: ['id'],
  data() {
    return {
      formFields: {
        courseName: '',
        courseProgram: '',
        courseUnityId: '',
        courseType: 'graduação'
      },
      courseTypes: ['graduação', 'especialização', 'mestrado', 'doutorado'],

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      courseName: {
        required,
        minLength: minLength(7)
      },
      courseProgram: {
        required,
        minLength: minLength(2)
      },
      courseType: {
        required
      }
    }
  },

  // TODO: Finish this shit
  // beforeMount() {
  //   const course = this.$axios.get(`/api/courses/${this.$props.id}`)
  //   console.log(course)
  // },

  methods: {
    submitForm() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      this.uiState = 'submit clicked'
      if (this.errors === false && this.formTouched === false) {
        this.uiState = 'form submitted'
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(`Curso atualizado com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Edição do curso falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('course_added')
    }
    // addCourse() {
    //   this.$axios
    //     .post('/api/courses', {
    //       name: this.formFields.courseName,
    //       program: this.formFields.courseProgram,
    //       type: this.formFields.courseType,
    //       unityId: this.formFields.courseUnityId
    //     })
    //     .then(response => {
    //       console.log('Data posted!')
    //       this.isPostSuccess = true
    //       this.snackbar(true)
    //       this.sendMessage()
    //       this.$emit('close')
    //     })
    //     .catch(error => {
    //       this.courseData = error.data
    //       this.isPostSuccess = false
    //       this.snackbar(false)
    //     })
    // }
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 0;
}

.errors {
  margin-bottom: 0.75rem;
}

.error {
  font-size: 0.9rem;
  color: red;
  margin-bottom: 0.75rem;
}
</style>
