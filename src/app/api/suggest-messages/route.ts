import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-1.5-pro-latest');

export async function POST(req: Request) {
	try {
		const {prompt} = await req.json();
		const stream = await streamText({
			model,
			prompt: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
		});

		return stream.toDataStreamResponse();
	} catch (error) {
		console.error('Error in suggest-messages:', error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}