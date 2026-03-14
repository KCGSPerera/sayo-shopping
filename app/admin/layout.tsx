"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, ShoppingCart, LogOut, Users, KeyRound } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && pathname !== "/admin/login") {
                router.push("/admin/login");
            } else if (session) {
                setAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push("/admin/login");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [pathname, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Panel...</div>;
    }

    // If on login page, render without sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!authenticated) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

            {/* Sidebar */}
            <aside style={{ width: '280px', backgroundColor: 'var(--accent-dark)', color: 'white', padding: '3rem 2rem' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '4rem', letterSpacing: '0.1em', fontFamily: 'var(--font-serif)', color: 'white' }}>SAYOSHOPPING ADMIN</h2>
                </Link>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname === '/admin' ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname === '/admin' ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <LayoutDashboard size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Dashboard</span>
                    </Link>
                    <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname.includes('/admin/products') ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname.includes('/admin/products') ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <Package size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Products</span>
                    </Link>
                    <Link href="/admin/categories" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname.includes('/admin/categories') ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname.includes('/admin/categories') ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <Tag size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Categories</span>
                    </Link>
                    <Link href="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname.includes('/admin/orders') ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname.includes('/admin/orders') ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <ShoppingCart size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Orders</span>
                    </Link>
                    <Link href="/admin/register" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname.includes('/admin/register') ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname.includes('/admin/register') ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <Users size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Admins</span>
                    </Link>
                    <Link href="/admin/reset-password" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0', backgroundColor: pathname.includes('/admin/reset-password') ? 'rgba(255,255,255,0.05)' : 'transparent', color: pathname.includes('/admin/reset-password') ? 'white' : '#888', transition: 'var(--transition-smooth)' }}>
                        <KeyRound size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Reset Password</span>
                    </Link>
                </nav>

                <div style={{ position: 'absolute', bottom: '3rem', width: '216px' }}>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', width: '100%', color: '#666', transition: 'color 0.3s', textAlign: 'left', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>

        </div>
    );
}
