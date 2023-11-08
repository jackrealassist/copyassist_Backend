const OpenAI = require('openai');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const express = require("express");
const axios = require("axios");

const router = express.Router();

/**
 * This function is used to get the property data from the rentcast api.
 * @param {*} address 
 * @returns 
 */
const getPropertyData = async (address) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.rentcast.io/v1/properties?address=${address}`,
        headers: {
            'x-api-key': 'da65a87cbd2d4d208a90c9eb4d881358'
        }
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// move to controllers later
const generateCopy = async (data, length, post_for) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                bedrooms,
                squareFootage,
                county,
                propertyType,
                city,
                state,
                zipCode,
                formattedAddress,
                bathrooms,
                yearBuilt,
                lotSize,
                id,
                longitude,
                latitude
            } = data;

            console.log(data);

            // const openai = new OpenAI({
            //     apiKey: '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', // store in env variables later
            // });

            const client = new OpenAIClient(
                "https://realassist.openai.azure.com/",
                new AzureKeyCredential("db63da6de13a471eb98529801d849116")
            );

            const promptWithEmoji = `Create a ${length} compelling property listing for ${post_for} for a ${propertyType} provided variables.
             Your goal is to capture the essence of the property and make it appealing to potential buyers or renters. :
            * DO NOT add any extra details that are not provided in the variables.
            * Add emojis to make the listing more appealing.
          
            🏢 Property Type: ${propertyType}
            🛏 Bedrooms: ${bedrooms}
            🚿 Bathrooms: ${bathrooms}
            📐 Square Footage: ${squareFootage} sq. ft.
            🌆 Location: ${city}, ${state} ${zipCode}, ${county}
            🏡 Address: ${formattedAddress}
            🏗 Year Built: ${yearBuilt}
            🌳 Lot Size: ${lotSize} acres
            🗺 Coordinates: Latitude ${latitude}, Longitude ${longitude}
            
            Generate some relevant but right description by yourself.

            Here's a sample description for a reference:

            Just listed 📈

            Spacious apartment with 2 bedrooms, 1 bathroom, and two off-street parking spots.
            🙌
            Minutes from the beach and Clouds FM. 😎
            👨‍🏫
            Great for downsizing or as an investment property! ⛽️💰💵
            `

            const promptMLS = `Create a 250 words compelling property listing for ${post_for} for a ${propertyType} provided variables.
            * DO NOT add any extra details that are not provided in the variables.
                
            Property Type: ${propertyType}
            Bedrooms: ${bedrooms}
            Bathrooms: ${bathrooms}
            Square Footage: ${squareFootage} sq. ft.
            Location: ${city}, ${state} ${zipCode}, ${county}
            Address: ${formattedAddress}
            Year Built: ${yearBuilt}
            Lot Size: ${lotSize} acres
            Coordinates: Latitude ${latitude}, Longitude ${longitude}
            `

            let prompt;

            post_for === "MLS" ? prompt = promptMLS : prompt = promptWithEmoji;

            const messages = [
                { role: "system", content: "You are a realestate copywriter. You must not add any detail by yourself." },
                { role: "user", content: "Can you help me draft a realestate property listing message?" },
                { role: "assistant", content: "Yes" },
                { role: "user", content: "Can you make sure to not add any information by yourself other than the information which has been provided?" },
                { role: "assistant", content: "Yes" },
                { role: "user", content: prompt },
            ];

            const result = await client.getChatCompletions("modalChatbot", messages, { maxTokens: 1000 });

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

const generateCopyResponse = async (messages, reply) => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = new OpenAIClient(
                "https://realassist.openai.azure.com/",
                new AzureKeyCredential("db63da6de13a471eb98529801d849116")
            );

            const result = await client.getChatCompletions("modalChatbot", messages, { maxTokens: 2000 });

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

const getResponse = async (messages) => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = new OpenAIClient(
                "https://realassist.openai.azure.com/",
                new AzureKeyCredential("db63da6de13a471eb98529801d849116")
            );

            const result = await client.getChatCompletions("modalChatbot", messages, { maxTokens: 2000 });

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = function (app) {
    app.post("/api/getRentCastData", async (req, res) => {
        try {
            const { address } = req.body;
            console.log(address);
            const propertyData = await getPropertyData(address);
            res.send(propertyData)
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went Wrong");
        }
    })

    /*
     We'll need to reimplement the business logic later.
    */
    app.post("/api/getNearbyAmenities", async (req, res) => {
        try {

            const {
                lat,
                lng
            } = req.body;

            console.log(lat, lng);

            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `https://api.styldod.com/api_v2/ai-marketing-hub/get-near-by-amenities?lng=${lng}&lat=${lat}&radius=3000`,
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2hhaGJheiBBbGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTDBZTVh3aUg1ZEs3bEl0MFY3M1JxV0c5em5ycUhpY3lJXzA2bDk3RTkxX3c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYjJjLXdlYi1mdWxsIiwiYXVkIjoiYjJjLXdlYi1mdWxsIiwiYXV0aF90aW1lIjoxNjk5Mzc5NTcxLCJ1c2VyX2lkIjoiZ3MzNnZyRHIyRVRvQXg3Mlk5eng0SnNsVmNxMSIsInN1YiI6ImdzMzZ2ckRyMkVUb0F4NzJZOXp4NEpzbFZjcTEiLCJpYXQiOjE2OTkzNzk1NzEsImV4cCI6MTY5OTM4MzE3MSwiZW1haWwiOiJzaGFoYmF6LmFsaS5jb25uZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNDQ1MjQyMzYyMzc4ODU1ODE4Il0sImVtYWlsIjpbInNoYWhiYXouYWxpLmNvbm5lY3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.LXov7EI_m0X9aKxUhi8L7l9flNEv4eagQUPzKQ3yZupz_-RBdFEwS3P0-TzbuVG_Eco_eKx0_eO0uXoFCMU2Idn03SuzOsFLlWWtvGq6xIqP9doY_yeDtUfpVK8s8Ly2rAIRCMwzpsoC5bBs2WipCY_7wCfzo7p6F_3sEDhsqmHB9bM4nFVHcBGgfBTGDmdgjnetrBpTNTqLyWT10vXRp1uKXOsN9fNizBC9gRUr_bXvu5o8JsypPEPW_Lf09ETonL4-M2U1pfwZCBxy-gTBjBS2OQDdjGWUji4_bfm40wd7oO0jEt0voW5CdhPHVWTs_bY68y_unSD1XVT54SjpOQ",
                }, // This might get expired and need to be updated.
            };

            axios
                .request(config)
                .then((response) => {
                    res.send(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
            res.status(500).send("Something went Wrong");
        }
    })

    app.post("/api/copyAssist", async (req, res) => {
        try {
            const {
                address,
                length,
                post_for
            } = req.body;

            const propertyData = await getPropertyData(address);

            const copy = await generateCopy(propertyData[0], length, post_for);

            console.log(copy);
            res.send(copy.choices[0].message);

        } catch (err) {
            console.log(err);
            res.status(404).send({
                message: "Can't find the property information."
            });
        }

    });

    app.post("/api/genrateCopyWriterResponse", async (req, res) => {
        try {
            const {
                messages,
                reply,
            } = req.body;

            messages.push({ role: "user", content: reply });
            const copy = await generateCopyResponse(messages, reply);
            console.log(copy);
            messages.push({ role: "assistant", content: copy.choices[0].message.content });
            res.send(messages);

        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Some Error Occured."
            });
        }

    });

    app.post("/api/generatePropertyDescription", async (req, res) => {
        try {
            const {
                propertyDetails,
                previouslyGeneratedDescription,
                command,
            } = req.body;

            let messages = [];

            if (previouslyGeneratedDescription !== "") {
                messages = [
                    { role: "system", content: "You are a realestate copywriter who writes Property Description from given details. You must not add any detail by yourself." },
                    { role: "user", content: "Can you help me draft a realestate property Description?" },
                    { role: "assistant", content: "Yes" },
                    { role: "user", content: "Can you make sure to not add any information by yourself other than the information which has been provided?" },
                    { role: "assistant", content: "Yes" },
                    { role: "user", content: `Make sure to reply only the property description not sentences like "Here's your description" etc..` },
                    { role: "user", content: `Create a compelling property Description for following provided variables : ${propertyDetails}.` },
                    { role: "assistant", content: previouslyGeneratedDescription },
                    { role: "user", content: command },
                ];
            } else {

                messages = [
                    { role: "system", content: "You are a realestate copywriter who writes Property Description from given details. You must not add any detail by yourself." },
                    { role: "user", content: "Can you help me draft a realestate property Description?" },
                    { role: "assistant", content: "Yes" },
                    { role: "user", content: "Can you make sure to not add any information by yourself other than the information which has been provided?" },
                    { role: "assistant", content: "Yes" },
                    { role: "user", content: `Make sure to reply only the property description not sentences like "Here's your description" etc..` },
                    { role: "user", content: `Create a compelling property Description for following provided variables : ${propertyDetails}.` },
                ];
            }

            const response = await getResponse(messages);
            res.send(response.choices[0].message.content);

        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Some Error Occured."
            });
        }
    })

};