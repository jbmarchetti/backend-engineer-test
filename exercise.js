const fs = require('fs');

const freelancerFile = './exercise/freelancer.json';

if (!fs.existsSync(freelancerFile)) {
  console.log('File does not exists');
}

let freelancer = fs.readFileSync(freelancerFile, 'utf8');

freelancer = JSON.parse(freelancer);

// compute all skills duration
console.log(freelancer);
// output result
