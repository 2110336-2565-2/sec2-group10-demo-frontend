const randomString = (length: number) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export { randomString }
