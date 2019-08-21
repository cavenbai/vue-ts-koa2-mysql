
export class FilterService {
  /**
   * 手机号脱敏显示转换器
   */
  static encryptPhone(value:string) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 3) + '****' + value.substr(7)
  }
}
