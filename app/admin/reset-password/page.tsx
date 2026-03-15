"use client";

import { useState } from "react";
import { KeyRound, Mail, AlertTriangle, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/admin/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword, confirmPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to reset password");
            } else {
                setSuccess("Password reset successfully!");
                setEmail("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Reset Admin Password</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>You can reset the password for any administrator account by providing their email.</p>

            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', maxWidth: '600px' }}>

                <div style={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    padding: '1.25rem',
                    borderRadius: '6px',
                    marginBottom: '2rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                }}>
                    <AlertTriangle style={{ color: '#d97706', flexShrink: 0 }} size={20} />
                    <p style={{ color: '#92400e', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                        <strong>Security Warning:</strong> This operation will immediately change the password for the specified admin account. The user will be required to log in with the new password next time.
                    </p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleReset}>
                    <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={16} /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="admin@example.com"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <KeyRound size={16} /> New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                minLength={6}
                                placeholder="Min. 6 characters"
                                className="form-input"
                                style={{ paddingRight: '3rem' }}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={16} /> Confirm New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                placeholder="Repeat new password"
                                className="form-input"
                                style={{ paddingRight: '3rem' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '1rem' }}
                    >
                        {loading ? 'Processing Reset...' : 'Confirm Password Reset'}
                    </button>
                </form>
            </div>
        </div>
    );
}
