<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="name-input" label="Nome do curso/programa">
          <b-input
            v-model.lazy="$v.formFields.courseName.$model"
            placeholder="Ex.: Faculdade de enfermagem"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.courseName.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.courseName.minLength" class="error">
            Nome do curso deve ter no minimo
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
        <b-button @click="addCourse" label="Adicionar" type="is-primary" />
      </footer>
    </div>
  </form>
</template>
<script>
const { required, minLength } = require('vuelidate/lib/validators')

export default {
  data() {
    return {
      formFields: {
        courseName: '',
        courseUnityId: '',
        courseType: 'graduation'
      },
      courseTypes: ['graduation', 'specialization', 'master', 'doctorate'],

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
      courseType: {
        required
      }
    }
  },

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
        this.$buefy.snackbar.open(`Curso adicionado com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Adição de curso falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('course_added')
    },
    addCourse() {
      this.$axios
        .post('/api/courses', {
          name: this.formFields.courseName,
          type: this.formFields.courseType,
          unityId: this.formFields.courseUnityId
        })
        .then(response => {
          console.log('Data posted!')
          this.isPostSuccess = true
          this.snackbar(true)
          this.sendMessage()
          this.$emit('close')
        })
        .catch(error => {
          this.courseData = error.data
          this.isPostSuccess = false
          this.snackbar(false)
        })
    }
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
