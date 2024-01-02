import { getXataClient } from '@/xata.server'
import { ActionFunctionArgs, json } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const xata = getXataClient()
  // Read the incoming request's body as a Buffer
  const file = Buffer.from(await request.arrayBuffer())
  const filename = request.headers.get('x-vercel-filename') || 'file.txt'
  const contentType = request.headers.get('content-type') || 'text/plain'
  // Extract the file type from the content type
  const fileType = `.${contentType.split('/')[1]}`
  const finalName = filename.includes(fileType) ? filename : `${filename}${fileType}`
  // Use the Xata client to create a new 'photo' record in the database
  const resp = await xata.db.uploads.create({
    photo: {
      name: finalName,
      mediaType: contentType,
      base64Content: file.toString('base64'),
    },
  })
  if (resp.photo?.url) return json({ url: resp.photo.url })
}
