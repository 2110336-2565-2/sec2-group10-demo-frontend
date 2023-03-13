export const thBankAccountPattern = /^[0-9]{10}$/
export const thBankAccountPatternMessage = 'Account number must be 10 digits'
export const validateBankAccount = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const pattern = new RegExp(thBankAccountPattern)
  return pattern.test(v)
}

export const formatBankAccount = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let output = ''
  for (let i = 0; i < 10; i += 1) {
    if (i > 0 && i % 3 === 0) {
      output += ' '
    }
    output += v.charAt(i)
  }

  return output.trim()
}
