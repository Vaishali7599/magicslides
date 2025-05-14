export const fetchEmails = async (accessToken, maxResults = 15) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const res = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      { headers }
    );
    const data = await res.json();

    if (!data.messages) {
      console.error("No messages found or error:", data);
      return [];
    }

    const messages = await Promise.all(
      data.messages.map(async (msg) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          { headers }
        );
        return msgRes.json();
      })
    );

    return messages;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
};
