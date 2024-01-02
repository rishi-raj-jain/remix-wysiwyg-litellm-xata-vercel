import { getXataClient } from '@/xata.server'
import { LoaderFunctionArgs, json } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.record_id) return new Response(null, { status: 400 })
  const xata = getXataClient()
  // Use the Xata client to fetch the 'photo' record based on the provided 'record_id'
  const result = await xata.db.uploads.read(params.record_id)
  return json({ photo: result?.photo })
}
