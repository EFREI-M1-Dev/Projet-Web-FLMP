import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

/* components */
import Header from '../Header'
import InputSearch from '../../../../molecules/InputSearch'
import MenuSelection from '../MenuSelection'
import Avatar from '../../../../atoms/Avatar'

/* graphql */
import {
  Conversation,
  User,
  useGetConversationsQuery,
} from '../../../../../generated/graphql'

/* hooks */
import useCleanTypename from '../../../../../hooks/useCleanTypeName'

/* store */
import { useAppSelector } from '../../../../../hooks/reduxHooks'

const NavbarLeft = () => {
  const [searchContact, setSearchContact] = useState<string>('')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const idUser = useAppSelector((state) => state.user.id)

  const { loading, data } = useGetConversationsQuery({})

  useEffect(() => {
    if (data && !loading) {
      const cleanedData = useCleanTypename(
        data.getConversations
      ) as Conversation[]
      const sortedConversations = cleanedData.slice().sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      setConversations(sortedConversations)
    }
  }, [data, loading])

  const handleSearchContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContact(e.target.value)
  }

  return (
    <div className={styles.navbar_left}>
      <Header />
      <InputSearch
        placeholder="Filter discussions..."
        value={searchContact}
        onChange={handleSearchContact}
      />
      <MenuSelection />
      {/* tabs contact > filter */}
      <div className={styles.contact_list}>
        <span className={styles.date}>Today</span>
        <ul className={styles.list}>
          {conversations?.map((conversation: Conversation) => {
            return (
              <Link to={`chat/${conversation?.id}`}>
                <li key={conversation.id}>
                  <Avatar />
                  <div className={styles.infos}>
                    <span>
                      {conversation.users
                        .filter((user: User) => user.id !== idUser)
                        .map((user: User) => {
                          return user.username
                        })}
                    </span>
                    <span>Online</span>
                  </div>
                </li>
              </Link>
            )
          })}
          <a href="chat/10">
            <li>
              <Avatar status={'offline'} />
              <div className={styles.infos}>
                <span>Mattéo</span>
                <span>Offline</span>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <Avatar status={'away'} />
              <div className={styles.infos}>
                <span>Floflo</span>
                <span>Away</span>
              </div>
            </li>
          </a>
          <a href="">
            <li>
              <Avatar status={'nodisturb'} />
              <div className={styles.infos}>
                <span>Louis</span>
                <span>No disturbing</span>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default NavbarLeft
