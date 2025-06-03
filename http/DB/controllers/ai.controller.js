const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_KEY,
});

const answerQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        status: "error",
        message: "Question is required",
        data: null,
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question,
    });
    console.log(response.text);
    res.json({ answer: response.text });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const genImg = async (req, res) => {
  try {
    const response = await ai.models.generateImages({
      // need billing
      model: "imagen-3.0-generate-002",
      prompt: "Robot holding a red skateboard",
      config: {
        numberOfImages: 4,
      },
    });

    let idx = 1;

    for (const generatedImage of response.generatedImages) {
      let imgBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imgBytes, "base64");
      fs.writeFileSync(`imagen-${idx}.png`, buffer);
      idx++;
    }
    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      //   text: textResponse,
      //   imageUrl: imageFilename ? `/images/${imageFilename}` : null,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      message: "Error generating image",
      error: error.message,
    });
  }
};

module.exports = { answerQuestion, genImg };
