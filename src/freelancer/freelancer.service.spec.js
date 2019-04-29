const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const FreelancerService = require('./freelancer.service');
const periods = require('../../test/datasets/periods/periods.js');


/**
 *
 *
 * @param {json} fJson
 * @param {boolean} [emptySkills=false]
 */
function checkJsonFreelancer(fJson, emptySkills=false) {
  const freelancer = new FreelancerService(fJson).getFreeLancerWithMonthsSkillExperiences();
  expect(freelancer).to.be.an('object');
  expect(freelancer).to.have.property('freelance');
  expect(freelancer.freelance).to.have.property('id');
  if (emptySkills) {
    expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array').to.be.empty;
  } else {
    expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array');
  }
}

describe('Freelance Service', () => {
  before(() => {
    this.emptyFreelancerJson =fs.readFileSync('test/datasets/freelancers/empty-freelancer.json', 'utf8');
    this.fullFreelancerJson = fs.readFileSync('test/datasets/freelancers/full-freelancer.json', 'utf8');
    this.noExpFreelancerJson = fs.readFileSync('test/datasets/freelancers/no-exp-freelancer.json', 'utf8');
    this.noSkillsFreelancerJson = fs.readFileSync('test/datasets/freelancers/no-skills-freelancer.json', 'utf8');
    this.fullFreelancerInvalidStartDateJson = fs.readFileSync('test/datasets/freelancers/full-freelancer-invalid-start-date.json', 'utf8');
    this.fullFreelancerInvalidEndDateJson = fs.readFileSync('test/datasets/freelancers/full-freelancer-invalid-end-date.json', 'utf8');

    this.emptyFreelancerJson = JSON.parse(this.emptyFreelancerJson);
    this.fullFreelancerJson = JSON.parse(this.fullFreelancerJson);
    this.noExpFreelancerJson = JSON.parse(this.noExpFreelancerJson);
    this.noSkillsFreelancerJson = JSON.parse(this.noSkillsFreelancerJson);
    this.fullFreelancerInvalidStartDateJson = JSON.parse(this.fullFreelancerInvalidStartDateJson);
    this.fullFreelancerInvalidEndDateJson = JSON.parse(this.fullFreelancerInvalidEndDateJson);
  });


  describe('Compute Skill - Sum of months by periods', () => {
    periods.datas.forEach((p) => {
      it('should return '+p.result, () => {
        const months = FreelancerService.durationInMonthsByPeriods(p.periods);
        expect(months).to.equal(p.result);
      });
    });
  });

  describe('Get Computed Skills', () => {
    it('should return an array of skills with their monthly durations', () => {
      const skills = new FreelancerService(this.fullFreelancerJson).getMonthsSkillExperiences();
      expect(skills).to.be.an('array');
      skills.forEach((skill) => {
        expect(skill).to.have.property('id');
        expect(skill).to.have.property('name');
        expect(skill).have.property('durationInMonths');
        expect(skill).not.have.property('periods');
      });
    });

    it('should return an empty array', () => {
      const skills = new FreelancerService(this.emptyFreelancerJson).getMonthsSkillExperiences();
      expect(skills).to.be.empty;
    });
  });

  describe('Get FreeLancer with the total number of months he has worked', () => {
    it('should return freelancer with his skills', () => {
      checkJsonFreelancer(this.fullFreelancerJson);
    });

    it('should return freelancer with an empty skills array', () => {
      checkJsonFreelancer(this.emptyFreelancerJson, true);
    });

    it('should return freelancer with an empty skills array when no experiences', () => {
      checkJsonFreelancer(this.noExpFreelancerJson, true);
    });

    it('should return freelancer with an empty skills array when no skills', () => {
      checkJsonFreelancer(this.noSkillsFreelancerJson, true);
    });

    it('should return freelancer with his skills when there is an invalid startDate Value', () => {
      checkJsonFreelancer(this.fullFreelancerInvalidStartDateJson);
    });

    it('should return freelancer with his skills when there is an invalid endDate Value', () => {
      checkJsonFreelancer(this.fullFreelancerInvalidEndDateJson);
    });
  });
});
