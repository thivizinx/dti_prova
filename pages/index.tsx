import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lembrete from './components/Lembrete.js'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Lembrete/>
    </div>
    
  )
}

export default Home
