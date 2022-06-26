import * as React from 'react'
import Head from "next/head"
import styles from '../styles/header.module.css';
import { NextPage } from 'next'
import { MainLayout } from '../components-layout/MainLayout';
import { Footer } from '../components-layout/Footer';
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { decrement, increment, incrementByAmount, selectCount, } from '../features/counter/counterSlice';

interface Props { }

const CounterPage: NextPage<Props> = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const [incrementAmount, setIncrementAmount] = useState<number>(0);

    return (
        <>
            <MainLayout >
                <Head>
                    <title>Counter Page Title</title>
                </Head>
                <div>
                    <h1>Counter Page. Example of usage Redux</h1>
                    <h3>The current number is {count}</h3>
                    <div className="counter">
                        <input
                            value={incrementAmount}
                            onChange={(e) => setIncrementAmount(Number(e.target.value))}
                            type="number"
                            name="contactsSearch-input"
                            placeholder="count" />
                        <button className={styles.buttonPrimary} onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}>
                            Increment by amount
                        </button>
                        {/* Increment and decrement buttons */}
                        <div className='counterButtonsBlock'>
                            <button className={styles.buttonPrimary} onClick={() => dispatch(increment())}>+</button>
                            <button className={styles.buttonPrimary} onClick={() => dispatch(decrement())}>-</button>
                        </div>
                    </div>
                </div>
            </MainLayout >
            <Footer />
        </>
    )
}

export default CounterPage;