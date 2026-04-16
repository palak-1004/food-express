import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useCartStore } from '../types/useCartStore';
import { useUserStore } from '../types/useUserStore';

import type { PastOrder } from '../types/useUserStore';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
    const { addOrder } = useUserStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (items.length === 0) return;

        // Group items to list them out in the order
        const itemSummary = items.map(i => `${i.name} x ${i.quantity}`).join(', ');
        const restaurantName = items[0]?.restaurantName || 'Mixed Restaurants';

        const newOrder: PastOrder = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
            total: getTotalPrice(),
            items: itemSummary,
            restaurantName
        };

        addOrder(newOrder);

        alert("Order placed successfully!");
        clearCart();
        navigate('/profile');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />

            <div style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Your Cart</h1>

                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                        <h2 style={{ fontSize: '20px', color: '#4b5563', marginBottom: '16px' }}>Your cart is empty!</h2>
                        <button
                            onClick={() => navigate('/home')}
                            style={{ padding: '12px 24px', backgroundColor: '#eab308', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                        >
                            Browse Restaurants
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#111827' }}>{item.name}</div>
                                        <div style={{ color: '#6b7280', fontSize: '14px' }}>{item.restaurantName}</div>
                                        <div style={{ color: '#4b5563', marginTop: '4px' }}>₹{item.price} x {item.quantity} = <span style={{ fontWeight: 'bold', color: '#111827' }}>₹{item.price * item.quantity}</span></div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                                            <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🗑️</button>
                                    </div>
                                </div>
                            ))}

                            <div style={{ marginTop: '24px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                                <span style={{ fontWeight: 'bold', color: '#374151' }}>Total:</span>
                                <span style={{ fontWeight: 'bold', color: '#111827', fontSize: '24px' }}>₹{getTotalPrice()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: '#22c55e',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.4)'
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
