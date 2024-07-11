import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './styles.module.scss'
import moment, { Moment } from 'moment'

/* config */
import { socket } from '../../config/socket'

/* graphql */
import {
  GetMessagesDocument,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../generated/graphql'

/* components */
import Avatar from '../../components/atoms/Avatar'
import Icon from '../../components/atoms/Icon'

/* store */
import { useAppSelector } from '../../hooks/reduxHooks'
import { RootState } from '../../store'

type MessageProps = {
  id: number
  author: {
    id: number
    username: string
    avatar: string
  }
  content: string
  createdAt: string
}

const Chat = () => {
  const { id } = useParams<{ id: string }>()
  const idValue = id ?? ''

  const [inputMessage, setInputMessage] = useState<string>('')
  const [userReceiverStatus, setUserReceiverStatus] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageProps[]>([])

  const userId = useAppSelector((state: RootState) => state.user.id)
  const opennedConversation = useAppSelector(
    (state: RootState) => state.opennedConversation
  )

  const { loading, data, refetch } = useGetMessagesQuery({
    variables: { id: parseInt(idValue) },
  })
  const [createMessage] = useCreateMessageMutation({
    refetchQueries: [{ query: GetMessagesDocument }],
  })

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [idValue, messages])

  useEffect(() => {
    socket.connect()
    socket.emit('joinRoom', idValue)

    socket.on('userJoined', () => {
      setUserReceiverStatus(true)
    })

    socket.on('message', () => {
      refetch()
    })

    return () => {
      socket.emit('leaveRoom', idValue)
      setUserReceiverStatus(false)
      socket.disconnect()
    }
  }, [idValue, messages])

  useEffect(() => {
    refetch()
    if (data) {
      setMessages(data?.getMessages ?? [])
    } else {
      setMessages([])
    }
  }, [data, loading, id])

  function getUsernames(): string[] {
    let usernames: string[] = []
    messages.forEach((message) => {
      if (!usernames.includes(message.author.username)) {
        if (message.author.id !== userId) {
          usernames.push(message.author.username)
        }
      }
    })
    return usernames
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputMessage(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMessage === '') return
    createMessage({
      variables: {
        input: {
          content: inputMessage,
          conversationId: parseInt(idValue),
        },
      },
    }).then(() => {
      setInputMessage('')
    })
  }

  return (
    <main className={styles.chat}>
      <header className={styles.chat__header}>
        <div className={styles.chat__header__infos}>
          <div>
            <Avatar status={userReceiverStatus ? 'online' : 'offline'} />
          </div>
          <div>
            <h1>
              {opennedConversation?.username ??
                getUsernames()?.map((username) => `${username}`)}
            </h1>
            <p>{userReceiverStatus ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className={styles.chat__header__actions}>
          <button className={styles.button}>
            <Icon name="phone" />
          </button>
          <button className={styles.button}>
            <Icon name="video" color="#fff" />
          </button>
        </div>
      </header>
      {messages.length > 0 ? (
        <ChatContent messages={messages} userId={userId ?? ''} />
      ) : (
        <p className={styles.chat__first__message}>
          Write the first message...
        </p>
      )}

      <footer className={styles.chat__footer}>
        <div className={styles.chat__footer__content}>
          <label htmlFor="text" className={styles.chat__footer__label}>
            via&nbsp;
            <span>
              Skype
              <Icon name="arrowBottom" />
            </span>
          </label>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={styles.chat__footer__input}
          >
            <div>
              <input
                value={inputMessage}
                onChange={handleChangeInput}
                type="text"
                name="submitText"
                id="text"
              />
              <div>
                <Icon name="emote" />
              </div>
            </div>
            <button type="submit">
              <Icon name="send" />
            </button>
          </form>
          <label htmlFor="text" className={styles.chat__footer__icons}>
            <Icon name="camera" />
            <Icon name="video" color="#0B9CD5" />
            <Icon name="upload" />
            <Icon name="user" />
          </label>
        </div>
      </footer>
    </main>
  )
}

interface ChatContentProps {
  messages: MessageProps[]
  userId: string | null
}

const ChatContent = ({ messages, userId }: ChatContentProps) => {
  let previousMessageDate: Moment | null = null

  return (
    <section className={styles.chat__content}>
      {messages?.map((message: MessageProps) => {
        const userConnectedIsAuthor =
          parseInt(userId ?? '') === message?.author?.id
        const messageDate = moment(message?.createdAt)
        const isNewDay =
          !previousMessageDate ||
          !messageDate.isSame(previousMessageDate, 'day')
        previousMessageDate = messageDate
        const moreThanOneYear = moment().diff(messageDate, 'years') > 0
        const formattedDate = moreThanOneYear
          ? messageDate.format('dddd DD/MM/YYYY')
          : messageDate.format('dddd DD/MM')

        return (
          <div key={message?.id}>
            {isNewDay && (
              <div className={styles.chat__message__day}>{formattedDate}</div>
            )}
            <div
              className={`${styles.chat__message} ${
                !userConnectedIsAuthor
                  ? styles.message__left
                  : styles.message__right
              }`}
            >
              {!userConnectedIsAuthor && (
                <div className={styles.chat__message__avatar}>
                  <Avatar displayStatus={false} />
                </div>
              )}
              <div className={styles.chat__message__text}>
                <p>{message?.content}</p>
              </div>
              <div className={styles.chat__message__date}>
                {messageDate.format('HH:mm')}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Chat
