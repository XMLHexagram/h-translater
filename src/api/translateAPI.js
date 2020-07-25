import axios from 'axios'

export async function TranslateCaiyun(source) {
  let url = 'http://api.interpreter.caiyunai.com/v1/translator'
  // let url = 'https://api.interpreter.caiyunai.com/v1/dict'
  let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN
  let result = await axios({
    method: 'post',
    url: url,
    data: {
      source: source,
      detect: true,
      trans_type: 'en2zh'
    },
    headers: {
      'content-type': 'application/json',
      'x-authorization': 'token ' + token
    }
  })
    .then(res => {
      console.log(res.data.target)
      return res.data.target
    })
    .catch(() => {
      alert('彩云API调用发生未知错误')
    })
  return result
}
