<template>
  <Card :title="$tr('layout.orientationData')">
    <div class="columns">
      <div class="column is-centered">
        <div class="input-float">
          <input-validation
            ref="advisorName"
            v-model="$v.advisorName.$model"
            :validations="$options.validations.advisorName"
            :v="$v"
            :label="$tr('layout.whosName', ['advisor'])"
            :tooltip-label="$tr('layout.nameTooltip', ['lowAdvisor'])"
            field-name="advisorName"
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
          <div class="btn-block">
            <WithTooltip :text="$tr('layout.addCoadvisor')">
              <b-button
                :disabled="coadvisors.length > 1"
                @click="
                  coadvisors.push({
                    coadvisorName: '',
                    coadvisorTitle: 'doctor',
                    isFemaleCoadvisor: false
                  })
                "
                icon-right="plus"
                class="is-success is-round is-outlined btn"
              >
              </b-button>
            </WithTooltip>
          </div>
        </div>
        <div
          v-for="(kw, i) in $v.coadvisors.$each.$iter"
          :key="i"
          class="coadvisor-area input-float"
        >
          <input-validation
            ref="coadvisorName"
            v-model="kw.coadvisorName.$model"
            :validations="$options.validations.coadvisors.$each.coadvisorName"
            :v="kw"
            :label="$tr('layout.whosName', ['coadvisor'])"
            :tooltip-label="$tr('layout.nameTooltip', ['lowAdvisor'])"
            field-name="coadvisorName"
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
                  <b-checkbox v-model="coadvisors[i].isFemaleCoadvisor">
                    {{ $tr('layout.femaleAdvisor') }}
                  </b-checkbox>
                </WithTooltip>
              </div>
            </div>
            <div class="column is-half">
              <input-validation
                ref="coadvisorTitle"
                v-model="kw.coadvisorTitle.$model"
                :validations="
                  $options.validations.coadvisors.$each.coadvisorTitle
                "
                :v="kw"
                :label="$tr('layout.title')"
                :tooltip-label="$tr('layout.whosTitle', ['lowCoadvisor'])"
                field-name="coadvisorTitle"
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
          <div class="btn-block">
            <WithTooltip :text="$tr('layout.addCoadvisor')">
              <b-button
                :disabled="coadvisors.length > 1"
                @click="
                  coadvisors.push({
                    coadvisorName: '',
                    coadvisorTitle: 'doctor',
                    isFemaleCoadvisor: false
                  })
                "
                icon-right="plus"
                class="is-success is-round is-outlined btn"
              >
              </b-button>
            </WithTooltip>
            <WithTooltip :text="$tr('layout.removeCoadvisor')">
              <b-button
                v-if="i >= 0"
                @click="coadvisors.splice(i, 1)"
                icon-right="minus"
                class="is-danger is-round btn-margin is-outlined btn"
              ></b-button>
            </WithTooltip>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
// import helper from '~/mixins/helper'
import { recovery, replace } from '~/front/persistence'
import Card from '~/components/Card'
import InputValidation from '~/components/InputValidation.js'
import WithTooltip from '~/components/WithTooltip'

export default {
  name: 'AuthorshipForm',
  components: { Card, InputValidation, WithTooltip },
  // mixins: [helper],
  data() {
    const { advisors } = recovery('form')
    return {
      advisorName: advisors.advisorName,
      coadvisors: [],
      isFemaleAdvisor: advisors.isFemaleAdvisor,
      advisorTitle: advisors.advisorTitle,
      initialRef: 'advisorName'
    }
  },

  watch: {
    $v: {
      deep: true,
      handler($v) {
        replace('form', { advisors: this.$data })
      }
    }
  },

  mounted() {
    this.$refs.advisorName.focus()
  },

  beforeCreate() {
    if (!recovery('form').advisors)
      replace('form', {
        advisors: {
          advisorName: '',
          isFemaleAdvisor: false,
          advisorTitle: 'doctor',
          coadvisors: []
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
    }
  },

  validations: {
    advisorName: {
      required,
      minLength: minLength(3)
    },
    advisorTitle: {
      required
    },

    coadvisors: {
      minLength: minLength(0),
      $each: {
        coadvisorName: {
          required,
          minLength: minLength(3)
        },
        coadvisorTitle: {
          required
        }
      }
    }
  }
}
</script>

<style scoped>
/* TODO: RESOLVER VISULIZAÇÃO PARA DISPOSITIVOS MOVEIS */
.input-float {
  display: flex;

  margin-left: 10%;
  justify-content: flex-start;
}

.vcenter {
  align-items: center;
}

.field {
  position: relative;
  top: -1rem;
}

@media screen and (max-width: 900px) {
  .input-float {
    flex-direction: column;
  }
}
</style>
