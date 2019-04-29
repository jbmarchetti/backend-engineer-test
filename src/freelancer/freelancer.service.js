const moment = require('moment');
/**
 * Service who Compute the total number of months the freelancer has worked for each skill
 *
 * @class FreelancerService
 */
class FreelancerService {
  /**
   * Creates an instance of FreelanceService.
   * @param {JSON} freelancer
   * @memberof FreelanceService
   */
  constructor(freelancer) {
    this.freelance = freelancer.freelance;
  }

  /**
   * Return a freelancer with his skills
   *
   * @return {JSON}
   * @memberof FreelanceService
   */
  getFreeLancerWithMonthsSkillExperiences() {
    const result = {
      'freelance': {
        'id': this.freelance.id,
        'computedSkills': this.getMonthsSkillExperiences(),
      },
    };

    return result;
  }


  /**
   * Compute the total number of months the freelancer has worked for each skill
   *
   * @return {Array}
   * @memberof FreelanceService
   */
  getMonthsSkillExperiences() {
    let skills = {};

    if (this.freelance.professionalExperiences && Array.isArray(this.freelance.professionalExperiences)) {
      this.freelance.professionalExperiences.forEach((exp) => {
        if (exp.skills && Array.isArray(exp.skills)) {
          exp.skills.forEach((skill) => {
            // Init Skill
            if (!skills[skill.id]) {
              skills[skill.id] = {
                'id': skill.id,
                'name': skill.name,
                'durationInMonths': 0,
                'periods': [],
              };
            }

            if (exp.startDate && exp.endDate) {
              const startDate = moment(exp.startDate, moment.ISO_8601);
              const endDate = moment(exp.endDate, moment.ISO_8601);
              if (startDate.isValid() && endDate.isValid()) {
                skills[skill.id].periods.push({
                  startDate: startDate,
                  endDate: endDate,
                });
              }
            }
          });
        }
      });
    }

    skills = Object.values(skills);

    skills.map((skill) => {
      skill.durationInMonths = FreelancerService.durationInMonthsByPeriods(skill.periods);
      delete (skill.periods);
    });

    return skills;
  }


  /**
   * Return the sum of months by periods
   * Check months overlapping
   *
   * @param {Array} periods
   * @return {Number}
   * @memberof FreelanceService
   */
  static durationInMonthsByPeriods(periods) {
    let months = 0;
    periods.sort((p1, p2) => p1.startDate.diff(p2.startDate));
    let endDateMax = null;

    periods.forEach((p) => {
      if (endDateMax) {
        if (p.startDate > endDateMax) {
          months += p.endDate.diff(p.startDate, 'months', false);
        } else if (endDateMax < p.endDate) {
          months += p.endDate.diff(endDateMax, 'months', false);
        }

        if (p.endDate.diff(endDateMax) > 0) {
          endDateMax = p.endDate;
        }
      } else {
        months += p.endDate.diff(p.startDate, 'months', false);
        endDateMax = p.endDate;
      }
    });

    return months;
  }
}

module.exports = FreelancerService;
