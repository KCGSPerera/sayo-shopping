"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone1: '',
        phone2: '',
        email: '',
        address: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Save to Supabase 'contacts' table
        const { error } = await supabase
            .from('contacts')
            .insert([
                {
                    full_name: formData.fullName,
                    phone1: formData.phone1,
                    phone2: formData.phone2,
                    email: formData.email,
                    address: formData.address,
                    description: formData.description
                }
            ]);

        setIsSubmitting(false);

        if (!error) {
            setSuccess(true);

            // Send Email Notification
            try {
                await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } catch (emailErr) {
                console.error("Failed to send email notification:", emailErr);
            }

            // Construct WhatsApp Message
            const whatsappNumber = "94715804185";
            const message = `*New Inquiry via Sayoshopping Website*

Name: ${formData.fullName}
Email: ${formData.email}
Phone 1: ${formData.phone1}
Phone 2: ${formData.phone2 || 'N/A'}
Address: ${formData.address}

Message:
${formData.description}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Redirect after a short delay so the success message is visible
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                setFormData({ fullName: '', phone1: '', phone2: '', email: '', address: '', description: '' });
                setSuccess(false);
            }, 1000);

        } else {
            alert("There was an error submitting your message. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen py-section-large container-wide">
                <div className="split-layout" style={{ gap: '6vw', alignItems: 'flex-start' }}>
                    {/* Editorial Left Side */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <h1 style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>Get in<br />Touch</h1>
                        <p style={{ fontSize: '1.25rem', color: '#555', marginBottom: '4rem', maxWidth: '450px', lineHeight: 1.8 }}>
                            Whether you're inquiring about a bespoke piece or require assistance with an existing order, we are here to provide an unparalleled experience.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Boutique & Office</h4>
                                <p style={{ color: '#888', fontSize: '1.125rem' }}>Colombo, Sri Lanka</p>
                            </div>
                            <div>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--accent-dark)' }}>Business Hours</h4>
                                <p style={{ color: '#888', fontSize: '1.125rem' }}>Mon - Sat: 9:00 AM - 6:00 PM<br />Sun: Private Appointments</p>
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <a href="https://wa.me/94715804185" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.75rem', padding: '1.25rem 3rem' }}>
                                    <Send size={18} /> Direct WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Elegant Form Right Side */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send a Message</h3>

                        {success && (
                            <div style={{ padding: '1rem', backgroundColor: 'var(--success)', color: 'white', marginBottom: '1.5rem', borderRadius: '4px' }}>
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Full Name</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none' }} placeholder="Your Name" />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none' }} placeholder="Your Email" />
                            </div>
                            <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                    <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Primary Phone</label>
                                    <input required type="tel" name="phone1" value={formData.phone1} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none' }} placeholder="+94 XXXXXXXX" />
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                    <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Secondary Phone</label>
                                    <input type="tel" name="phone2" value={formData.phone2} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none' }} placeholder="(Optional)" />
                                </div>
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Delivery Address</label>
                                <input required type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none' }} placeholder="City, Country" />
                            </div>
                            <div className="form-group" style={{ margin: 0 }}>
                                <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888' }}>Message Details</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--accent-dark)', padding: '1rem 0', fontSize: '1.125rem', background: 'transparent', outline: 'none', resize: 'vertical' }} rows={4} placeholder="How can we assist you?"></textarea>
                            </div>

                            <button type="submit" className="btn btn-outline" style={{ marginTop: '1rem', padding: '1.5rem', width: '100%', fontSize: '1rem', letterSpacing: '0.15em' }} disabled={isSubmitting}>
                                {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT INQUIRY'}
                            </button>
                        </form>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
