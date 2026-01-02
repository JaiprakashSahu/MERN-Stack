import { useState } from 'react';

function ContactForm({ onContactAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        if (!email) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.phone.trim() &&
            (formData.email === '' || validateEmail(formData.email))
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save contact');
            }

            const savedContact = await response.json();

            setFormData({ name: '', email: '', phone: '', message: '' });
            setSuccessMessage('Contact saved successfully!');
            onContactAdded(savedContact);

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form-container">
            <h2 className="form-title">Add New Contact</h2>

            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            {errors.submit && (
                <div className="error-message" style={{ marginBottom: '16px' }}>
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter full name"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter email address"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Phone <span className="required">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Enter phone number"
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Enter a message (optional)"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={!isFormValid() || isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Contact'}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
