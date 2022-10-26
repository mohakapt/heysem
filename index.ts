#!/usr/bin/env node

import { program } from 'commander';
import { prompt } from 'inquirer';
import open from 'open';
import packageJSON from './package.json';

// https://easings.net/#easeInOutQuad
const easeInOutQuad = (x: number) => 5 * Math.pow(x, 2) - 5 * x + 2;

// https://stackoverflow.com/a/41957152
const sleep = (millis: number) => new Promise(resolve => setTimeout(resolve, millis));

const clearLine = () => new Promise<void>(resolve => process.stdout.clearLine(-1, () => process.stdout.moveCursor(0, 0, resolve)));

const epicLog = async (message: string, after: number = 0, newline: boolean = true) => {
	const characters = Array.from(message);
	const count = characters.length;

	let lastStep = 0;
	for (let i = 0; i < characters.length; i++) {
		process.stdout.write(characters[i]);

		const currentStep = easeInOutQuad(i / count);
		await sleep(currentStep * 20);
		lastStep = currentStep;
	}

	await sleep(after);
	if (newline) process.stdout.write('\n');
};

program
	.name(packageJSON.name)
	.version(packageJSON.version)
	.description(packageJSON.description)
	.action(async () => {
		// https://stackoverflow.com/a/13245587
		const hours = new Date().getHours();
		const greeting = 'Good ' + (hours < 12 ? 'Morning' : hours < 18 ? 'Afternoon' : 'Evening');

		await epicLog(`🕵️ ${greeting} Agent 🕵️`, 1200);
		console.log('');

		await epicLog('In the wake of the current events, our organization received new ℹ intel indicating that a highly trained person is planning to take over 🌐 the internet.', 400);
		await epicLog('The person of interest goes by the nickname mohaka, He is a 💀 dangerous 👀 undercover agent pretending to be a 👨‍💻 software engineer.', 400);
		await epicLog('His real name however is Heysem and he\'s building a 🚀 sophisticated algorithm that can take control of 💻 any computer all over 🌍 the world.', 2800);
		console.log('');

		await epicLog('Your mission should you choose to accept it is to infiltrate the highly secured GitHub\'s main server, retrieve a copy of the algorithm\'s source, and destroy that repository once and for all.', 400);
		await epicLog('Be carefully agent ⚠️, this is not an ordinary mission, your target is know for his keen skills with 🖥️ computers, 📱 phones, and any device with a ⚙️ CPU.', 400);
		await epicLog('As always, should you or any member of your team be 🚔 caught or 🔫 killed, our organization will disavow any knowledge of your actions.', 2800);
		console.log('');

		await epicLog('Good Luck 🍀', 800);
		await epicLog('This message will self-destruct in 🧨 🧨 🧨 🧨 🧨', 0, false);

		await sleep(1000);
		process.stdout.clearLine(-1);
		process.stdout.cursorTo(0);
		process.stdout.write('This message will self-destruct in 🧨 🧨 🧨 🧨');

		await sleep(1000);
		process.stdout.clearLine(-1);
		process.stdout.cursorTo(0);
		process.stdout.write('This message will self-destruct in 🧨 🧨 🧨');

		await sleep(1000);
		process.stdout.clearLine(-1);
		process.stdout.cursorTo(0);
		process.stdout.write('This message will self-destruct in 🧨 🧨');

		await sleep(1000);
		process.stdout.clearLine(-1);
		process.stdout.cursorTo(0);
		process.stdout.write('This message will self-destruct in 🧨');

		await sleep(1000);

		console.log('\n\n');
		console.log('Ahh, Just kidding 🤪, Nice to meet ya 🤗');
		await sleep(1000);

		console.log('');
		console.log('My name is Heysem 👋');
		console.log('I make 📱 mobile apps for 🤖 Android and 🍎 iOS (sometimes just for fun), I\'m pretty good at designing my own 🎨 UI/UX and then converting my designs to real projects.');
		console.log('When I\'m not writing code or solving some kind of puzzle, I\'m probably playing ♟️ chess on Lichess so please join me there for a blitz game.');
		console.log('');

		const email = '✉️ Email';
		const github = '😺 GitHub';
		const stackoverflow = '💬 StackOverflow';
		const linkedin = '🔗 LinkedIn';
		const twitter = '🐦 Twitter';
		const lichess = '♟️ Lichess';

		const { choice } = await prompt({
			type: 'list',
			name: 'choice',
			message: 'Where to find me',
			choices: [email, github, stackoverflow, linkedin, twitter, lichess],
		});

		switch (choice) {
			case email:
				await open('mailto:mohakapt@gmail.com');
				break;
			case github:
				await open('https://github.com/mohakapt');
				break;
			case stackoverflow:
				await open('https://stackoverflow.com/users/1839334/heysem-katibi');
				break;
			case linkedin:
				await open('https://www.linkedin.com/in/heysem-katibi-51765a61/');
				break;
			case twitter:
				await open('https://twitter.com/heysem_k');
				break;
			case lichess:
				await open('https://lichess.org/@/mohakapt');
				break;
		}
	})
	.parse(process.argv);
