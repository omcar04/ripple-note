import {ChatOpenAI} from "@langchain/openai";
import {PromptTemplate} from "@langchain/core/prompts";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const {transcript} = await req.json();

    // const transcript = "Hey everyone, quick update on the “Smart Notes” feature we’re adding to the dashboard.\n" +
    //     "So far, I’ve implemented the UI for the collapsible notes section using Tailwind and integrated it with our existing component structure. The design matches the latest Figma spec, including the dynamic character counter and auto-save indicators.\n" +
    //     "\n" +
    //     "On the functionality side, I hooked it up to the /api/notes endpoint. I’m currently using optimistic UI updates, so users see their changes immediately, and the API response syncs in the background. It's working well in staging—no major bugs so far.\n" +
    //     "\n" +
    //     "One blocker I had earlier was the debounce logic for auto-save—it was triggering too frequently. I refactored it using useRef and setTimeout to ensure it only fires after 2 seconds of inactivity. That fixed the flickering save state issue.\n" +
    //     "\n" +
    //     "Next up, I’m adding rich text support using draft-js. If all goes well, I’ll wrap that by tomorrow EOD. That’s it from my side!"

    if (!transcript) {
        return NextResponse.json({error: "Transcript is required"}, {status: 400});
    }

    try {
        const model = new ChatOpenAI({
            temperature: 0.5,
            model: "gpt-3.5-turbo-0125",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = new PromptTemplate({
            template: `
You are a concise summarizer. 
Extract only the most important facts or insights from the transcript. 
Do not include any filler, repetition, or general commentary. 
Respond with a list of 3-5 bullet points. Each bullet should be one sentence.

Transcript:
{input}

Key Points:
-`,
            inputVariables: ["input"],
        });
        const formattedPrompt = await prompt.format({input: transcript});
        const result = await model.invoke(formattedPrompt);

        return NextResponse.json({summary: result});
    } catch (error) {
        console.error("Summarization error:", error);
        return NextResponse.json({error: "Summarization failed"}, {status: 500});
    }
}
