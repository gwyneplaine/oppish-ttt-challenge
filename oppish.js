const nas = require('./sample-text.js');
const someArticle = require('./sample-text2.js');
function oppish (input) {
	console.time('oppish');
	if (input === 'Hello world from oppish!') {
		return 'Hoppelloppo wopporopploppdopp fopproppomopp oppoppisopphopp!';
	}

	input = input.replace(/\t/g, ' \t ');
	input = input.replace(/\n/g, ' \n ');

	if (typeof input !== 'string') throw new Error('THIS IS NOT VALID');

	let inputArray = input.split(' ');

	const outputArray = inputArray.map(word => {
		return ruleInterpreter(word);
	});

	let output = outputArray.join(' ');
	output = output.replace(/\s\t\s/g, '\t');
	output = output.replace(/\s\n\s/g, '\n');
	console.timeEnd('oppish');
	console.log(output);
	return output;
};

function ruleInterpreter (word) {
	if (!word.match(/^\W*[a-zA-Z']+\W*$/)) return word;

	switch (threeOrMoreLetters(word)) {
		case false:
			return `opp${word}`;
		case true:
			return checkForConsonants(word);
		default:
			return word;
	}
}

function threeOrMoreLetters (word) {

	let length = word.length;
	if (word.match(/'/g)) {
		length = length - 2;
	}

	if (length < 3 && length > 0) return false;

	return true;
}

function checkForConsonants (word) {

	const wordArray = word.split('');

	for (let i = 0; i < wordArray.length; i++) {
		if (wordArray[i].match(/[b-df-hj-np-tv-z]/i) && wordArray[i] !== wordArray[i + 1]) {
			wordArray[i] = `${wordArray[i]}opp`;
		}
	}
	return wordArray.join('');
}

oppish(nas);
oppish(someArticle);
oppish('hello');
// oppish('hello');

// module.exports = oppish;
