import { useEffect, useState } from 'react'
import GetData from '../../services/getData';

export default function useCardInfo(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [repo, setRepo] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    GetData.getData(pageNumber)
    .then(res => {
      if(res && res.items) {
        setRepo(prevRepos => {
          return [...prevRepos, ...res.items]
        })
        setHasMore(res.total_count > 0)
        setLoading(false)
      }
      else {
        setError(true)
        setErrorMessage(res)
      }
    })
    .catch(e => {
        console.error('err ==>', e)
        setError(true)
        setErrorMessage(e)
    })
  }, [pageNumber])

  return { loading, error, errorMessage, repo, hasMore }
}