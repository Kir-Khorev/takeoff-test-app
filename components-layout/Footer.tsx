import Head from "next/dist/shared/lib/head"
import Image from 'next/image'
import gitlogo from '../public/git.png'

export function Footer({ title = 'Next App Layout' }) {
    return (
        <>
            <Head>
                <title>{title} | Next Kurs</title>
                <meta name="keywords" content="Key, My, Posts"></meta>
                <meta name="description" content="This is my posts description"></meta>
                <meta name="charSet" content="utf-8"></meta>
            </Head>
            <footer className='footer-distributed'>
                <div className="footer-right">
                    <a href="https://github.com/khorek/" target="_blank">
                        <Image alt="git" src={gitlogo}
                            width={32}
                            height={32} />
                    </a>
                </div>
                <div className="footer-left">
                    <p>by khorek &copy; 2022</p>
                </div>
            </footer>
            <style jsx global>
                {`
                    footer {
                        position: fixed; 
                        height: 30px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    nav a {
                        color: white;
                        text-decoration: none;
                    }
                    main {
                        margin-top: 60px;
                        padding-bottom: 15rem;
                    }
                `}
            </style>
        </>
    )
}

