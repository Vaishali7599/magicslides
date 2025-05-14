// src/utils/gmailAPI.js

export const fetchEmails = async (accessToken, maxResults = 15) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const res = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      { headers }
    );

    const data = await res.json();

    // Check if 'messages' exists and is an array
    if (!data.messages || !Array.isArray(data.messages)) {
      console.error("No messages found or error fetching messages:", data);
      return []; // Return an empty array if no messages are found
    }

    // Fetch details for each message
    const messages = await Promise.all(
      data.messages.map(async (msg) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          { headers }
        );
        return msgRes.json();
      })
    );

    return messages; // Return the list of fetched emails

  } catch (error) {
    console.error("Error during email fetch:", error);
    return []; // Return an empty array in case of error
  }
};
