const fs = require('fs');

const freelancerFile = './exercise/freelancer.json';

if (!fs.existsSync(freelancerFile)) {
  console.log('File does not exists');
}

let freelancer = fs.readFileSync(freelancerFile, 'utf8');

try {
  freelancer = JSON.parse(freelancer);
} catch (e) {
  process.exit();
}

// compute all skills duration
console.log(freelancer);


// output result
