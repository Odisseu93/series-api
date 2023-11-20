import path from 'path'
import fs from 'fs'
import { color } from '../utils/nodeColors'

export const getEpisodesData = async (directoryPath: string) => {
  type FileContent = {
    filename: string
    content: string
  }

  const fileContents: Array<FileContent> = []

  return new Promise((resolve) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.log(color.fgRed)
        console.error(err)
        console.log(color.reset)
        return
      }

      const fileExtension = '.json'
      const filteredFiles = files.filter(
        (file) => path.extname(file) === fileExtension
      )

      filteredFiles.forEach((file) => {
        const filePath = path.join(directoryPath, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        fileContents.push({ filename: file, content })
      })

      const format = (fileContents: FileContent[]): string[] =>
        fileContents.map((file) =>
          JSON.stringify({
            filename: file.filename,
            fileContent: JSON.parse(file.content),
          })
        )

      resolve(format(fileContents))
    })
  })
}
