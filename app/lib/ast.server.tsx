import { transform } from 'ultrahtml'
import swap from 'ultrahtml/transformers/swap'
import Image from '@/components/Utility/Image'
import { imageSize, disableFS } from 'image-size'
import { renderToString } from 'react-dom/server'
import type { SelectedPick } from '@xata.io/client'
import type { ContentRecord } from '@/xata.server'

disableFS(true)

export async function getTransformedImage(content: Readonly<SelectedPick<ContentRecord, ['*']>>) {
  if (!content.content) return ""
  let counter = 0
  return await transform(content.content, [
    swap({
      img: async (props, _) => {
        counter += 1
        const fetchRemoteImage = await fetch(props.src)
        const remoteImageBuffer = Buffer.from(await fetchRemoteImage.arrayBuffer())
        const { width: imageW, height: imageH } = imageSize(remoteImageBuffer)
        if (imageH && imageW) {
          const imageComponent = <Image alt={`Illustration ${counter} - ${content.title}`} url={props.src} width={imageW} height={imageH} />
          return renderToString(imageComponent)
        }
      },
    }),
  ])
}
