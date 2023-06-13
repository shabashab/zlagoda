export const getVerifiedUsersCount = async () => {
  return await globalThis.prisma.user.count({
    where: {
      isVerified: true
    }
  })
}
