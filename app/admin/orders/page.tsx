"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, X } from "lucide-react";

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // View Modal State
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [viewOrder, setViewOrder] = useState<any>(null);

    // Form State
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        customer_name: "",
        phone: "",
        address: "",
        product_id: "",
        price: "",
        order_status: "Placed",
        payment_status: "Not Paid"
    });

    useEffect(() => {
        fetchOrdersAndProducts();
    }, []);

    const fetchOrdersAndProducts = async () => {
        const { data: oData } = await supabase.from('orders').select(`*, product:products(name, code)`).order('created_at', { ascending: false });
        const { data: pData } = await supabase.from('products').select('id, name, price, code, quantity');

        if (oData) setOrders(oData);
        if (pData) setProducts(pData);
        setLoading(false);
    };

    const handleOpenModal = (order: any = null) => {
        if (order) {
            setCurrentOrderId(order.id);
            setFormData({
                customer_name: order.customer_name,
                phone: order.phone,
                address: order.address,
                product_id: order.product_id || "",
                price: order.price.toString(),
                order_status: order.order_status,
                payment_status: order.payment_status
            });
        } else {
            setCurrentOrderId(null);
            setFormData({
                customer_name: "", phone: "", address: "", product_id: "", price: "", order_status: "Placed", payment_status: "Not Paid"
            });
        }
        setIsModalOpen(true);
    };

    const handleViewOrder = (order: any) => {
        setViewOrder(order);
        setIsViewOpen(true);
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const prodId = e.target.value;
        const prod = products.find(p => p.id === prodId);
        setFormData({
            ...formData,
            product_id: prodId,
            price: prod ? prod.price.toString() : formData.price
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            product_id: formData.product_id || null,
            price: parseFloat(formData.price)
        };

        if (currentOrderId) {
            // Update
            const originalOrder = orders.find(o => o.id === currentOrderId);
            if (originalOrder && originalOrder.order_status !== formData.order_status) {
                // If changing TO Cancelled, restock
                if (formData.order_status === 'Cancelled' && formData.product_id) {
                    const product = products.find(p => p.id === formData.product_id);
                    if (product) {
                        const newQuantity = (product.quantity || 0) + 1;
                        await supabase.from('products').update({ quantity: newQuantity }).eq('id', product.id);
                    }
                }
                // If changing FROM Cancelled to something else, deduct stock
                else if (originalOrder.order_status === 'Cancelled' && formData.order_status !== 'Cancelled' && formData.product_id) {
                    const product = products.find(p => p.id === formData.product_id);
                    if (product) {
                        const newQuantity = (product.quantity || 0) - 1;
                        await supabase.from('products').update({ quantity: Math.max(0, newQuantity) }).eq('id', product.id);
                    }
                }
            }
            await supabase.from('orders').update(payload).eq('id', currentOrderId);
        } else {
            // Insert
            const { data: newOrder, error: orderError } = await supabase.from('orders').insert([payload]).select().single();

            if (!orderError && payload.product_id) {
                // Deduct stock
                const product = products.find(p => p.id === payload.product_id);
                if (product) {
                    const newQuantity = (product.quantity || 0) - 1;
                    await supabase.from('products').update({ quantity: Math.max(0, newQuantity) }).eq('id', product.id);
                }
            }
        }

        await fetchOrdersAndProducts();
        setIsModalOpen(false);
        setSaving(false);
    };

    const handleCancelClick = async (id: string, currentStatus: string) => {
        if (currentStatus === 'Cancelled') return;
        if (confirm("Are you sure you want to cancel this order?")) {
            // 1. Update order status
            await supabase.from('orders').update({ order_status: 'Cancelled' }).eq('id', id);

            // 2. Restock inventory
            const order = orders.find(o => o.id === id);
            if (order && order.product_id) {
                const product = products.find(p => p.id === order.product_id);
                if (product) {
                    const newQuantity = (product.quantity || 0) + 1;
                    await supabase.from('products').update({ quantity: newQuantity }).eq('id', product.id);
                }
            }

            await fetchOrdersAndProducts();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Manual Orders</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Plus size={18} /> Add Order
                </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-subtle)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead style={{ backgroundColor: 'var(--accent-light)', borderBottom: '1px solid var(--accent-grey)' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Customer</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Product</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Price</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500' }}>Payment</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No orders found</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--accent-grey)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 500 }}>{order.customer_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.phone}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.product ? (
                                            <>
                                                <div style={{ fontWeight: 500 }}>{order.product.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.product.code || "No Code"}</div>
                                            </>
                                        ) : "Unknown/Deleted"}
                                    </td>
                                    <td style={{ padding: '1rem' }}>Rs. {order.price.toLocaleString()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            backgroundColor: order.order_status === 'Completed' ? '#dcfce7' : order.order_status === 'Cancelled' ? '#fee2e2' : '#e0e7ff',
                                            color: order.order_status === 'Completed' ? '#166534' : order.order_status === 'Cancelled' ? '#991b1b' : '#3730a3'
                                        }}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            backgroundColor: order.payment_status === 'Paid' ? '#dcfce7' : '#fef9c3',
                                            color: order.payment_status === 'Paid' ? '#166534' : '#854d0e'
                                        }}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            <button onClick={() => handleViewOrder(order)} style={{ color: '#6366f1' }} aria-label="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => handleOpenModal(order)} style={{ color: '#4b5563' }} aria-label="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleCancelClick(order.id, order.order_status)} style={{ color: order.order_status === 'Cancelled' ? '#ccc' : 'var(--error)' }} disabled={order.order_status === 'Cancelled'} aria-label="Cancel Order">
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
            {isViewOpen && viewOrder && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                        <button onClick={() => setIsViewOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#666' }}><X size={24} /></button>

                        <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summery</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Customer Details</h4>
                                <p style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.25rem' }}>{viewOrder.customer_name}</p>
                                <p style={{ color: '#444', marginBottom: '0.25rem' }}>{viewOrder.phone}</p>
                                <p style={{ color: '#666', fontSize: '0.875rem' }}>{viewOrder.address}</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Order Status</h4>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{
                                        padding: '0.35rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        backgroundColor: viewOrder.order_status === 'Completed' ? '#dcfce7' : viewOrder.order_status === 'Cancelled' ? '#fee2e2' : '#e0e7ff',
                                        color: viewOrder.order_status === 'Completed' ? '#166534' : viewOrder.order_status === 'Cancelled' ? '#991b1b' : '#3730a3'
                                    }}>
                                        {viewOrder.order_status}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>Payment Status</h4>
                                <div>
                                    <span style={{
                                        padding: '0.35rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        backgroundColor: viewOrder.payment_status === 'Paid' ? '#dcfce7' : '#fef9c3',
                                        color: viewOrder.payment_status === 'Paid' ? '#166534' : '#854d0e'
                                    }}>
                                        {viewOrder.payment_status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'var(--accent-light)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>Order Items</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: '600' }}>{viewOrder.product?.name || "Deleted Product"}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#666' }}>Code: {viewOrder.product?.code || "---"}</p>
                                </div>
                                <p style={{ fontWeight: '600' }}>Rs. {viewOrder.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--accent-grey)', paddingTop: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: '#888' }}>Date: {new Date(viewOrder.created_at).toLocaleString()}</p>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.25rem' }}>Total Amount</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>Rs. {viewOrder.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{currentOrderId ? 'Edit Order' : 'Create Manual Order'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Customer Name</label>
                                    <input type="text" required className="form-input" value={formData.customer_name} onChange={e => setFormData({ ...formData, customer_name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="text" required className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input type="text" required className="form-input" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Product</label>
                                    <select className="form-input" value={formData.product_id} onChange={handleProductChange} style={{ backgroundColor: 'white' }}>
                                        <option value="">Select a product...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.code ? `[${p.code}] ` : ''}{p.name} ({p.quantity} in stock)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Price</label>
                                    <input type="number" step="0.01" required className="form-input" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Order Status</label>
                                    <select className="form-input" value={formData.order_status} onChange={e => setFormData({ ...formData, order_status: e.target.value })} style={{ backgroundColor: 'white' }}>
                                        <option value="Placed">Placed</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Courier">Courier</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Payment Status</label>
                                    <select className="form-input" value={formData.payment_status} onChange={e => setFormData({ ...formData, payment_status: e.target.value })} style={{ backgroundColor: 'white' }}>
                                        <option value="Not Paid">Not Paid</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Order'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
