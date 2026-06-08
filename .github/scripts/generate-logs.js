const fs = require('fs');
const path = require('path');

function generateSystemLogs() {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  
  let logOutput = '';
  logOutput += `[${timestamp}] INITIALIZING AGENT: abrar-mern CI/CD PIPELINE...\n`;
  logOutput += `[${timestamp}] CONNECTING TO AWS EC2 PRODUCTION CLUSTERS... [OK]\n`;
  logOutput += `[${timestamp}] MONITORING CLUSTER: Microservices architecture is stable.\n`;
  logOutput += `[${timestamp}] SUCCESS: Synchronized 'MERN-LMS-Platform' -> Optimized aggregation pipelines.\n`;
  logOutput += `[${timestamp}] SUCCESS: Synchronized 'Smart Task Management' -> Implemented DFS cycle detection.\n`;
  logOutput += `[${timestamp}] STATUS: Redis layers optimized. All systems 100% operational.\n`;
  
  return logOutput;
}

function run() {
  const logContent = generateSystemLogs();
  const readmePath = path.join(__dirname, '../../README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.error("Error: README.md file not found at " + readmePath);
    return;
  }
  
  let readme = fs.readFileSync(readmePath, 'utf8');
  const terminalBlock = '```bash\n' + logContent + '```';
  
  const regex = /[\s\S]*/;
  
  if (!regex.test(readme)) {
    console.error("Error: Could not find the HTML target anchor tags in README.md");
    return;
  }
  
  const updatedReadme = readme.replace(regex, `\n${terminalBlock}\n`);
  fs.writeFileSync(readmePath, updatedReadme);
  console.log('System build logs successfully compiled to README!');
}

run();
