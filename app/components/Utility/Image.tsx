import { ImageProps } from '@/lib/types'
import { transformImage } from '@xata.io/client'

export default function ({ url, alt, width, height, loading, className, backgroundImage }: ImageProps) {
  // Check if the image URL is an HTTPS URL, if not, create a new URL object
  const existingImageURL = url.includes('https') ? new URL(url) : url
  // Generate a fallback blurred image URL if the original URL is not a string
  const fallbackBlurImageURL =
    typeof existingImageURL === 'string'
      ? existingImageURL
      : transformImage(existingImageURL.toString(), {
          blur: 75,
          height: 50,
          width: Math.round(50 * (Number(width) / Number(height))),
        })
  return (
    <img
      src={url}
      width={width}
      height={height}
      alt={alt || ''}
      decoding="async"
      loading={loading || 'lazy'}
      style={{ backgroundImage: `url(${backgroundImage || fallbackBlurImageURL})`, transform: 'translate3d(0, 0, 0)' }}
      className={[className, 'bg-cover bg-center bg-no-repeat transform will-change-auto'].filter((i) => i).join(' ')}
    />
  )
}
