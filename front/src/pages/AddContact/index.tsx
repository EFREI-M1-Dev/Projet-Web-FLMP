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
  const [isSearched, setIsSearched] = useState<boolean>(false)

  const { loading, data, refetch } = useGetContactsQuery({})

  useEffect(() => {
    if (data?.users && !loading && research !== '') {
      setResearchResults(data?.users as ContactType[])
    }
  }, [loading, data])

  const handleResearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setResearch(e.target.value)
    } else {
      setIsSearched(false)
      setResearch('')
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsSearched(true)
    refetch({ filter: { username: research } })
  }

  return (
    <div className={styles.add_contact}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={research} onChange={handleResearch} />
        <button>Search</button>
      </form>
      {loading ? (
        <p>loading...</p>
      ) : researchResults.length === 0 && isSearched ? (
        <p>No result for "{research}"</p>
      ) : !isSearched ? (
        <p>Enter username to research...</p>
      ) : (
        <ul>
          {researchResults.map((contact) => (
            <li key={contact.id}>
              <div className={styles.infos}>
                <img src={contact.avatar} alt={contact.username} />
                <p>{contact.username}</p>
              </div>
              <button>Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddContact
