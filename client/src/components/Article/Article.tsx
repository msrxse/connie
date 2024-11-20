import { useArticles } from '@/hooks/dashboard'
import { Article as ArticleProp } from '@/types/dashboard'

import styles from './Article.module.css'

interface ArticleProps {
  selected: ArticleProp | undefined
}

export default function Article({ selected }: ArticleProps) {
  const { isPending, error } = useArticles()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (!selected) {
    return null
  }

  return (
    <div className={styles.article}>
      <div key={selected.id} className={styles.innerMatches}>
        <h1>{selected.name}</h1>
        <p>{selected.description}</p>
        <strong>👀 {selected.subscribers_count}</strong>{' '}
        <strong>✨ {selected.stargazers_count}</strong> <strong>🍴 {selected.forks_count}</strong>
      </div>
    </div>
  )
}
