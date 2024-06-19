import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useGetContactsQuery } from '../../generated/graphql'

type ContactType = {
  id: number
  username: string
  avatar: string
}

const AddContact = () => {
  const [research, setResearch] = useState<string>('')
  const [researchResults, setResearchResults] = useState<ContactType[]>([])

  const { loading, data, refetch } = useGetContactsQuery({})

  useEffect(() => {
    if (data?.users) {
      setResearchResults(data?.users as ContactType[])
    }
  }, [loading, data])

  const handleResearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResearch(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    refetch({ filter: { username: research } })
  }

  return (
    <div className={styles.add_contact}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={research} onChange={handleResearch} />
        <button>Search</button>
      </form>
      {researchResults.length > 0 && (
        <ul>
          {researchResults.map((contact) => (
            <li key={contact.id}>
              <img src={contact.avatar} alt={contact.username} />
              <p>{contact.username}</p>
              <button>Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddContact
