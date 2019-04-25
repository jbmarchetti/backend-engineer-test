const moment = require('moment');
/**
 *
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
   * Return a freelancer with his "computed skills"
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
   * Return an array of computed skills
   *
   * @return {Array}
   * @memberof FreelanceService
   */
  getComputedSkills() {
    let skills = {};

    if (this.freelance.professionalExperiences) {
      this.freelance.professionalExperiences.forEach((exp) => {
        if (exp.skills) {
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
   * Compute the total of months by periods
   * Check months intersections
   *
   * @param {Array} periods
   * @return {Number}
   * @memberof FreelanceService
   */
  computeSkill(periods) {
    let months = 0;
    periods.sort((p1, p2) => p1.startDate.diff(p2.startDate));
    let lastPeriod = null;

    periods.forEach((p) => {
      if (lastPeriod) {
        if (p.startDate > lastPeriod.endDate) {
          months += -p.startDate.diff(p.endDate, 'months', false);
        } else if ( lastPeriod.endDate < p.endDate) {
          months += -lastPeriod.endDate.diff(p.endDate, 'months', false);
        }
      } else {
        months += -p.startDate.diff(p.endDate, 'months', false);
      }

      lastPeriod = p;
    });

    return months;
  }
}

module.exports = FreelancerService;
