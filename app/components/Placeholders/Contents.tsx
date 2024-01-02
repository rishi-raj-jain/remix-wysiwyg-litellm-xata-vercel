import Image from '@/components/Utility/Image'
import { staticImagePlaceholder } from '@/lib/image'

export default function () {
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">My Content</span>
      <div className="mt-8 flex flex-row items-center w-full gap-x-2">
        <input id="search" name="search" autoComplete="off" placeholder="Search" className="border outline-none w-full focus:border-black rounded px-4 py-1.5" />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          Search
        </button>
      </div>
      {new Array(3)
        .fill({
          alt: 'Loading',
          name: 'Loading',
          imageW: 1000,
          imageH: 1000,
          imagePlaceholder: staticImagePlaceholder,
        })
        .map((i: any, _: number) => (
          <div className="relative mt-8" key={_}>
            <div className="border border-gray-200 max-w-max rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-2 z-20">
              <Image alt={i.name} width={i.imageW} height={i.imageH} url={i.imagePlaceholder} className="h-[20px] w-[20px] rounded-full animate-pulse" />
              <span className="text-gray-400">{i.name}</span>
            </div>
            <Image alt={i.name} width={i.imageW} height={i.imageH} url={i.imagePlaceholder} className="mt-4 animate-pulse" />
          </div>
        ))}
    </div>
  )
}
