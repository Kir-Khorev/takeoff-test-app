import * as React from 'react'
import { NextPage } from 'next'
import { MainLayout } from '../components-layout/MainLayout';
import { Footer } from '../components-layout/Footer';
import AccessDenied from '../components-layout/access-denied';
import { useSession } from 'next-auth/react'
import Head from "next/head"
import { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { useCallback } from 'react';
import { MyContact } from '../interfaces/contact';
import { addNewContact, changeContact } from '../features/contacts/contactsChanger';

interface PostsPageProps {
    contacts: MyContact[]
}

interface Props { }

const ContactsPage: NextPage<Props> = ({ contacts: serverContacts }: PostsPageProps) => {
    const [contacts, setContacts] = useState(serverContacts);
    const { data: session } = useSession();

    // Search filter
    const filterIt = (terms, arr) => {
        if ("" === terms || terms.length < 2) return arr;
        const words = terms.match(/[\wа-я]+|"[^"]+"/g);
        words.push(terms);
        return arr.filter((a) => {
            const v = Object.values(a);
            const f = JSON.stringify(v).toLowerCase();
            return words.every(val => f.includes(val));
        });
    };

    // Search List
    const filterList = useCallback(({ target }) => {
        const searchQuery = target.value.toLowerCase();
        const updatedList = filterIt(searchQuery, contacts);
        setContacts(updatedList);
    }, []);

    // If no session exists, display access denied message
    if (!session) { return <> <MainLayout><AccessDenied /> </MainLayout><Footer /></> }

    // If session exists, display content
    return (
        <>
            <MainLayout>
                <Head>
                    <title>Protected Contacts Page Title Next.js</title>
                </Head>
                <section className='contacts'>
                    <h1>Contacts Page</h1>
                    {/* Search panel */}
                    <section className='contactsSearch'>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                onChange={(e) => filterList(e)}
                                name="contactsSearch-input"
                                placeholder="Search" />
                            <label htmlFor="contactsSearch-input">Search...</label>
                        </div>
                    </section>

                    {/* Table */}
                    <section>
                        <div className="table">
                            {/* Table Header */}
                            <div className="row">
                                <div className="cell title middle center">#id</div>
                                <div className="cell title middle center">Name</div>
                                <div className="cell title middle center">Email</div>
                                <div className="cell title middle center">Phone</div>
                                <div className="cell title middle center">Change</div>
                                <div className="cell title middle center">Delete</div>
                            </div>
                            {/* Table rows */}
                            {contacts.map((contact) => {
                                return <form className="row tableForm" key={contact.id} id={contact.id}
                                    onSubmit={(e) => changeContact(e, setContacts, contacts)} >
                                    <span className="cell data middle center">{contact.id}</span>
                                    <div className="cell data middle center"><input type="text" defaultValue={contact.name} /></div>
                                    <div className="cell data middle center"><input type="email" defaultValue={contact.email} /></div>
                                    <div className="cell data middle center"><input type="tel" defaultValue={contact.phone} /></div>
                                    <div className="cell data middle center">
                                        <button type="submit" name='put' form={contact.id}>Change</button>
                                    </div>
                                    <div className="cell data middle center">
                                        <button type="submit" value="delete" name='delete' form={contact.id}>Delete</button>
                                    </div>
                                </form>
                            })}
                        </div>
                        <form action="submit" className="addForm" onSubmit={(e) => addNewContact(e, setContacts, contacts)}>
                            <input type="text" required placeholder='name' />
                            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" placeholder='email' />
                            <input type="tel" required placeholder="phone" />
                            <button type="submit" className="btn btn-info">Add</button>
                        </form>
                    </section>
                </section>
            </MainLayout >
            <Footer />
        </>
    )

}

export default ContactsPage;

// Use Server Side Props for load contacts
export async function getServerSideProps(ctx: NextPageContext) {
    const res = await fetch(`${process.env.API_URL}/contacts`)
    const contacts: MyContact[] = await res.json()
    return { props: { contacts } }
}