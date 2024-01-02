import { Editor } from 'novel'
import { Form } from '@remix-run/react'
import { getXataClient } from '@/xata.server'
import Upload from '@/components/Utility/Upload'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const xata = getXataClient()
  const body = await request.formData()
  const slug = body.get('slug') as string
  const title = body.get('title') as string
  const author_name = body.get('name') as string
  const content = body.get('content-html') as string
  const og_image_url = body.get('og_image') as string
  const og_image_w = body.get('og_image_w') as string
  const og_image_h = body.get('og_image_h') as string
  const author_image_url = body.get('author_image') as string
  const author_image_w = body.get('author_image_w') as string
  const author_image_h = body.get('author_image_h') as string
  await xata.db.content.create({ slug, title, content, author_name, author_image_url, author_image_w, author_image_h, og_image_url, og_image_w, og_image_h })
  return redirect(`/content/${slug}`)
}

export default function Index() {
  return (
    <Form navigate={false} method="post" className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">New Article</span>
      <span className="mt-8 font-medium">Author's Image</span>
      <Upload className="mt-4 rounded-full w-[150px] h-[150px]" selector="author_image" />
      <span className="mt-8 font-medium">Author's Name</span>
      <input required autoComplete="off" id="name" name="name" placeholder="Author's Name" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">OG Image</span>
      <Upload className="mt-4" selector="og_image" />
      <span className="mt-8 font-medium">Title</span>
      <input required autoComplete="off" id="title" name="title" placeholder="Title" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Content</span>
      <input required className="hidden" id="content-html" name="content-html" />
      <Editor
        defaultValue={{}}
        storageKey="novel__editor"
        className="mt-4 shadow-none border rounded p-8"
        onUpdate={(e) => {
          if (!e) return
          const tmp = e.getHTML()
          const htmlSelector = document.getElementById('content-html')
          if (tmp && htmlSelector) htmlSelector.setAttribute('value', tmp)
        }}
      />
      <span className="mt-8 font-medium">Slug</span>
      <input required autoComplete="off" id="slug" name="slug" placeholder="Slug" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <button type="submit" className="bg-white hover:bg-black text-black hover:text-white mt-8 px-3 border border-black py-1 rounded max-w-max">
        Publish &rarr;
      </button>
    </Form>
  )
}
