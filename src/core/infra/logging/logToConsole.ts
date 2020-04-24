export default (message: string, level: string, context: object) => {
  console.log(`${level}: ${message}`, JSON.stringify(context))
}
