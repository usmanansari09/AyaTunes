const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
export const isValidEmail = email => {
  emailRegex.lastIndex = 0
  return emailRegex.test(email)
}
