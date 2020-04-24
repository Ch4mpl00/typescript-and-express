import NotEmptyString255 from "~/core/domain/values/NotEmptyString255"

export default class Username extends NotEmptyString255 {
  protected message(s: string) {
    return `'${s}' is not valid Username`
  }
}
