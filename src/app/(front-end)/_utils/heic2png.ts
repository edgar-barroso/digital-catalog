export async function heicToPng(file: File): Promise<File> {
  const heic2any = (await import('heic2any')).default
  const blob = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.5,
  })
  const jpgBlob = Array.isArray(blob) ? blob[0] : blob
  return new File([jpgBlob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' })
}
