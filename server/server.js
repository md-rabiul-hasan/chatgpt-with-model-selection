import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-BkBV1Ulgpvlap1DCOeBu5ZbC",
    apiKey: "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",
});

// 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

const openai = new OpenAIApi(configuration);

async function callOpenAi(){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text);
}

callOpenAi();