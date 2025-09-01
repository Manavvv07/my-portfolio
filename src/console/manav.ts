import chalk from 'chalk';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import logUpdate from 'log-update';
import { setTimeout } from 'node:timers/promises';

// Clear console
console.clear();

// Soft color palette
const colors = {
  primary: chalk.hex('#8AADF4'),
  secondary: chalk.hex('#A6DA95'),
  accent: chalk.hex('#C6A0F6'),
  subtle: chalk.hex('#CAD3F5').dim,
  muted: chalk.hex('#B8C0E0').dim
};

// Gentle ASCII banner
console.log(
  colors.primary(
    figlet.textSync("Manav's Portfolio", {
      font: 'Slant',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  )
);

async function runAnimatedConsole() {
  // Soft typing welcome message
  const welcomeMessage = 'Welcome back, Manav';
  for (let i = 0; i <= welcomeMessage.length; i++) {
    logUpdate(
      colors.secondary(
        welcomeMessage.substring(0, i) + (i < welcomeMessage.length ? '∙' : '')
      )
    );
    await setTimeout(75);
  }
  logUpdate.done();

  // Ambient package check
  const packageSpinner = createSpinner('Checking project status...').start();
  await setTimeout(1800);
  packageSpinner.success({ text: colors.muted('Environment ready') });

  // Gentle loading animation
  const frames = ['◜', '◠', '◝', '◞', '◡', '◟'];
  let i = 0;
  const loadingInterval = setInterval(() => {
    const frame = frames[i % frames.length];
    logUpdate(colors.subtle(`${frame} preparing workspace...`));
    i = (i + 1) % frames.length;
  }, 180);

  await setTimeout(2500);
  clearInterval(loadingInterval);
  logUpdate.done();

  // Inspirational message
  console.log(colors.accent('\n✧ craft something meaningful today ✧'));

  // Subtle random tip
  const tips = [
    'remember to step away from the screen occasionally',
    'always check responsive design on mobile before pushing',
    'consider updating dependencies with `ncu -u` now and then'
  ];

  await setTimeout(800);
  console.log('\n' + colors.muted('• ' + tips[Math.floor(Math.random() * tips.length)] + ' •'));

  // Server startup
  await setTimeout(1000);
  console.log(colors.primary('\n• dev server initializing •'));
  await setTimeout(1200);

  console.log(colors.subtle('\npress ctrl+c when you’re ready to pause\n'));
}

// Run the animated console
runAnimatedConsole().catch(console.error);
