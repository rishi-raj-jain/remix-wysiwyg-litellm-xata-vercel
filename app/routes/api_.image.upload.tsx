import { json } from '@remix-run/node'
import { getXataClient } from '@/xata.server'

export async function loader() {
  const xata = getXataClient()
  // Use the Xata client to create a new 'photo' record with an empty base64 content
  const result = await xata.db.uploads.create({ photo: { base64Content: '' } }, ['photo.uploadUrl'])
  return json(result)
}
