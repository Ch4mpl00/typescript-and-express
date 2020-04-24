import String255 from "~/core/domain/values/String255"

export default class UserBio extends String255 {
  protected message(s: string) {
    return `'${s}' is not valid user bio`
  }
}
