// Add new contact
export function addNewContact(e, setState, array) {
    e.preventDefault()
    const newContact = {
        id: `${e.target[0].id}${Math.floor(1000 + Math.random() * 9000)}`,
        name: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        label: ''
    }

    fetch(`${process.env.API_URL}/contacts`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newContact)
    }).then(function (res) {
        return res.json()
    }).then(res => {
        setState([...array, newContact])
    })
}

// Delete and change contact
export function changeContact(e, setState, array) {
    e.preventDefault();
    // DELETE contact
    if (e.nativeEvent.submitter.name === 'delete') {
        fetch(`${process.env.API_URL}/contacts/${e.target.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        }).then(function (res) {
            const filterContacts = array.filter((item) => item.id !== e.target.id);
            setState(filterContacts);
            return
        })
    }

    // PUT (change) contact
    if (e.nativeEvent.submitter.name === 'put') {
        const changeContact = {
            id: e.target.id,
            name: e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
        }
        fetch(`${process.env.API_URL}/contacts/${e.target.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(changeContact)
        })
    }
}