import '../styles/main.css';
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react"
import Script from "next/script"
import * as React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export default class MyApp extends App {
    render() {
        const { Component, pageProps, router } = this.props

        return (
            <>
                <Head>
                    <title>My App</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Provider store={store}>
                    <SessionProvider session={pageProps.session} >
                        <Component {...pageProps} router={router} />
                    </SessionProvider>
                </Provider>
            </>
        )
    }
}