import { Box, BoxType, Prisma } from '@prisma/client'

interface CreateBoxDto {
  name: string
  duration: number
  percentage: number
  payoutsCount: number
  maxCount?: number
  type: BoxType
}

export type BoxMap = Record<string, Box>

export const getAllBoxes = async () => {
  return await globalThis.prisma.box.findMany({
    orderBy: [
      {
        type: 'asc'
      },
      {
        duration: 'asc'
      }
    ]
  })
}

export const getBoxesMap = async (
  where?: Prisma.BoxWhereInput
): Promise<BoxMap> => {
  const boxes = await globalThis.prisma.box.findMany({
    where
  })

  return boxes.reduce((prev, cur) => {
    prev[cur.id] = cur
    return prev
  }, {} as BoxMap)
}

export const getAllBoxesMap = async (): Promise<BoxMap> => {
  return await getBoxesMap()
}

export const createBox = async (createBoxDto: CreateBoxDto) => {
  return await globalThis.prisma.box.create({
    data: {
      ...createBoxDto
    }
  })
}
