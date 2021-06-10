module.exports = {
  catalogFields: {
    authors: {
      mandatory: [
        'authorName',
        'authorSurname',
        'author2Name',
        'author2Surname'
      ],
      optional: ['author2Name', 'author2Surname']
    },

    cotutorship: {
      optional: [
        'cotutorshipAdvisorName',
        'isFemaleAdvisor',
        'advisorTitle',
        'cotutorshipProgram',
        'cotutorshipInstitution'
      ]
    },

    work: {
      mandatory: [
        'workTitle',
        'workSubtitle',
        'presentationYear',
        'workImagesType',
        'totalPages',
        'workType'
      ],
      optional: ['workSubtitle']
    },
    advisors: {
      mandatory: [
        'advisorName',
        'advisorSurname',
        'isFemaleAdvisor',
        'advisorTitle',
        'coadvisorName',
        'coadvisorSurname',
        'isFemaleCoadvisor',
        'coadvisorTitle'
      ],
      optional: [
        'coadvisorName',
        'coadvisorSurname',
        'isFemaleCoadvisor',
        'coadvisorTitle'
      ]
    },
    academicDetails: ['acdUnityId', 'knAreaId', 'courseId'],
    fonts: ['times', 'arial']
  },
  querieFields: {
    monthly: {
      mandatory: ['year', 'month', 'unityId', 'type', 'courseId'],
      optional: ['month', 'unityId', 'type', 'courseId']
    },
    semiannually: {
      mandatory: ['year', 'semester', 'unityId', 'type', 'courseId'],
      optional: ['semester', 'unityId', 'type', 'courseId']
    },
    annually: {
      mandatory: ['year', 'unityAcronym', 'type', 'courseId'],
      optional: ['unityAcronym', 'type', 'courseId']
    }
  },
  users: {
    create: {
      mandatory: ['username', 'password', 'active']
    },
    update: {
      mandatory: ['active', 'username', 'password']
      // optional: ['password']
    }
  },
  knowledgeAreas: {
    create: {
      mandatory: ['code', 'description']
    },
    update: {
      mandatory: ['code', 'description']
    }
  },
  courses: {
    create: {
      mandatory: ['name', 'program', 'type', 'unityAcronym']
    },
    update: {
      mandatory: ['description']
    }
  },
  academicUnities: {
    create: {
      mandatory: ['name', 'acronym']
    },
    update: {
      mandatory: ['name', 'acronym'],
      optional: ['name', 'acronym']
    }
  },
  auth: {
    mandatory: ['username', 'password', 'rememberMe'],
    optional: ['rememberMe']
  },
  authz: {
    mandatory: ['accessToken']
  },
  catalogCard: {
    mandatory: [
      'keywords',
      'work',
      'advisors',
      'authors',
      'academicDetails',
      'catalogFont',
      'cotutorship',
      'userEmail'
    ]
  },
  email: {
    mandatory: ['name', 'email', 'fone', 'msg']
  }
}
