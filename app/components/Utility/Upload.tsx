import { useState } from 'react'
import { ChangeEvent } from 'react'
import { UploadProps } from '@/lib/types'
import Edit from '@/components/Icons/Edit'
import UploadIcon from '@/components/Icons/Upload'
import LoadingIcon from '@/components/Icons/Loading'
import OptimizedImage from '@/components/Utility/Image'

export default function ({ selector, className }: UploadProps) {
  const [uploadedURL, setUploadedURL] = useState()
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState()
  const [uploadedImageH, setUploadedImageH] = useState()
  const [uploadedImageW, setUploadedImageW] = useState()
  const openLoader = () => {
    const tmp = document.querySelector(`#${selector}`) as HTMLInputElement
    if (tmp) tmp.click()
  }
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      const fileData = event.target?.result
      if (fileData) {
        setUploading(true)
        setUploadedImage(undefined)
        const body = new Blob([fileData], { type: file.type })
        fetch('/api/image/upload')
          .then((res) => res.json())
          .then((res) => {
            fetch(res.photo.uploadUrl, {
              body,
              method: 'PUT',
            })
              .then((res_) => res_.json())
              .then((res_) => {
                const { attributes } = res_
                const { height, width } = attributes
                setUploadedImageW(width)
                setUploadedImageH(height)
                fetch(`/api/image/${res.id}`)
                  .then((res__) => res__.json())
                  .then((res__) => {
                    if (res__?.photo?.url) {
                      setUploading(false)
                      setUploadedURL(res__.photo.url)
                      setUploadedImage(res__.photo.url)
                    }
                  })
              })
          })
      }
    }
    reader.readAsArrayBuffer(file)
  }
  return (
    <>
      <input readOnly value={uploadedURL} className="hidden" name={selector} />
      {uploadedImageH && <input readOnly value={uploadedImageH} className="hidden" id={selector + '_h'} name={selector + '_h'} />}
      {uploadedImageW && <input readOnly value={uploadedImageW} className="hidden" id={selector + '_w'} name={selector + '_w'} />}
      {uploadedImage && (
        <div onClick={openLoader} className={[className, 'relative'].filter((i) => i).join(' ')}>
          <Edit />
          {uploadedImageW && uploadedImageH && (
            <OptimizedImage width={uploadedImageW} height={uploadedImageH} className={[className].filter((i) => i).join(' ')} url={uploadedImage} />
          )}
        </div>
      )}
      <div
        onClick={openLoader}
        className={[className, uploadedImage && 'hidden', 'relative cursor-pointer border rounded flex flex-col items-center justify-center py-12'].filter((i) => i).join(' ')}
      >
        {uploading ? (
          <div className="absolute">
            <LoadingIcon />
          </div>
        ) : (
          <>
            <UploadIcon />
            <span>Upload Image</span>
          </>
        )}
        <input onChange={uploadFile} type="file" id={selector} className="hidden" />
      </div>
    </>
  )
}
