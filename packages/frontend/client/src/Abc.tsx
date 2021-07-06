import React from "react"
import { useActionAPI, useGet } from "shared/apis"


export default function Abc() {
  const { data = [] } = useGet('/posts')

  const { isLoading, isSuccess, isError, data: actionResult, action } = useActionAPI('posts', ['/posts'])

  React.useEffect(() => {
    setTimeout(() => {
      action('post', { title: '123', content: '123' })
    }, 3000);
  }, [])

  return (
    <pre>
      페이지 새로고침 후 3초 뒤 데이터 하나가 추가됩니다.
      <br/>
      <br/>
      데이터 개수: {data.length}개
      <br/>
      <br/>
      {data.reverse().map((item: object) => JSON.stringify(item, null, 2) + '\n\n\n')}
    </pre>
  )
}
