<template>
  <Card title="Cotutela">
    <div class="columns">
      <div class="column is-centered">
        <div class="campo-orientador input-float">
          <input-validation
            ref="cotutorshipAdvisorName"
            v-model="$v.cotutorshipAdvisorName.$model"
            :validations="$options.validations.cotutorshipAdvisorName"
            :v="$v"
            :label="$tr('layout.whosName', ['advisor'])"
            :tooltip-label="$tr('layout.nameTooltip', ['lowAdvisor'])"
            class="advisor-name"
            field-name="cotutorshipAdvisorName"
          >
            <template #required>
              {{ $tr('layout.required') }}
            </template>
            <template #minLength="{ min }">
              {{ $tr('layout.minLength', [min]) }}
            </template>
          </input-validation>
          <div class="columns vcenter">
            <div class="column is-half">
              <div class="vcenter">
                <WithTooltip
                  :text="$tr('layout.whosFemaleTooltip', ['lowAdvisor'])"
                >
                  <b-checkbox v-model="isFemaleAdvisor">
                    {{ $tr('layout.femaleAdvisor') }}
                  </b-checkbox>
                </WithTooltip>
              </div>
            </div>
            <div class="column is-half">
              <input-validation
                ref="advisorTitle"
                v-model="$v.advisorTitle.$model"
                :validations="$options.validations.advisorTitle"
                :v="$v"
                :label="$tr('layout.title')"
                :tooltip-label="$tr('layout.whosTitle', ['lowCoadvisor'])"
                field-name="advisorTitle"
                use-component="b-select"
              >
                <template #component>
                  <option value="graduate">{{ $tr('layout.graduate') }}</option>
                  <option value="expert">{{ $tr('layout.expert') }}</option>
                  <option value="master">{{ $tr('layout.master') }}</option>
                  <option value="doctor">{{ $tr('layout.doctor') }}</option>
                </template>
                <template #required>
                  {{ $tr('layout.required') }}
                </template>
              </input-validation>
            </div>
          </div>
        </div>

        <div class="info-instituicao input-float">
          <div class="campo-instituicao">
            <input-validation
              ref="cotutorshipInstitution"
              v-model="$v.cotutorshipInstitution.$model"
              :validations="$options.validations.cotutorshipInstitution"
              :v="$v"
              :tooltip-label="$tr('layout.nameTooltip', ['lowAdvisor'])"
              label="Instituição de Ensino"
              field-name="cotutorshipInstitution"
            >
              <template #required>
                {{ $tr('layout.required') }}
              </template>
              <template #minLength="{ min }">
                {{ $tr('layout.minLength', [min]) }}
              </template>
            </input-validation>
          </div>

          <div class="campo-programa">
            <input-validation
              ref="cotutorshipProgram"
              v-model="$v.cotutorshipProgram.$model"
              :validations="$options.validations.cotutorshipProgram"
              :v="$v"
              :tooltip-label="$tr('layout.nameTooltip', ['lowAdvisor'])"
              label="Programa/Faculdade"
              field-name="cotutorshipProgram"
            >
              <template #required>
                {{ $tr('layout.required') }}
              </template>
              <template #minLength="{ min }">
                {{ $tr('layout.minLength', [min]) }}
              </template>
            </input-validation>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { recovery, replace } from '~/front/persistence'
import Card from '~/components/Card'
import InputValidation from '~/components/InputValidation.js'
import WithTooltip from '~/components/WithTooltip'

export default {
  name: 'CotutorshipForm',
  components: { Card, InputValidation, WithTooltip },
  // mixins: [helper],
  data() {
    const { cotutorship } = recovery('form')
    return {
      cotutorshipAdvisorName: cotutorship.advisorName,
      isFemaleAdvisor: cotutorship.isFemaleAdvisor,
      advisorTitle: cotutorship.advisorTitle,
      cotutorshipInstitution: cotutorship.institutionName,
      cotutorshipProgram: cotutorship.program,
      initialRef: 'cotutorshipAdvisorName'
    }
  },

  watch: {
    $v: {
      deep: true,
      handler($v) {
        replace('form', { cotutorship: this.$data })
      }
    }
  },
  //   ,

  //   mounted() {
  //     this.$refs.advisorName.focus()
  //   },

  beforeCreate() {
    if (!recovery('form').cotutorship)
      replace('form', {
        cotutorship: {
          advisorName: '',
          isFemaleAdvisor: false,
          advisorTitle: 'doctor',

          institutionName: '',
          program: ''
        }
      })
  },

  methods: {
    filterModels() {
      return Object.keys(this.$v).filter(k => !k.startsWith('$'))
    },
    checkNext() {
      // const { coadvisorName } = this.$refs
      const { validations } = this.$options
      this.$v.$touch()
      for (const field in validations) {
        console.log(this.$v[field])
        if (this.$v[field].$invalid && !this.$v[field].$each) {
          this.$refs[field].focus()

          return false
        }
        if (this.$v[field].$each) {
          // se houver $each, só pode dizer q é a array adicional de coorientador
          if (this.$v[field].$each.$invalid) {
            return false
          }
        }
      }
      return true
    },
    reset() {
      replace('form', {
        cotutorship: {
          advisorName: '',
          isFemaleAdvisor: false,
          advisorTitle: 'doctor',

          institutionName: '',
          program: ''
        }
      })
    }
  },

  validations: {
    cotutorshipAdvisorName: {
      required,
      minLength: minLength(3)
    },
    advisorTitle: {
      required
    },
    cotutorshipInstitution: {
      required,
      minLength: minLength(10)
    },
    cotutorshipProgram: {
      required
    }
  }
}
</script>

<style scoped>
.input-float {
  display: flex;

  margin-left: 10%;
  justify-content: flex-start;
}

.advisor-name {
  margin-right: 5%;
}

.vcenter {
  align-items: center;
}

.field {
  position: relative;
  top: -1rem;
}

.campo-instituicao {
  margin-right: 5%;
}

@media screen and (max-width: 900px) {
  .input-float {
    flex-direction: column;
  }
}
</style>
