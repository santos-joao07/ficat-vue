<template>
  <Card :title="$tr('layout.prepareCard')">
    <div class="columns is-centered">
      <div class="column is-center is-5">
        <form @submit.prevent="onSubmit">
          <b-field>
            <WithTooltip :text="$tr('layout.fontFamilyTooltip')">
              <b-select
                ref="font"
                v-model="catalogFont"
                placeholder="Font"
                aria-placeholder="Font"
                rounded
                expanded
              >
                <option value="times">Times New Roman</option>
                <option value="arial">Arial</option>
              </b-select>
            </WithTooltip>
          </b-field>
          <div style="display:flex;margin:.5em">
            <WithTooltip :text="$tr('layout.solveCaptcha')">
              <div style="margin:auto">
                <recaptcha
                  @success="onSuccess"
                  @error="onSomeError('error')"
                  @expired="onSomeError('exp')"
                />
              </div>
            </WithTooltip>
          </div>
          <b-field>
            <WithTooltip :text="$tr('layout.generateTooltip')">
              <b-button
                :disabled="disabled"
                class="is-success"
                rounded
                expanded
                native-type="submit"
              >
                {{ $tr('layout.generate') }}
              </b-button>
            </WithTooltip>
          </b-field>
        </form>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card'
import WithTooltip from '~/components/WithTooltip'
import helper from '~/mixins/helper'
import { recovery, replace } from '~/front/persistence'
import { maybe, romanize } from '~/shared/frontUtils'

export default {
  name: 'SendCatalogDataForm',
  components: {
    Card,
    WithTooltip
  },
  mixins: [helper],

  data() {
    const { catalogFont } = recovery('form')
    return {
      catalogFont,
      touchedCaptcha: false,
      captchaHasError: false,
      captchaHasExpired: false,
      initialRef: 'font'
    }
  },

  computed: {
    disabled() {
      return (
        !this.touchedCaptcha || this.captchaHasError || this.captchaHasExpired
      )
    }
  },

  watch: {
    catalogFont() {
      replace('form', { catalogFont: this.catalogFont })
    }
  },

  beforeCreate() {
    if (!recovery('form').catalogFont)
      replace('form', {
        catalogFont: this.catalogFont || 'times'
      })
  },

  methods: {
    onSomeError(type) {
      const data = type === 'exp' ? 'captchaHasExpired' : 'captchaHasError'
      this.$set(this.$data, data, true)
    },

    onSuccess() {
      this.touchedCaptcha = true
      this.captchaHasError = false
      this.captchaHasExpired = false
    },

    onSubmit() {
      const form = recovery('form')
      const {
        authors,
        work,
        advisors,
        keywords,
        cotutorship,
        catalogFont
      } = form

      console.log(cotutorship)

      const totalPages =
        work.numberType === 'roman'
          ? romanize(+work.totalPages)
          : work.totalPages

      console.log(authors[0].authorName)
      this.$axios
        .post('/api/catalogCards', {
          keywords: keywords.map(k => k.text),
          authors: {
            authorName: authors[0].authorName,
            authorSurname: authors[0].authorSurname,
            ...maybe('author2Name', authors[1] ? authors[1].authorName : ''),
            ...maybe(
              'author2Surname',
              authors[1] ? authors[1].authorSurname : ''
            )
          },
          work: {
            workTitle: work.workTitle,
            ...maybe('workSubtitle', work.workSubtitle),
            presentationYear: work.presentationYear,
            workImagesType: work.workImagesType,
            totalPages,
            workType: work.workType
          },
          advisors: {
            advisorName: advisors.advisorName,
            advisorSurname: advisors.advisorName,
            isFemaleAdvisor: advisors.isFemaleAdvisor,
            advisorTitle: advisors.advisorTitle,
            ...maybe(
              'coadvisorName',
              advisors.coadvisors[0] ? advisors.coadvisors[0].coadvisorName : ''
            ),
            ...maybe('coadvisorSurname', ''),
            ...maybe(
              'isFemaleCoadvisor',
              advisors.coadvisors[0]
                ? advisors.coadvisors[0].isFemaleCoadvisor
                : false
            ),
            ...maybe(
              'coadvisorTitle',
              advisors.coadvisors[0]
                ? advisors.coadvisors[0].coadvisorTitle
                : ''
            ),
            ...maybe(
              'coadvisorXName',
              advisors.coadvisors[1] ? advisors.coadvisors[1].coadvisorName : ''
            ),
            ...maybe('coadvisorXSurname', ''),
            ...maybe(
              'isFemaleCoadvisorX',
              advisors.coadvisors[1]
                ? advisors.coadvisors[1].isFemaleCoadvisor
                : false
            ),
            ...maybe(
              'coadvisorXTitle',
              advisors.coadvisors[1]
                ? advisors.coadvisors[1].coadvisorTitle
                : ''
            )
          },
          academicDetails: {
            acdUnityId: work.selectedAcdUnity.id,
            knAreaId: work.selectedKnArea.id,
            courseId: work.course
          },
          cotutorship: {
            ...maybe(
              'cotutorshipAdvisorName',
              cotutorship ? cotutorship.cotutorshipAdvisorName : ''
            ),
            ...maybe(
              'isFemaleAdvisor',
              cotutorship ? cotutorship.isFemaleAdvisor : false
            ),
            ...maybe(
              'advisorTitle',
              cotutorship ? cotutorship.advisorTitle : false
            ),
            ...maybe(
              'cotutorshipInstitution',
              cotutorship ? cotutorship.cotutorshipInstitution : ''
            ),
            ...maybe(
              'cotutorshipProgram',
              cotutorship ? cotutorship.cotutorshipProgram : ''
            )
          },
          catalogFont
        })
        .then(response => {
          const location = response.headers['pdf-location']
          window.open(location, '_blank')
        })
        .catch()
        .finally(() => (this.loading = false))
    }
  }
}
</script>
