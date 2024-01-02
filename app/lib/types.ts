export type Record = { [k: string]: string }

export type ImageProps = {
  url: string
  alt?: string
  className?: string
  width: number | string
  height: number | string
  backgroundImage?: string
  loading?: 'lazy' | 'eager'
}

export type UploadProps = { selector: string; className?: string }
