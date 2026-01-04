const Groq = require('groq-sdk');

// @desc    Get AI response
// @route   POST /api/ai/chat
// @access  Private
const getAIResponse = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const systemPrompt = `
            You are CompliFlow AI, a helpful and professional conversational assistant for the CompliFlow platform.
            CompliFlow is a complaint and issue tracking system where users can report problems, track their status, and admins can manage them.
            Your goal is to help users navigate the platform, understand how to report issues, and provide general assistance.
            Keep your responses concise, friendly, and professional.
            If you don't know the answer, politely say so.
        `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history || []),
            { role: 'user', content: message },
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
        });

        res.json({
            response: chatCompletion.choices[0].message.content,
        });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ message: 'Failed to get AI response' });
    }
};

module.exports = { getAIResponse };
