export default function ({ store }:any): Object {
  return {
    encryptPhone: function (value:string) :string{
      if (!value || value === '') return ''
      return value.substr(0, 3) + '****' + value.substr(7)
    }
  }
}
