import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${apiUrl}/contacts`);
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleContactAdded = (newContact) => {
        setContacts((prev) => [newContact, ...prev]);
    };

    const handleDeleteContact = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/contacts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete contact');

            setContacts((prev) => prev.filter((contact) => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div className="app">
            <h1 className="app-title">Contact Management</h1>

            <ContactForm onContactAdded={handleContactAdded} />

            <ContactList
                contacts={contacts}
                onDeleteContact={handleDeleteContact}
                isLoading={isLoading}
            />
        </div>
    );
}

export default App;
