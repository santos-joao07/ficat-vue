<template>
  <Card :title="$tr('layout.authorshipData')">
    <div class="columns is-centered">
      <div class="column is-half">
        <div
          v-for="(kw, i) in $v.authors.$each.$iter"
          :key="i"
          class="field is-grouped is-grouped"
        >
          <input-validation
            ref="authors"
            v-model="kw.authorName.$model"
            :label="$tr('layout.whosName', ['author']) + ' ' + (+i + 1)"
            :validations="$options.validations.authors.$each.authorName"
            :v="kw"
            :tooltip-label="
              $tr('layout.nameTooltip', [{ pt: 'author', en: 'lowAuthor' }])
            "
            field-name="authorName"
            class="control is-expanded"
          >
            <template #required>
              {{ $tr('layout.required') }}
            </template>
            <template #minLength="{ min }">
              {{ $tr('layout.minLength', [min]) }}
            </template>
          </input-validation>
          <div class="btn-block">
            <WithTooltip text="hey">
              <b-button
                :disabled="authors.length > 1"
                @click="authors.push({ authorName: '' })"
                icon-right="plus"
                class="is-success is-round is-outlined btn"
              >
              </b-button>
            </WithTooltip>
            <WithTooltip text="hey">
              <b-button
                v-if="i > 0"
                @click="authors.splice(i, 1)"
                icon-right="minus"
                class="is-danger is-round btn-margin is-outlined btn"
              ></b-button>
            </WithTooltip>
          </div>
        </div>

        <!-- <input-validation
            ref="authorSurname"
            v-model="$v.authorSurname.$model"
            :label="$tr('layout.whosSurname', ['author'])"
            :validations="$options.validations.authorSurname"
            :tooltip-label="
              $tr('layout.surnameTooltip', [{ pt: 'author', en: 'lowAuthor' }])
            "
            :v="$v"
            field-name="authorSurname"
            type="text"
          >
            <template #required>
              {{ $tr('layout.required') }}
            </template>
            <template #minLength="{ min }">
              {{ $tr('layout.minLength', [min]) }}
            </template>
          </input-validation> -->
      </div>
    </div>
    <!-- <div class="column is-half">
        <div class="input-float">
          <input-validation
            ref="author2Name"
            v-model="$v.author2Name.$model"
            :label="$tr('layout.whosName', ['secondaryAuthor'])"
            :validations="$options.validations.author2Name"
            :tooltip-label="
              $tr('layout.nameTooltip', [
                { pt: 'secondaryAuthor', en: 'lowSecondaryAuthor' }
              ])
            "
            :v="$v"
            field-name="author2Name"
            type="text"
          >
            <template #required>
              {{ $tr('layout.required') }}
            </template>
            <template #minLength="{ min }">
              {{ $tr('layout.minLength', [min]) }}
            </template>
          </input-validation>
          <input-validation
            ref="author2Surname"
            v-model="$v.author2Surname.$model"
            :label="$tr('layout.whosSurname', ['secondaryAuthor'])"
            :validations="$options.validations.author2Surname"
            :tooltip-label="
              $tr('layout.surnameTooltip', [
                { pt: 'secondaryAuthor', en: 'lowSecondaryAuthor' }
              ])
            "
            :v="$v"
            field-name="author2Surname"
            type="text"
          >
            <template #required>
              {{ $tr('layout.required') }}
            </template>
            <template #minLength="{ min }">
              {{ $tr('layout.minLength', [min]) }}
            </template>
          </input-validation>
        </div>
      </div> -->
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
    const { authors } = recovery('form')
    return {
      authors
    }
  },

  watch: {
    $v: {
      deep: true,
      handler($v) {
        replace('form', { authors: this.authors })
      }
    }
  },

  // beforeCreate() {
  //   if (!recovery('form').authors)
  //     replace('form', {
  //       authors: {
  //         authorName: '',
  //         authorSurname: '',
  //         author2Name: '',
  //         author2Surname: ''
  //       }
  //     })
  // },

  beforeCreate() {
    if (!recovery('form').authors)
      replace('form', {
        authors: [{ authorName: '' }]
      })
  },

  mounted() {
    this.$refs.authors[0].focus()
  },

  methods: {
    onHover(evt, action) {
      const btn = evt.target
      console.log(btn.classList)
      btn.classList.add('tt-btn-visible')
    },
    filterModels() {
      return Object.keys(this.$v).filter(k => !k.startsWith('$'))
    },

    checkNext() {
      const { authors } = this.$refs
      this.$v.$touch()
      for (const i in authors) {
        console.log(i, this.$refs.authors[i])
        if (this.$v.authors.$each[i].$invalid) {
          this.$refs.authors[i].focus()
          return false
        }
      }
      return true
    }
  },

  validations: {
    // authorName: {
    //   required,
    //   minLength: minLength(3)
    // },
    // authorSurname: {
    //   required,
    //   minLength: minLength(5)
    // },
    // author2Name: {
    //   minLength: minLength(3)
    // },
    // author2Surname: {
    //   minLength: minLength(5)
    // },

    authors: {
      required,
      minLength: minLength(1),
      $each: {
        authorName: {
          required,
          minLength: minLength(8)
        }
      }
    }
  }
}
</script>

<style scoped>
.input-float {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.btn-block {
  display: flex;
  margin-left: 1em;
  justify-content: space-between;
}

.btn {
  flex: 0 1 auto;
  margin: 0 0.3em;
  border-radius: 50%;
}
</style>
