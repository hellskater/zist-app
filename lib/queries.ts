export const sendDiscordMessage = async (message: string, username: string) => {
  const webhook = process.env.DISCORD_WEBHOOK_URL as string;

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `${username}`,
      embeds: [
        {
          description: message,
          color: 0x00ff00,
        },
      ],
    }),
  });
};
