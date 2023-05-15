import type { RequestHandler } from './$types'
import { OPENAI_KEY } from '$env/static/private'
import { oneLine, stripIndent } from 'common-tags'
import type { CreateCompletionRequest } from 'openai'
import { error, type Config } from '@sveltejs/kit'


export const config: Config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!OPENAI_KEY) {
			throw new Error('OPENAI_KEY is not set');
		}

		const requestData = await request.json();
		if (!requestData) {
			throw new Error('Request is not set');
		}

		const { context } = requestData;
		if (!context) {
			throw new Error('Context is not set');
		}

		const prompt = stripIndent`
        ${oneLine`
         You are an AI that analyzes if a question contains questionnaire bias. Reply with a minimal response that indicates if the question could create bias or if it won't. 
         Types of biased questions include, leading questions, loaded questions, double-barreled questions, ambiguous questions, vague questions, technical questions, and personal questions.
         If you detect bias include what type of question you detected. 
        `}

        Context: """${context.trim()}"""

        Answer:
        `;
		const completeionOpts: CreateCompletionRequest = {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 100,
			temperature: 0.5,
			stream: true
		};

		const response = await fetch('https://api.openai.com/v1/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(completeionOpts)
		});

		if (!response.ok) {
			throw new Error('OpenAI API error');
		}

		return new Response(response.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		});
	} catch (err) {
		console.error(err);
		throw error(500, 'SERVER ERROR');
	}
};
