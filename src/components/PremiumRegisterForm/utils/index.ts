const creditCardTypes = [
  {
    name: 'visa',
    pattern: /^4/,
    separate: [4, 8, 12],
    validLength: [16],
  },
  {
    name: 'mastercard',
    pattern: /^5[1-5]/,
    separate: [4, 8, 12],
    validLength: [16],
  },
  {
    name: 'amex',
    pattern: /^3[47]/,
    separate: [4, 10],
    validLength: [15],
  },
  {
    name: 'dinersclub',
    pattern: /^3(?:0[0-5]|[68][0-9])/,
    separate: [4, 10],
    validLength: [14],
  },
  {
    name: 'discover',
    pattern: /^6(?:011|5[0-9]{2})/,
    separate: [4, 8, 12],
    validLength: [16],
  },
  {
    name: 'jcb',
    pattern: /^(?:2131|1800|35\d{3})/,
    separate: [4, 8, 12],
    validLength: [16],
  },
]

export const validateCreditCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = creditCardTypes.find((type) => type.pattern.test(v))
  const match = (matches && matches.validLength) || [16]
  return match.indexOf(v.length) >= 0
}

export const formatCreditCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = creditCardTypes.find((type) => type.pattern.test(v))
  const match = (matches && matches.separate) || [4, 8, 12]
  const validLength = (matches && matches.validLength) || [16]
  let output = ''
  let index = 0
  while (index < v.length && validLength.indexOf(index) === -1) {
    if (match.indexOf(index) !== -1) {
      output += ' '
    }
    output += v[index]
    index++
  }

  return output.trim()
}

export const formatExpirationDate = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let output = ''

  if (v.length > 2) {
    output += v.slice(0, 2) + '/' + v.slice(2, 4)
  } else {
    output += v
  }

  return output.trim()
}
