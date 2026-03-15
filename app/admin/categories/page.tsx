"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Pencil, Check, X, Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";

export default function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [editingImageFile, setEditingImageFile] = useState<File | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
        if (data) setCategories(data);
        setLoading(false);
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 10)}-${Date.now()}.${fileExt}`;

        // Using 'product-images' bucket as it's already configured and working
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(`categories/${fileName}`, file);

        if (error) {
            console.error("Upload error:", error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(`categories/${fileName}`);
        return publicUrl;
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setAdding(true);

        let imageUrl = null;
        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
            if (!imageUrl) {
                alert("Failed to upload image.");
                setAdding(false);
                return;
            }
        }

        const { error } = await supabase.from('categories').insert([{
            name: name.trim(),
            image_url: imageUrl
        }]);

        if (!error) {
            setName("");
            setImageFile(null);
            const fileInput = document.getElementById('category-image') as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            await fetchCategories();
        } else {
            alert("Error adding category. It may already exist.");
        }
        setAdding(false);
    };

    const handleDelete = async (id: string, imageUrl: string | null) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        // Delete category
        const { error } = await supabase.from('categories').delete().eq('id', id);

        if (!error) {
            // Delete image from storage if exists
            if (imageUrl) {
                try {
                    const fileName = imageUrl.split('/').pop();
                    if (fileName) {
                        await supabase.storage.from('product-images').remove([`categories/${fileName}`]);
                    }
                } catch (e) {
                    console.error("Error deleting image from storage:", e);
                }
            }
            await fetchCategories();
        } else {
            alert("Error deleting category. It might be linked to existing products.");
        }
    };

    const startEditing = (cat: any) => {
        setEditingId(cat.id);
        setEditingName(cat.name);
        setEditingImageFile(null);
    };

    const handleUpdate = async (cat: any) => {
        if (!editingName.trim()) return;
        setUpdating(true);

        let imageUrl = cat.image_url;
        if (editingImageFile) {
            // Upload new image
            const newUrl = await uploadImage(editingImageFile);
            if (newUrl) {
                imageUrl = newUrl;
                // Try to delete old image
                if (cat.image_url) {
                    try {
                        const oldFileName = cat.image_url.split('/').pop();
                        if (oldFileName) {
                            await supabase.storage.from('product-images').remove([`categories/${oldFileName}`]);
                        }
                    } catch (e) { }
                }
            }
        }

        const { error } = await supabase
            .from('categories')
            .update({
                name: editingName.trim(),
                image_url: imageUrl
            })
            .eq('id', editingId);

        if (!error) {
            setEditingId(null);
            setEditingImageFile(null);
            await fetchCategories();
        } else {
            alert("Error updating category.");
        }
        setUpdating(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingName("");
        setEditingImageFile(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Manage Categories</h1>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', marginBottom: '2rem', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Add New Category</h2>
                <form onSubmit={handleAdd}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
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
                            {adding ? 'Adding...' : 'Add Category'}
                        </button>
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#666', fontSize: '0.875rem' }}>
                            <div style={{ padding: '0.5rem 1rem', border: '1px dashed #ccc', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Upload size={16} />
                                {imageFile ? imageFile.name : "Select Image (Optional)"}
                            </div>
                            <input
                                id="category-image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                </form>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--accent-light)', borderBottom: '1px solid var(--accent-grey)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', width: '80px' }}>Image</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Created At</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No categories found</td></tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid var(--accent-grey)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {editingId === cat.id ? (
                                            <label style={{ cursor: 'pointer', display: 'block' }}>
                                                <div style={{ width: '60px', height: '60px', borderRadius: '4px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px dashed #ccc' }}>
                                                    {editingImageFile ? (
                                                        <img src={URL.createObjectURL(editingImageFile)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : cat.image_url ? (
                                                        <Image src={cat.image_url} alt={cat.name} width={60} height={60} style={{ objectFit: 'cover' }} />
                                                    ) : (
                                                        <ImageIcon size={20} color="#999" />
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setEditingImageFile(e.target.files?.[0] || null)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        ) : (
                                            <div style={{ width: '60px', height: '60px', borderRadius: '4px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                {cat.image_url ? (
                                                    <Image src={cat.image_url} alt={cat.name} width={60} height={60} style={{ objectFit: 'cover' }} />
                                                ) : (
                                                    <ImageIcon size={20} color="#999" />
                                                )}
                                            </div>
                                        )}
                                    </td>
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
                                            <div style={{ fontWeight: '500' }}>{cat.name}</div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', color: '#666' }}>{new Date(cat.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            {editingId === cat.id ? (
                                                <>
                                                    <button onClick={() => handleUpdate(cat)} style={{ color: 'var(--success)' }} disabled={updating} aria-label="Save">
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
                                                    <button onClick={() => handleDelete(cat.id, cat.image_url)} style={{ color: 'var(--error)' }} aria-label="Delete">
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
