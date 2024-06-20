import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './styles.module.scss'

/* graphql */
import { useGetMessagesQuery } from '../../generated/graphql'

/* components */
import Avatar from '../../components/atoms/Avatar'
import Icon from '../../components/atoms/Icon'

/* hooks */
import { useAppSelector } from '../../hooks/reduxHooks'
import moment, { Moment } from 'moment'

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

  const userId = useAppSelector((state: any) => state.user.id)

  const [messages, setMessages] = useState<MessageProps[]>([])

  const { loading, data, refetch } = useGetMessagesQuery({
    variables: { id: parseInt(idValue) },
  })

  useEffect(() => {
    refetch()
    if (data) {
      console.log('data', data)
      setMessages(data?.getMessages ?? [])
    } else {
      setMessages([])
    }
  }, [data, loading, id])

  return (
    <main className={styles.chat}>
      <header className={styles.chat__header}>
        <div className={styles.chat__header__infos}>
          <div>
            <Avatar />
          </div>
          <div>
            <h1>Florent Parigo</h1>
            <p>Online</p>
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
        <ChatContent messages={messages} userId={userId} />
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
          <div className={styles.chat__footer__input}>
            <div>
              <input type="text" name="submitText" id="text" />
              <div>
                <Icon name="emote" />
              </div>
            </div>
            <button>
              <Icon name="send" />
            </button>
          </div>
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
  userId: string
}

const ChatContent = ({ messages, userId }: ChatContentProps) => {
  let previousMessageDate: Moment | null = null

  return (
    <section className={styles.chat__content}>
      {messages?.map((message: MessageProps) => {
        const userConnectedIsAuthor = parseInt(userId) === message?.author?.id
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
                userConnectedIsAuthor
                  ? styles.message__left
                  : styles.message__right
              }`}
            >
              {userConnectedIsAuthor && (
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
