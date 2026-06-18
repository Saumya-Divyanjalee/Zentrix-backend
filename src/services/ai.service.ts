import https from 'https';

const callGemini = (prompt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GEMINI_API_KEY || '';
    
    if (!apiKey || apiKey === 'skip_for_now' || apiKey === 'your_gemini_api_key_here') {
      resolve('⚠️ Gemini API key not configured. Add GEMINI_API_KEY to your .env file.');
      return;
    }

    const body = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });

    // නවතම AQ... API Keys සඳහා ගැළපෙන පරිදි සකස් කල HTTPS options
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,// URL එකෙන් ?key= කොටස ඉවත් කර ඇත
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Content-Length': Buffer.byteLength(body),
        'x-goog-api-key': apiKey // API Key එක ආරක්ෂිතව Header එකක් ලෙස යවයි
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) { 
            reject(new Error(parsed.error.message)); 
            return; 
          }
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          resolve(text || 'No response from AI');
        } catch { 
          reject(new Error('Failed to parse Gemini response')); 
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => { 
      req.destroy(); 
      reject(new Error('Request timeout')); 
    });
    
    req.write(body);
    req.end();
  });
};


export const summarizeNote = (content: string) =>
  callGemini(`Summarize this study note in clear bullet points. Be concise and student-friendly:\n\n${content}`);

export const generateQuiz = (content: string) =>
  callGemini(`Generate 5 MCQ questions from this content. Format:\nQ1. [question]\nA) B) C) D)\nAnswer: [letter]\n\nContent:\n${content}`);

export const generateStudyPlan = (topic: string, days: number) =>
  callGemini(`Create a ${days}-day study plan for: "${topic}". For each day include: focus topic, tasks, and a tip. Make it practical.`);