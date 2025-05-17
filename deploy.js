const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to execute shell commands
function runCommand(command) {
  try {
    console.log(`\n> ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Main deployment function
async function deploy() {
  console.log('=== Ephemeral Chat Deployment Helper ===');
  console.log('This script will help you deploy your app to Render.com or Heroku');
  
  rl.question('\nWhere would you like to deploy? (1 for Render, 2 for Heroku): ', async (choice) => {
    if (choice === '1') {
      await deployToRender();
    } else if (choice === '2') {
      await deployToHeroku();
    } else {
      console.log('Invalid choice. Please run the script again and select 1 or 2.');
      rl.close();
    }
  });
}

// Deploy to Render.com
async function deployToRender() {
  console.log('\n=== Deploying to Render.com ===');
  console.log('1. Make sure you have a GitHub account and have pushed your code there');
  console.log('2. Go to https://render.com and create an account if you don\'t have one');
  console.log('3. From your dashboard, click "New" and select "Web Service"');
  console.log('4. Connect your GitHub repository or use the "Public Git repository" option');
  console.log('5. Configure the service with these settings:');
  console.log('   - Name: ephemeral-chat (or your preferred name)');
  console.log('   - Environment: Node');
  console.log('   - Build Command: npm install');
  console.log('   - Start Command: npm start');
  console.log('   - Plan: Free');
  console.log('6. Click "Create Web Service"');
  
  rl.question('\nDo you have a GitHub repository for this project? (y/n): ', async (hasRepo) => {
    if (hasRepo.toLowerCase() === 'y') {
      console.log('\nGreat! Follow the steps above to deploy your app on Render.com');
    } else {
      console.log('\nLet\'s create a GitHub repository for your project:');
      console.log('1. Go to https://github.com/new');
      console.log('2. Create a new repository named "ephemeral-chat"');
      console.log('3. Follow the instructions to push your existing code to the repository');
      console.log('4. Then follow the Render.com deployment steps above');
    }
    rl.close();
  });
}

// Deploy to Heroku
async function deployToHeroku() {
  console.log('\n=== Deploying to Heroku ===');
  console.log('Checking if Heroku CLI is installed...');
  
  try {
    runCommand('heroku --version');
    console.log('Heroku CLI is installed. Proceeding with deployment...');
    
    rl.question('\nDo you have a Heroku account and are you logged in? (y/n): ', async (loggedIn) => {
      if (loggedIn.toLowerCase() === 'n') {
        console.log('\nPlease create a Heroku account at https://signup.heroku.com');
        console.log('Then install the Heroku CLI and login with:');
        console.log('heroku login');
        rl.close();
        return;
      }
      
      rl.question('\nEnter a name for your Heroku app (letters, numbers, and dashes only): ', async (appName) => {
        console.log(`\nCreating Heroku app: ${appName}...`);
        runCommand(`heroku create ${appName}`);
        
        console.log('\nPushing code to Heroku...');
        runCommand('git add .');
        runCommand('git commit -m "Prepare for Heroku deployment"');
        runCommand('git push heroku main');
        
        console.log('\nOpening your deployed app...');
        runCommand('heroku open');
        
        rl.close();
      });
    });
  } catch (error) {
    console.log('Heroku CLI is not installed. Please install it first:');
    console.log('npm install -g heroku');
    console.log('Then run this script again.');
    rl.close();
  }
}

// Start the deployment process
deploy();
