import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from "openai";
import bodyParser from 'body-parser'

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


const app = express()
app.use(cors())
app.use(express.json())
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from OpenAI!'
  })
})

app.post('/', async (req, res) => {
  
    const {message, currentModel} = req.body;
    console.log(req.body)

    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
    });
    res.status(200).send({
      message: response.data.choices[0].text
    });

})

app.get('/models', async(req, res) => {
  const response = await openai.listModels();
  res.status(200).send({
    models: response.data.data
  });
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))