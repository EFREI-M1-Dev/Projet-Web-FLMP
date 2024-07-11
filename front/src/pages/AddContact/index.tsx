import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import moment from 'moment'

/* graphql */
import {
  GetConversationsDocument,
  useCreateConversationMutation,
  useGetContactsQuery,
} from '../../generated/graphql'

/* components */
import Icon from '../../components/atoms/Icon'
import Button from '../../components/atoms/Button'

type ContactType = {
  id: number
  username: string
  createdAt: string
  avatar: string
}

const AddContact = () => {
  const [research, setResearch] = useState<string>('')
  const [researchResults, setResearchResults] = useState<ContactType[]>([])
  const [isSearched, setIsSearched] = useState<boolean>(false)

  const refField = useRef<HTMLInputElement | null>(null)

  const { loading, data, refetch } = useGetContactsQuery({})
  const [createConversation] = useCreateConversationMutation({
    refetchQueries: [{ query: GetConversationsDocument }],
  })

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearched(true)
    refetch({ filter: { username: research } })
  }

  const removeInput = () => {
    setResearch('')
    setIsSearched(false)
    refField?.current?.focus()
  }

  const handleCreateConversation = (id: number) => {
    createConversation({
      variables: { input: { otherUserIds: [id] } },
    })
  }

  return (
    <div className={styles.add_contact}>
      <h1>Add a contact</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            value={research}
            onChange={handleResearch}
            ref={refField}
          />
          {research.length > 0 ? (
            <button onClick={removeInput} type="reset">
              <Icon name="cross" />
            </button>
          ) : (
            <></>
          )}
        </div>
        <button type="submit">
          <Icon name="searchBold" color={'white'} />
        </button>
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
                <p>@{contact.username}</p>
                <p>
                  Member since&nbsp;
                  <span>{moment(contact.createdAt).format('DD/MM/YYYY')}</span>
                </p>
              </div>
              <Button onClick={() => handleCreateConversation(contact?.id)}>
                Add
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddContact
