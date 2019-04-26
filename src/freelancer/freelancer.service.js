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
  getFreeLancerWithComputedSkills() {
    const result = {
      'freelance': {
        'id': this.freelance.id,
        'computedSkills': this.getComputedSkills(),
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
  getComputedSkills() {
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

            skills[skill.id].periods.push({
              startDate: moment(exp.startDate),
              endDate: moment(exp.endDate),
            });
          });
        }
      });
    }

    skills = Object.values(skills);

    skills.map((skill) => {
      skill.durationInMonths = this.computeSkill(skill.periods);
      delete(skill.periods);
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
  computeSkill(periods) {
    let months = 0;
    periods.sort((p1, p2) => p1.startDate.diff(p2.startDate));
    let endDateMax = null;

    periods.forEach((p) => {
      if (endDateMax) {
        if (p.startDate > endDateMax) {
          months += -p.startDate.diff(p.endDate, 'months', false);
        } else if (endDateMax < p.endDate) {
          months += -endDateMax.diff(p.endDate, 'months', false);
        }

        if (p.endDate.diff(endDateMax) >0) {
          endDateMax = p.endDate;
        }
      } else {
        months += -p.startDate.diff(p.endDate, 'months', false);
        endDateMax = p.endDate;
      }
    });

    return months;
  }
}

module.exports = FreelancerService;
