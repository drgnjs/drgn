type FetchConfig = {
  token?: string,
  body?: {
    [key: string]: any
  },
  headers?: {
    [key: string]: any
  },
  query?: {
    [key: string]: any
  }
}

type CustomFetch = (url: string, method: string, config?: FetchConfig) => Promise<{
  code: number,
  data: any,
  ok: true
} | {
  code: number,
  data: any,
  ok: false
}>

const customFetch: CustomFetch = async (url, method, _config = {}) => {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...(_config.token && { authorization: `bearer ${_config.token}` }),
    ..._config.headers
  }

  if (!url.startsWith('https://'))
    url = (import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.drgnjs.com') + url
  
  if (_config.query) {
    // @ts-ignore
    const query = Object.keys(custom.query).map(key => key + '=' + custom.query[key]).join('&')
    url += `?${query}`
  }

  const config = {
    method,
    headers,
    ...(_config.body && {
      body: JSON.stringify(_config.body)
    })
  }

  let res
  let data

  try {
    res = await fetch(url, config)
  } catch (err) {
    return {
      code: 400,
      data: undefined,
      ok: false
    }
  }

  try {
    data = await res.json()
  } catch (err) {
    data = undefined
  }

  return {
    code: res.status,
    data,
    ok: res.ok
  }
}

export const Get = async (url: string, config?: FetchConfig) => customFetch(url, 'GET', config)

export const Post = async (url: string, config?: FetchConfig) => customFetch(url, 'POST', config)

export const Patch = async (url: string, config?: FetchConfig) => customFetch(url, 'PATCH', config)

export const Put = async (url: string, config?: FetchConfig) => customFetch(url, 'PUT', config)

export const Delete = async (url: string, config?: FetchConfig) => customFetch(url, 'DELETE', config)
