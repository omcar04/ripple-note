import {NextRequest, NextResponse} from 'next/server';
import {ChatOpenAI} from '@langchain/openai';
import {PromptTemplate} from '@langchain/core/prompts';

export async function POST(req: NextRequest) {
    const {summary} = await req.json();

    if (!summary) {
        return NextResponse.json({error: 'Missing summary'}, {status: 400});
    }


    try {
        const model = new ChatOpenAI({
            temperature: 0.4,
            model: 'gpt-3.5-turbo', // or gpt-4 if needed
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = new PromptTemplate({
            template: `
Write a professional email to a team summarizing the key points below from a meeting.
Be clear and concise. Include a subject line. 

Meeting Summary:
{summary}

Email:
`,
            inputVariables: ['summary'],
        });

        const formattedPrompt = await prompt.format({summary});
        const result = await model.invoke(formattedPrompt);

        return NextResponse.json({email: result.content});
    } catch (err) {
        console.error('Email generation error:', err);
        return NextResponse.json({error: 'Failed to generate email'}, {status: 500});
    }
}
