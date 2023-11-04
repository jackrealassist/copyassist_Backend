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
            'x-api-key': '5b4a56d617574560920e07ac4da5e9b6'
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
            } = req.body;

            const messages = [
                { role: "system", content: "You are a realestate copywriter who writes Property Description from given details. You must not add any detail by yourself." },
                { role: "user", content: "Can you help me draft a realestate property Description?" },
                { role: "assistant", content: "Yes" },
                { role: "user", content: "Can you make sure to not add any information by yourself other than the information which has been provided?" },
                { role: "assistant", content: "Yes" },
                { role: "user", content: `Make sure to reply only the property description not sentences like "Here's your description" etc..` },
                { role: "user", content: `Create a compelling property Description for following provided variables : ${propertyDetails}.` },
            ];

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