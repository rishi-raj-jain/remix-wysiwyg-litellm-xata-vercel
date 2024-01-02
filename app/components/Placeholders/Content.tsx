import Image from '@/components/Utility/Image'
import { staticImagePlaceholder } from '@/lib/image'

const image = {
  imageW: 1000,
  imageH: 1000,
  alt: 'Loading',
  slug: 'loading',
  name: 'Loading',
  imagePlaceholder: staticImagePlaceholder,
}

export default function () {
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">{image.name}</span>
      <div className="mt-8 flex flex-row items-start gap-x-3">
        <Image alt={image.name} width={image.imageW} height={image.imageH} url={image.imagePlaceholder} className="rounded-full w-[50px] h-[50px]" />
        <div className="flex flex-col">
          <span className="text-black font-semibold">{image.name}</span>
        </div>
      </div>
      <Image className="mt-8" alt={image.name} width={image.imageW} height={image.imageH} url={image.imagePlaceholder} />
      <div className="mt-8 bg-gray-300 animate-pulse h-[100px]" />
    </div>
  )
}
