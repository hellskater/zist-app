import { queryBuilder } from './planetscale';

export const getUser = async (username: string) => {
  const userData = await queryBuilder
    .selectFrom('users')
    .select(['username', 'autotagcount', 'maxallowed', 'updated_at'])
    .where('username', '=', username)
    .executeTakeFirst();

  return userData;
};

export const updateUser = async (username: string, autotagcount: number) => {
  const userData = await queryBuilder
    .updateTable('users')
    .set({ autotagcount })
    .where('username', '=', username)
    .executeTakeFirst();

  return userData;
};

export const insertUser = async (username: string, autotagcount: number) => {
  const userData = await queryBuilder
    .insertInto('users')
    .values({ username, autotagcount })
    .executeTakeFirst();

  return userData;
};

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
