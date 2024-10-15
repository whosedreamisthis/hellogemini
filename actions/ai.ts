'use server';
const { GoogleGenerativeAI } = require('@google/generative-ai');
import db from '@/utils/db';
import Query from '@/models/query';
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain',
};
/* eslint-disable @typescript-eslint/no-explicit-any */
let chatSession: any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function runAi(text: string) {
	chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [],
	});
	const result = await chatSession.sendMessage(text);
	return result.response.text();
}

export async function saveQuery(
	template: Object,
	email: string,
	query: string,
	content: string
) {
	try {
		await db();
		const newQuery = new Query({ template, email, query, content });

		await newQuery.save();
		return {
			ok: true,
		};
	} catch (err) {
		return {
			ok: false,
		};
	}
}

export async function initAi() {
	console.log('1 ai.ts initAi ');
	chatSession = model.startChat({
		generationConfig,
		// safetySettings: Adjust safety settings
		// See https://ai.google.dev/gemini-api/docs/safety-settings
		history: [],
	});
}

export async function getQueries(
	email: string,
	page: number,
	pageSize: number
) {
	try {
		console.log('1 ai.ts queries ');

		await db();

		const skip = (page - 1) * pageSize;
		const totalQueries = await Query.countDocuments({ email });

		const queries = await Query.find({ email }).skip(skip).limit(pageSize);
		//.sort({ createAt: -1 });
		console.log('ai.ts queries ', queries);
		return {
			queries,
			totalPages: Math.ceil(totalQueries / pageSize),
		};
	} catch (err) {
		return {
			ok: false,
		};
		console.log('ERRRR ', err);
	}
}
