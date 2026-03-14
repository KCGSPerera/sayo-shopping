"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        orders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [
                { count: productCount },
                { count: categoryCount },
                { count: orderCount }
            ] = await Promise.all([
                supabase.from('products').select('*', { count: 'exact', head: true }),
                supabase.from('categories').select('*', { count: 'exact', head: true }),
                supabase.from('orders').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                products: productCount || 0,
                categories: categoryCount || 0,
                orders: orderCount || 0
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            {loading ? (
                <p>Loading stats...</p>
            ) : (
                <div className="grid grid-cols-3">
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
                        <h3 style={{ fontSize: '1.125rem', color: '#666', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Total Products</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 600 }}>{stats.products}</p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
                        <h3 style={{ fontSize: '1.125rem', color: '#666', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Categories</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 600 }}>{stats.categories}</p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)' }}>
                        <h3 style={{ fontSize: '1.125rem', color: '#666', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>Orders</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 600 }}>{stats.orders}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
