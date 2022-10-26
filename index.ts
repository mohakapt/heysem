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
