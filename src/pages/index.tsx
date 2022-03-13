import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    const get = async () => {
      const res = await fetch('http://127.0.0.1:9000')
      const json = await res.json()
      setText(json.text)
    }
    get()
  })

  return text ? <h1>Hello {text}</h1> : <h1>Wassup</h1>
}

export default Home
