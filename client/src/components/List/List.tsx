import { useArticles } from '@/hooks/dashboard'
import { Article } from '@/types/dashboard'

import styles from './List.module.css'

interface ListProps {
  setSelected: (event: Article) => void
}

export default function List({ setSelected }: ListProps) {
  const { isPending, error, data } = useArticles()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  function truncate(source: string, size: number) {
    return source.length > size ? source.slice(0, size - 1) + '…' : source
  }

  return (
    <div className={styles.list}>
      {data.map((each) => (
        <button key={each.id} className={styles.innerArticles} onClick={() => setSelected(each)}>
          <h1>{each.name}</h1>
          <p>{truncate(each.description, 50)}</p>
          <strong>👀 {each.subscribers_count}</strong> <strong>✨ {each.stargazers_count}</strong>{' '}
          <strong>🍴 {each.forks_count}</strong>
        </button>
      ))}
    </div>
  )
}
