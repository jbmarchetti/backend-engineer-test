const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const FreelancerService = require('./freelancer.service');
const periods = require('../../test/datasets/periods/periods.js');

describe('Freelance Service', () => {
  before(() => {
    this.emptyFreelancerJson =fs.readFileSync('test/datasets/freelancers/empty-freelancer.json', 'utf8');
    this.fullFreelancerJson = fs.readFileSync('test/datasets/freelancers/full-freelancer.json', 'utf8');
    this.noExpFreelancerJson = fs.readFileSync('test/datasets/freelancers/no-exp-freelancer.json', 'utf8');
    this.noSkillsFreelancerJson = fs.readFileSync('test/datasets/freelancers/no-skills-freelancer.json', 'utf8');

    this.emptyFreelancerJson = JSON.parse(this.emptyFreelancerJson);
    this.fullFreelancerJson = JSON.parse(this.fullFreelancerJson);
    this.noExpFreelancerJson = JSON.parse(this.noExpFreelancerJson);
    this.noSkillsFreelancerJson = JSON.parse(this.noSkillsFreelancerJson);
  });


  describe('Compute Skill', () => {
    it('should return 11 - array sorted by startDate', () => {
      const months = new FreelancerService({}).computeSkill(periods.periods11Months);
      expect(months).to.equal(11);
    });

    it('should return 11 - array unsorted', () => {
      const months = new FreelancerService({}).computeSkill(periods.periods11MonthsBis);
      expect(months).to.equal(11);
    });

    it('should return 0 if array is empty', () => {
      const months = new FreelancerService({}).computeSkill(periods.periods0Months);
      expect(months).to.equal(0);
    });


    it('should return 60', () => {
      const months = new FreelancerService({}).computeSkill(periods.periods60Months);
      expect(months).to.equal(60);
    });
  });

  describe('Get Computed Skills', () => {
    it('should return an array of skills with their monthly durations', () => {
      const skills = new FreelancerService(this.fullFreelancerJson).getComputedSkills();
      expect(skills).to.be.an('array');
      skills.forEach((skill) => {
        expect(skill).to.have.property('id');
        expect(skill).to.have.property('name');
        expect(skill).have.property('durationInMonths');
        expect(skill).not.have.property('periods');
      });
    });

    it('should return an empty array', () => {
      const skills = new FreelancerService(this.emptyFreelancerJson).getComputedSkills();
      expect(skills).to.be.empty;
    });
  });

  describe('Get FreeLancer With Computed Skills', () => {
    it('should return a freelancer with his computed skills', () => {
      const freelancer = new FreelancerService(this.fullFreelancerJson).getFreeLancerWithComputedSkills();
      expect(freelancer).to.be.an('object');
      expect(freelancer).to.have.property('freelance');
      expect(freelancer.freelance).to.have.property('id');
      expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array');
    });

    it('should return freelancer with an empty array', () => {
      const freelancer = new FreelancerService(this.emptyFreelancerJson).getFreeLancerWithComputedSkills();
      expect(freelancer).to.be.an('object');
      expect(freelancer).to.have.property('freelance');
      expect(freelancer.freelance).to.have.property('id');
      expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array').to.be.empty;
    });

    it('should return freelancer with an empty array when no experiences', () => {
      const freelancer = new FreelancerService(this.noExpFreelancerJson).getFreeLancerWithComputedSkills();
      expect(freelancer).to.be.an('object');
      expect(freelancer).to.have.property('freelance');
      expect(freelancer.freelance).to.have.property('id');
      expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array').to.be.empty;
    });

    it('should return freelancer with an empty array when no skills', () => {
      const freelancer = new FreelancerService(this.noSkillsFreelancerJson).getFreeLancerWithComputedSkills();
      expect(freelancer).to.be.an('object');
      expect(freelancer).to.have.property('freelance');
      expect(freelancer.freelance).to.have.property('id');
      expect(freelancer.freelance).to.have.property('computedSkills').and.to.be.an('array').to.be.empty;
    });
  });
});
