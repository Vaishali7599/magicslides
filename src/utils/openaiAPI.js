export const classifyEmails = async (emails, openaiKey) => {
  const prompt = emails.map((email, i) => {
    const subject = email.payload?.headers?.find(h => h.name === 'Subject')?.value || "";
    const snippet = email.snippet;
    return `${i + 1}. Subject: ${subject}\nSnippet: ${snippet}`;
  }).join("\n\n");

  const body = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Classify each email into: Important, Promotional, Social, Marketing, or Spam. Return in format: {1: 'Important', 2: 'Spam', ...}"
      },
      {
        role: "user",
        content: prompt
      }
    ]
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.choices[0].message.content;
};
