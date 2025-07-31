import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyAS4eQId7Sw-LX4enKr1DjH07rjEwRW2M0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});


// const genAI = new GoogleGenerativeAI("AIzaSyAS4eQId7Sw-LX4enKr1DjH07rjEwRW2M0");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.Pornography,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.HateSpeech,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.Harassment,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.SelfHarm,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.DangerousContent,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.SexualContent,
        threshold: HarmBlockThreshold.Moderate,
    },
    {
        category: HarmCategory.Violence,
        threshold: HarmBlockThreshold.Moderate,
    }
];

export { model, generationConfig, safetySettings };

export const chatSession = model.startChat({
    generationConfig,
});
