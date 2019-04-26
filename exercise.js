const fs = require('fs');
const FreelancerService = require('./src/freelancer/freelancer.service');

const freelancerFile = './exercise/freelancer.json';

if (!fs.existsSync(freelancerFile)) {
  console.log('File does not exists');
  process.exit();
}

let freelancer = fs.readFileSync(freelancerFile, 'utf8');

// Catch parsing errors
try {
  freelancer = JSON.parse(freelancer);
} catch (e) {
  process.exit();
}

const freelancerService = new FreelancerService(freelancer);
// compute all skills duration
const freelancerWithComputedSkills = freelancerService.getFreeLancerWithComputedSkills();
// output result
console.log(JSON.stringify(freelancerWithComputedSkills, null, '\t'));


