import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import packageJson from '../../../package.json'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Popup from '../../components/Popup'
import UserContext from '../../contexts/UserContext'
import styles from './styles.module.sass'
import type { Server } from '../../types'
import type { FormEvent} from 'react'

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [servers, setServers] = useState<Server[] | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [addingError, setAddingError] = useState<boolean>(false)
  const [showPopup, setPopupVisibility] = useState<boolean>(false)

  const { token, user } = useContext(UserContext)

  const addServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const host = (e.target as HTMLFormElement).host.value
    const port = (e.target as HTMLFormElement).port.value
    const username = (e.target as HTMLFormElement).username.value
    const password = (e.target as HTMLFormElement).password.value

    const res = await fetch((import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.drgnjs.com') + '/servers/add', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'drgn-version': packageJson.version,
        'authorization': `bearer ${token}`
      },
      body: JSON.stringify({
        host,
        port,
        username,
        password
        /*
        ...(password.length > 64 ? {
          privateKey: password
        } : {
          password
        })
        */
      })
    })

    if (!res.ok) {
      setAddingError(true)
    } else {
      const server = (await res.json()).server

      setServers(!servers || servers.length === 0 ? [server] : [server, ...servers])
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchServers = async () => {
      const res = await fetch((import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.drgnjs.com') + '/servers', {
        headers: {
          accept: 'application/json',
          'drgn-version': packageJson.version,
          'authorization': `bearer ${token}`
        }
      })

      if (res.status === 200) setServers((await res.json()).servers)
      else setError(true)

      setLoading(false)
    }

    fetchServers()
  }, [])

  return user ? (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : error || !servers ? (
        <div className={styles.error}>
          <h3>Ooops!</h3>
          <p>Something went wrong.</p>
        </div>
      ) : addingError ? (
        <div className={styles.error}>
          <h3>Invalid Credentials</h3>
          <p>Please provide valid credentials.</p>
          <span onClick={() => setAddingError(false)}>Try again</span>
        </div>
      ) : servers.length === 0 ? (
        <div className={styles.noServerFound}>
          <h3>No Servers Found</h3>
          <p>Try to add a new one.</p>
          <Popup
            content={
              <div className={styles.addServer}>
                <h1>New Server</h1>

                <form onSubmit={addServer}>
                  <div className={styles.row}>
                    <label>Host
                      <input
                        name='host'
                        maxLength={32}
                        required
                        type='text'
                      />
                    </label>
                    <label>Port
                      <input
                        name='port'
                        maxLength={2}
                        required
                        type='text'
                      />
                    </label>
                  </div>
                  <label>Username
                    <input
                      name='username'
                      minLength={1}
                      maxLength={64}
                      required
                      type='text'
                    />
                  </label>
                  <label>Password {/* or Private Key */}
                    <input
                      name='password'
                      minLength={4}
                      maxLength={5000}
                      required
                      type='password'
                    />
                  </label>
                  <Button type='submit'>Add Server</Button>
                </form>
              </div>
            }
            isVisible={showPopup}
            setVisibility={setPopupVisibility}
          >
            <Button>Add a Server</Button>
          </Popup>
        </div>
      ) : (
        <div className={styles.servers}>
          {servers.map((server, i) => (
            <div className={styles.server} key={i}>
              <h4>{server.credentials.host}<span>:{server.credentials.port}</span></h4>
            </div>
          ))}
          <span>More coming soon!</span>
        </div>
      )}
    </div>
  ) : <Navigate replace to='/login' />
}

export default Dashboard
