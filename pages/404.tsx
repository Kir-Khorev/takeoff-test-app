import Link from "next/link"
import classes from '../styles/error.module.scss'
import { Footer } from "../components-layout/Footer"
import { MainLayout } from '../components-layout/MainLayout';

export default function ErrorPage() {
    return (
        <>
            <MainLayout>
                <h2 className={classes.error}>Oops... Error 404</h2>
                <Link href={'/'}><a>Go to Home</a></Link>
            </MainLayout>
            <Footer />
        </>
    )
}
