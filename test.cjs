const https = require('https');

const promptText = "لوحه مقاس 50*50 عليها اسم سعيد";

const systemPrompt = "Translate the following Arabic AI image generation prompt to a highly detailed, professional English prompt. If the user wants a name written on the board, translate the name to English but keep the Arabic calligraphy. For example: \"the name 'سعيد' in elegant golden Arabic calligraphy\". Return ONLY the final English prompt, no other conversation or quotes.";

const requestBody = JSON.stringify({
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: promptText }
  ],
  model: "openai" // Options: openai, Qwen, etc.
});

const options = {
  hostname: 'text.pollinations.ai',
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestBody)
  }
};

console.log("Sending prompt translation request...");

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let chunks = [];
  res.on('data', (d) => {
    chunks.push(d);
  });
  res.on('end', () => {
    const body = Buffer.concat(chunks).toString('utf8');
    console.log("Translation Result:\n", body);
  });
});

req.on('error', (e) => {
  console.error("Error occurred:", e);
});

req.write(requestBody);
req.end();
