import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

export async function getRecommendations(systemPrompt, userPrompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            stream: false,
            temperature: 0.1 // Setting the temperature to a low value for consistency
        });
        const generatedText = response.choices[0].message.content;
        return generatedText;
    } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
    }
}
