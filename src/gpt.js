import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

export async function getRecommendations(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-2024-05-13",
            messages: [{ role: "user", content: prompt }],
            stream: false,
        });
        const generatedText = response.choices[0].message.content;
        return generatedText;
    } catch (error) {
        console.error("Error fetching recommendations from OpenAI:", error);
    }
}
