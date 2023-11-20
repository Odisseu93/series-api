export const findSeasonNumberByFilename = (filename: string): number => {
  return Number(filename.replace('season', '').replace('.json', '').trim())
}
