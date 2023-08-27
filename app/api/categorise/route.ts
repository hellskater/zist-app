import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { revalidatePath } from 'next/cache';

import { getServerSideUserSession } from '@/lib/auth';
import { getUser, insertUser, updateUser } from '@/lib/queries';

// export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const session = await getServerSideUserSession();

  const dbUser = await getUser(session?.user?.username as string);

  if (dbUser && dbUser.autotagcount >= (dbUser.maxallowed as number)) {
    return new Response(
      'You have reached your maximum allowed autotag count.',
      {
        status: 429,
      }
    );
  }

  const response = await openai.createChatCompletion({
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `I'll provide you with a JSON file. Based on its content, generate a JSON object with a category and up to three tags. Think creatively and suggest tags and categories based on the file name and content, even if they aren't in the available options. Here are some examples to guide you:
        
- If the content is about 'React' and deals with authentication, you might suggest tags like 'Authentication', 'React', and 'Frontend'.
- If the file name is 'database.py' and the content deals with SQL queries, the category might be 'Python' and tags could be 'Database', 'SQL', and 'Backend'.
- For a file named 'tutorial.md' that explains CSS grid layouts, the category could be 'Tutorial' and tags might be 'CSS', 'Web Design', and 'Layout'.
- If the content is about machine learning in a Jupyter notebook, tags could be 'Machine Learning', 'Data Science', and 'Jupyter'.

Remember to consider the description, context of the content and the purpose it serves. Respond ONLY with the stringified JSON. Ready?`,
      },
      {
        role: 'user',
        content: `${prompt}`,
      },
      {
        role: 'user',
        content: `Generate the desired JSON output.`,
      },
    ],
    max_tokens: 300,
    temperature: 0.3,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response) {
    if (dbUser) {
      await updateUser(
        session?.user?.username as string,
        dbUser.autotagcount + 1
      );
      revalidatePath('/');
    } else {
      await insertUser(session?.user?.username as string, 1);
      revalidatePath('/');
    }
  }

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
