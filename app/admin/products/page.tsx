"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Image as ImageIcon, X, Eye } from "lucide-react";

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // View Modal State
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [viewProduct, setViewProduct] = useState<any>(null);
    const [viewImages, setViewImages] = useState<any[]>([]);

    // Form State
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        price: "",
        category_id: "",
        color: "",
        description: "", // text lines, will convert to JSON array
        quantity: "0",
        is_active: true
    });

    // Image State
    const [existingImages, setExistingImages] = useState<any[]>([]);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

    useEffect(() => {
        fetchProductsAndCategories();
    }, []);

    const fetchProductsAndCategories = async () => {
        const { data: pData } = await supabase
            .from('products')
            .select('*, category:categories(name)')
            .order('created_at', { ascending: false });

        const { data: cData } = await supabase.from('categories').select('*');

        if (pData) setProducts(pData);
        if (cData) setCategories(cData);
        setLoading(false);
    };

    const handleOpenModal = async (product: any = null) => {
        if (product) {
            setCurrentProductId(product.id);
            setFormData({
                name: product.name,
                code: product.code || "",
                price: product.price.toString(),
                category_id: product.category_id || "",
                color: product.color || "",
                description: product.description ? product.description.join('\n') : "",
                quantity: (product.quantity || 0).toString(),
                is_active: product.is_active
            });

            const { data: images } = await supabase.from('product_images').select('*').eq('product_id', product.id);
            setExistingImages(images || []);
        } else {
            setCurrentProductId(null);
            setFormData({ name: "", code: "", price: "", category_id: "", color: "", description: "", quantity: "0", is_active: true });
            setExistingImages([]);
        }
        setNewImageFiles([]);
        setIsModalOpen(true);
    };

    const handleViewProduct = async (product: any) => {
        setViewProduct(product);
        const { data: images } = await supabase.from('product_images').select('*').eq('product_id', product.id);
        setViewImages(images || []);
        setIsViewOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const totalImages = existingImages.length + newImageFiles.length + filesArray.length;

            if (totalImages > 5) {
                alert("Maximum 5 images allowed per product.");
                return;
            }
            setNewImageFiles([...newImageFiles, ...filesArray]);
        }
    };

    const handleDeleteExistingImage = async (imageId: string, url: string) => {
        // Delete from DB
        await supabase.from('product_images').delete().eq('id', imageId);

        // Attempt to delete from storage (extract filename from URL)
        const fileName = url.split('/').pop();
        if (fileName) {
            await supabase.storage.from('product-images').remove([fileName]);
        }

        setExistingImages(existingImages.filter(img => img.id !== imageId));
    };

    const removeNewFile = (index: number) => {
        setNewImageFiles(newImageFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.category_id) {
            alert("Please select a category");
            return;
        }

        setSaving(true);

        // 1. Process descriptions
        const descArray = formData.description.split('\n').filter(line => line.trim() !== '');

        const payload = {
            name: formData.name,
            code: formData.code || null,
            price: parseFloat(formData.price),
            category_id: formData.category_id,
            color: formData.color,
            description: descArray,
            quantity: parseInt(formData.quantity) || 0,
            is_active: formData.is_active
        };

        let productId = currentProductId;

        // 2. Save Product
        if (productId) {
            await supabase.from('products').update(payload).eq('id', productId);
        } else {
            const { data } = await supabase.from('products').insert([payload]).select().single();
            if (data) productId = data.id;
        }

        // 3. Upload New Images
        if (productId && newImageFiles.length > 0) {
            for (const file of newImageFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${productId}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file, { cacheControl: '3600', upsert: false });

                if (uploadData && !uploadError) {
                    const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName);

                    await supabase.from('product_images').insert([{
                        product_id: productId,
                        image_url: publicUrlData.publicUrl
                    }]);
                }
            }
        }

        await fetchProductsAndCategories();
        setIsModalOpen(false);
        setSaving(false);
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Are you sure you want to delete this product? All active orders must be cleared first.")) {
            // First delete images from storage
            const { data: images } = await supabase.from('product_images').select('image_url').eq('product_id', id);
            if (images) {
                const fileNames = images.map(img => img.image_url.split('/').pop()).filter(Boolean) as string[];
                if (fileNames.length > 0) {
                    await supabase.storage.from('product-images').remove(fileNames);
                }
            }

            // Cascading delete will handle DB product_images 
            await supabase.from('products').delete().eq('id', id);
            await fetchProductsAndCategories();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Products</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead style={{ backgroundColor: 'var(--accent-light)', borderBottom: '1px solid var(--accent-grey)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Code</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Category</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Price</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500' }}>Stock</th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No products found</td></tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid var(--accent-grey)' }}>
                                    <td style={{ padding: '1rem', color: '#666' }}>{product.code || "---"}</td>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                                    <td style={{ padding: '1rem', color: '#666' }}>{product.category?.name || "N/A"}</td>
                                    <td style={{ padding: '1rem' }}>Rs. {product.price.toLocaleString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <span style={{
                                            fontWeight: '600',
                                            color: product.quantity > 0 ? 'var(--accent-dark)' : 'var(--error)'
                                        }}>
                                            {product.quantity || 0}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {product.is_active ?
                                            <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem' }}>Active</span> :
                                            <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem' }}>Disabled</span>
                                        }
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            <button onClick={() => handleViewProduct(product)} style={{ color: '#6366f1' }} aria-label="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => handleOpenModal(product)} style={{ color: '#4b5563' }} aria-label="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product.id)} style={{ color: 'var(--error)' }} aria-label="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {isViewOpen && viewProduct && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                        <button onClick={() => setIsViewOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#666' }}><X size={24} /></button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
                            {/* Images Column */}
                            <div>
                                <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--accent-light)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                                    {viewImages.length > 0 ? (
                                        <img src={viewImages[0].image_url} alt={viewProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                                    {viewImages.slice(1).map((img, idx) => (
                                        <div key={idx} style={{ aspectRatio: '1/1', backgroundColor: 'var(--accent-light)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <img src={img.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Details Column */}
                            <div>
                                <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
                                    {viewProduct.category?.name || "Uncategorized"}
                                </p>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{viewProduct.name}</h2>
                                <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>Rs. {viewProduct.price.toLocaleString()}</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Product Code</h4>
                                        <p style={{ fontWeight: '500' }}>{viewProduct.code || "---"}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Available Stock</h4>
                                        <p style={{ fontWeight: '500', color: viewProduct.quantity > 0 ? 'var(--accent-dark)' : 'var(--error)' }}>
                                            {viewProduct.quantity} units
                                        </p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Color</h4>
                                        <p style={{ fontWeight: '500' }}>{viewProduct.color || "---"}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Visibility</h4>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            backgroundColor: viewProduct.is_active ? '#dcfce7' : '#fee2e2',
                                            color: viewProduct.is_active ? '#166534' : '#991b1b'
                                        }}>
                                            {viewProduct.is_active ? 'Public' : 'Hidden'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Description Points</h4>
                                    {viewProduct.description && viewProduct.description.length > 0 ? (
                                        <ul style={{ paddingLeft: '1.25rem', color: '#444', lineHeight: 1.6 }}>
                                            {viewProduct.description.map((point: string, idx: number) => (
                                                <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ color: '#888', fontStyle: 'italic' }}>No description provided.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Add Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{currentProductId ? 'Edit Product' : 'Add New Product'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>

                                {/* Left Column: Form Details */}
                                <div>
                                    <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Product Name *</label>
                                            <input type="text" required className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Product Code (e.g. SYJS001)</label>
                                            <input type="text" className="form-input" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3" style={{ gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Price (Rs) *</label>
                                            <input type="number" required step="0.01" className="form-input" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Quantity *</label>
                                            <input type="number" required className="form-input" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Category *</label>
                                            <select className="form-input" required value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value })} style={{ backgroundColor: 'white' }}>
                                                <option value="">Select...</option>
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Color (Optional)</label>
                                        <input type="text" className="form-input" placeholder="e.g. Gold, Silver, Rose Gold" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Description (bullet points, one per line)</label>
                                        <textarea className="form-input" rows={4} placeholder="18K Solid Gold&#10;Diamond Encrusted&#10;Lifetime Warranty" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input type="checkbox" id="is_active" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} style={{ width: '1rem', height: '1rem' }} />
                                        <label htmlFor="is_active" style={{ cursor: 'pointer' }}>Active (Visible to public)</label>
                                    </div>
                                </div>

                                {/* Right Column: Images */}
                                <div style={{ backgroundColor: 'var(--accent-light)', padding: '1.5rem', borderRadius: '4px' }}>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ImageIcon size={18} /> Images (Max 5)</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                        {/* Existing Images */}
                                        {existingImages.map(img => (
                                            <div key={img.id} style={{ position: 'relative', aspectRatio: '1/1', backgroundImage: `url(${img.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px', border: '1px solid var(--accent-grey)' }}>
                                                <button type="button" onClick={() => handleDeleteExistingImage(img.id, img.image_url)} style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--error)', color: 'white', borderRadius: '50%', padding: '0.25rem' }}><X size={12} /></button>
                                            </div>
                                        ))}

                                        {/* New Images Preview */}
                                        {newImageFiles.map((file, idx) => (
                                            <div key={idx} style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', borderRadius: '4px', textAlign: 'center', padding: '0.5rem', wordBreak: 'break-all' }}>
                                                {file.name}
                                                <button type="button" onClick={() => removeNewFile(idx)} style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--foreground)', color: 'white', borderRadius: '50%', padding: '0.25rem' }}><X size={12} /></button>
                                            </div>
                                        ))}
                                    </div>

                                    {existingImages.length + newImageFiles.length < 5 && (
                                        <div className="form-group">
                                            <label className="btn btn-outline" style={{ width: '100%', cursor: 'pointer', textAlign: 'center' }}>
                                                Choose Images
                                                <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                            </label>
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
                                                {5 - (existingImages.length + newImageFiles.length)} slots remaining
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--accent-grey)' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline" disabled={saving}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
