"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Pencil, Check, X } from "lucide-react";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
        if (data) setCategories(data);
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setAdding(true);

        const { error } = await supabase.from('categories').insert([{ name: name.trim() }]);
        if (!error) {
            setName("");
            await fetchCategories();
        } else {
            alert("Error adding category. It may already exist.");
        }
        setAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (!error) {
            await fetchCategories();
        } else {
            alert("Error deleting category. It might be linked to existing products.");
        }
    };

    const startEditing = (cat: any) => {
        setEditingId(cat.id);
        setEditingName(cat.name);
    };

    const handleUpdate = async () => {
        if (!editingName.trim()) return;
        setUpdating(true);
        const { error } = await supabase
            .from('categories')
            .update({ name: editingName.trim() })
            .eq('id', editingId);

        if (!error) {
            setEditingId(null);
            await fetchCategories();
        } else {
            alert("Error updating category name.");
        }
        setUpdating(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingName("");
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Manage Categories</h1>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', marginBottom: '2rem', maxWidth: '500px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Add New Category</h2>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Category Name (e.g., Necklaces)"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn btn-primary" disabled={adding}>
                        {adding ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--accent-light)', borderBottom: '1px solid var(--accent-grey)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Created At</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No categories found</td></tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid var(--accent-grey)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {editingId === cat.id ? (
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                autoFocus
                                                style={{ padding: '0.25rem 0.5rem', width: '100%' }}
                                            />
                                        ) : (
                                            cat.name
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', color: '#666' }}>{new Date(cat.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            {editingId === cat.id ? (
                                                <>
                                                    <button onClick={handleUpdate} style={{ color: 'var(--success)' }} disabled={updating} aria-label="Save">
                                                        <Check size={18} />
                                                    </button>
                                                    <button onClick={handleCancel} style={{ color: '#666' }} aria-label="Cancel">
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditing(cat)} style={{ color: 'var(--accent-dark)' }} aria-label="Edit">
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(cat.id)} style={{ color: 'var(--error)' }} aria-label="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
