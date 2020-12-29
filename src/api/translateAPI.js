const { ipcRenderer } = window.require('electron')
import axios from 'axios'

// export async function TranslateCaiyun(source) {
//   let url = 'http://api.interpreter.caiyunai.com/v1/translator'
//   let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN
//   const isChinese = await ipcRenderer.invoke('get-store', 'isChinese')
//   let transType = 'auto2zh'
//   if (isChinese === true) {
//     transType = 'auto2en'
//   }
//
//   let result = await axios({
//     method: 'post',
//     url: url,
//     data: {
//       source: source,
//       detect: true,
//       trans_type: transType
//     },
//     headers: {
//       'content-type': 'application/json',
//       'x-authorization': 'token ' + token
//     }
//   })
//     .then(res => {
//       console.log(res.data.target)
//       return res.data.target
//     })
//     .catch(() => {
//       alert('彩云API调用发生未知错误')
//     })
//   return result
// }
//
// export async function WordTranslateCaiyun(source) {
//   let url = 'https://api.interpreter.caiyunai.com/v1/dict'
//   let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN
//   const isChinese = await ipcRenderer.invoke('get-store', 'isChinese')
//   let transType = 'en2zh'
//   console.log(isChinese)
//   if (isChinese === true) {
//     transType = 'zh2en'
//   }
//
//   let result = await axios({
//     method: 'post',
//     url: url,
//     data: {
//       source: source,
//       trans_type: transType
//     },
//     headers: {
//       'content-type': 'application/json',
//       'x-authorization': 'token ' + token
//     }
//   })
//     .then(res => {
//       let result = {}
//       result.explanations = res.data.dictionary.explanations
//       result.prons = res.data.dictionary.prons
//       result.entry = res.data.dictionary.entry
//       return result
//     })
//     .catch(() => {
//       alert('单词-彩云API调用发生未知错误')
//     })
//   return result
// }

export async function ChineseWordTranslateCaiyun(source) {
  let url = 'https://api.interpreter.caiyunai.com/v1/dict'
  let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN

  let result = await axios({
    method: 'post',
    url: url,
    data: {
      detect: true,
      dict: true,
      dict_name: 'default_all2all',
      source: source,
      trans_type: 'zh2en'
    },
    headers: {
      'content-type': 'application/json',
      'x-authorization': 'token ' + token
    }
  })
    .then(res => {
      return res
    })
    .catch(() => {
      alert('单词-彩云API调用发生未知错误')
    })

  // console.log(result)
  if (Object.keys(result.data.dictionary).length !== 0) {
    // console.log(555)
    result.data.isDict = true
    ipcRenderer.send('change-detail-view', result.data)
    return result.data
  }

  url = 'https://api.interpreter.caiyunai.com/v1/translator'
  // let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN;

  result = await axios({
    method: 'post',
    url: url,
    data: {
      detect: true,
      dict: true,
      dict_name: 'default_all2all',
      source: source,
      trans_type: 'zh2en'
    },
    headers: {
      'content-type': 'application/json',
      'x-authorization': 'token ' + token
    }
  })
    .then(res => {
      return res
    })
    .catch(() => {
      alert('单词-彩云API调用发生未知错误')
    })

  result.data.isDict = false
  result.data.source = source
  ipcRenderer.send('change-detail-view', result.data)
  return result.data
}

export async function EnglishWordTranslateCaiyun(source) {
  let url = 'https://api.interpreter.caiyunai.com/v1/dict'
  let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN

  let result = await axios({
    method: 'post',
    url: url,
    data: {
      detect: true,
      dict: true,
      dict_name: 'default_all2all',
      source: source,
      trans_type: 'en2zh'
    },
    headers: {
      'content-type': 'application/json',
      'x-authorization': 'token ' + token
    }
  })
    .then(res => {
      return res
    })
    .catch(() => {
      alert('单词-彩云API调用发生未知错误')
    })

  // console.log(result)
  if (Object.keys(result.data.dictionary).length !== 0) {
    // console.log(555)
    result.data.isDict = true
    ipcRenderer.send('change-detail-view', result.data)
    return result.data
  }

  url = 'https://api.interpreter.caiyunai.com/v1/translator'
  // let token = process.env.VUE_APP_CAIYUN_TRANSLATE_TOKEN;

  result = await axios({
    method: 'post',
    url: url,
    data: {
      detect: true,
      dict: true,
      dict_name: 'default_all2all',
      source: source,
      trans_type: 'en2zh'
    },
    headers: {
      'content-type': 'application/json',
      'x-authorization': 'token ' + token
    }
  })
    .then(res => {
      return res
    })
    .catch(() => {
      alert('单词-彩云API调用发生未知错误')
    })

  result.data.isDict = false
  result.data.source = source
  ipcRenderer.send('change-detail-view', result.data)
  return result.data
}
