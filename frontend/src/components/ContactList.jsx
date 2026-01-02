function ContactList({ contacts, onDeleteContact, isLoading }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="contact-list-container">
                <h2 className="list-title">Saved Contacts</h2>
                <div className="loading">Loading contacts...</div>
            </div>
        );
    }

    return (
        <div className="contact-list-container">
            <h2 className="list-title">Saved Contacts ({contacts.length})</h2>

            {contacts.length === 0 ? (
                <div className="empty-message">
                    No contacts yet. Add your first contact above!
                </div>
            ) : (
                contacts.map((contact) => (
                    <div key={contact._id} className="contact-card">
                        <div className="contact-header">
                            <span className="contact-name">{contact.name}</span>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteContact(contact._id)}
                            >
                                Delete
                            </button>
                        </div>

                        <div className="contact-info">
                            <span><strong>Phone:</strong> {contact.phone}</span>
                            {contact.email && (
                                <span><strong>Email:</strong> {contact.email}</span>
                            )}
                        </div>

                        {contact.message && (
                            <div className="contact-message">
                                {contact.message}
                            </div>
                        )}

                        <div className="contact-date">
                            Added: {formatDate(contact.createdAt)}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ContactList;
