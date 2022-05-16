import Link from "next/link"
import Head from "next/head"
import { MainLayout } from "../components-layout/MainLayout"
import { Footer } from "../components-layout/Footer"
import * as React from 'react'
import { NextPage } from 'next'
import styles from "../styles/header.module.css";
import { signIn, signOut, useSession } from "next-auth/react"

const Index: NextPage = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    return (
        <>
            <MainLayout title={'Home Page'}>
                <Head>
                    <title>Initial Page Next.js App</title>
                </Head>
                <section className="initialPage">
                    <h1>Initial Page</h1>
                    <div className={styles.signedInStatus}>
                        {/* Check session */}
                        <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
                            }`}>
                            {!session && (
                                <>
                                    <span className={styles.notSignedInText}>
                                        For more info please sign in
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
                </section>
            </MainLayout>
            <Footer />
        </>
    )
}

export default Index;