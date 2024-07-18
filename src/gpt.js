import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

export async function getRecommendations(systemPrompt, userPrompt) {
    try {
        const response = await openai.chat.completions.create({
            // model: "gpt-4o-2024-05-13",
            model: "gpt-3.5-turbo-0125",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            stream: false,
        });
        const generatedText = response.choices[0].message.content;
        return generatedText;
    } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
    }
}
