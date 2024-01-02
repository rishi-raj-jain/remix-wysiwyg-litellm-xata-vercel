import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const filePath = join(process.cwd(), 'node_modules', 'tiptap-markdown', 'node_modules', 'markdown-it', 'lib', 'index.js')

if (existsSync(filePath)) {
  const get = readFileSync(filePath, 'utf8')
  if (get) {
    const set = get.replace("'punycode'", "'punycode/'")
    writeFileSync(filePath, set, 'utf8')
    console.log('Updated', filePath)
  }
}
