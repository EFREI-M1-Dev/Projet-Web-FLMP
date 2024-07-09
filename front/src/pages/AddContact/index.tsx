import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import {
  GetConversationsDocument,
  useCreateConversationMutation,
  useGetContactsQuery,
} from '../../generated/graphql'
import Icon from "../../components/atoms/Icon";
import Button from "../../components/atoms/Button";

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
  const input = document.getElementById('input');

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsSearched(true)
    refetch({ filter: { username: research } })
  }

  const removeInput = () => {
    setResearch('')
    setIsSearched(false)
    input?.focus()
  }

  const handleCreateConversation = (id: number) => {
    createConversation({
      variables: { input: { otherUserIds: [id] } },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.add_contact}>
      <h1>
        Add a contact
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input type="text" value={research} onChange={handleResearch} id="input" />
          {research.length > 0 ? (
              <button onClick={removeInput} type='reset'>
                <Icon name='cross'/>
              </button>
          ) : (
              <></>
          )}
        </div>
        <button type='submit'>
          <Icon name='searchBold' color={'white'}/>
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
                <p>
                  @{contact.createdAt}
                </p>
              </div>
              <Button onClick={() => handleCreateConversation(contact?.id)}  text={'Add'}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddContact
