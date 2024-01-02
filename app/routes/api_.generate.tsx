import { completion } from 'litellm'
import { ActionFunctionArgs } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const encoder = new TextEncoder()
  const { prompt } = await request.json()
  const response = await completion({
    n: 1,
    top_p: 1,
    stream: true,
    temperature: 0.7,
    presence_penalty: 0,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.',
        // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        // "Use Markdown formatting when appropriate.",
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
  // Create a streaming response
  const customReadable = new ReadableStream({
    async start(controller) {
      for await (const part of response) {
        try {
          const tmp = part.choices[0]?.delta?.content
          if (tmp) controller.enqueue(encoder.encode(tmp))
        } catch (e) {
          console.log(e)
        }
      }
      controller.close()
    },
  })
  // Return the stream response and keep the connection alive
  return new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  })
}
