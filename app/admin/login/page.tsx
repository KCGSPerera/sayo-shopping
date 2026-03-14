"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', textAlign: 'center', marginBottom: '0.5rem' }}>Sayoshopping Admin</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Sign in to manage your store</p>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            required
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            required
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/" style={{ fontSize: '0.875rem', color: '#666' }}>&larr; Back to Website</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
