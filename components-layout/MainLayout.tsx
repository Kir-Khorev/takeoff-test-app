import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "../styles/header.module.css";

export function MainLayout({ children, title = 'Next App Layout' }) {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    return (
        <>
            <Head>
                <title>{title} | Next Kurs</title>
                <meta name="keywords" content="Key, My, Posts"></meta>
                <meta name="description" content="This is my posts description"></meta>
            </Head>
            <nav>
                <Link href={'/'}><a>Home</a></Link>
                <Link href={'/contacts'}><a>Contacts</a></Link>
                <Link href={'/counter'}><a>Counter</a></Link>
                <div className={styles.signedInStatus}>
                    <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
                        }`}>
                        {!session && (
                            <>
                                <span className={styles.notSignedInText}>
                                    You are not signed in
                                </span>
                                <a
                                    href={`/api/auth/signin`}
                                    className={styles.buttonPrimary}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signIn()
                                    }}
                                >
                                    Sign in
                                </a>
                            </>
                        )}
                        {session?.user && (
                            <>
                                <span
                                    style={{ backgroundImage: `url(${session.user.image})` }}
                                    className={styles.avatar}
                                />
                                <span className={styles.signedInText}>
                                    <small>Signed in as</small>
                                    <br />
                                    <strong>{session.user.email || session.user.name}</strong>
                                </span>
                                <a
                                    href={`/api/auth/signout`}
                                    className={styles.button}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                    }}
                                >
                                    Sign out
                                </a>
                            </>
                        )}
                    </p>
                </div>
            </nav>
            <main>
                {children}
            </main>
            <style jsx global>
                {`
                    nav { 
                        position: fixed;
                        height: 60px;
                        left: 0;
                        right: 0;
                        top: 0;
                        background: lightskyblue;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    nav a {
                        color: white;
                        text-decoration: none;
                        transition: all ease-in .3s;
                    }
                    nav a:hover {
                        color: whitesmoke;
                    }
                    main {
                        margin-top: 60px;
                    }
                `}
            </style>
        </>
    )
}