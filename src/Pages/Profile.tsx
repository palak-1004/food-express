import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../types/useUserStore';

export default function Profile() {
    const [username, setUsername] = useState<string | null>(null);
    const { addresses, orders, addAddress } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem("loggedInUser");
        if (user) {
            setUsername(user);
        } else {
            navigate("/"); // redirect to login if not logged in
        }
    }, [navigate]);

    if (!username) return null; // Avoid rendering if redirecting

    const initials = username.substring(0, 2).toUpperCase();

    const handleLogout = () => {
        sessionStorage.removeItem("loggedInUser");
        navigate("/");
    }

    const handleEditPassword = () => {
        const currentPass = localStorage.getItem('password');
        const newPass = prompt("Enter your new password:");
        if (newPass && newPass !== currentPass) {
            localStorage.setItem('password', newPass);
            alert("Password updated successfully!");
        }
    }

    const handleAddAddress = () => {
        const title = prompt("Address Title (e.g., Office, Friend's house):");
        if (!title) return;
        const text = prompt("Full Address Details:");
        if (!text) return;

        addAddress({
            id: Date.now().toString(),
            tag: title.toUpperCase().split(' ')[0], 
            title: title,
            text: text
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Navbar />
            
            <div style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>My Profile</h1>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                    {/* Sidebar / Photo */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: 'fit-content' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#eab308', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 16px', fontWeight: 'bold' }}>
                            {initials}
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>@{username}</h2>
                        
                        <button 
                            onClick={handleEditPassword}
                            style={{ marginTop: '24px', width: '100%', padding: '10px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                            Update Password
                        </button>

                        <button 
                            onClick={handleLogout}
                            style={{ marginTop: '12px', width: '100%', padding: '10px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#ef4444' }}>
                            Log out
                        </button>
                    </div>
                    
                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Saved Addresses */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Saved Addresses</h3>
                            
                            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                                {addresses.map(addr => (
                                    <div key={addr.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', position: 'relative' }}>
                                        <span style={{ backgroundColor: '#eab308', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', position: 'absolute', top: '16px', right: '16px' }}>{addr.tag}</span>
                                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{addr.title}</div>
                                        <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                                            {addr.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={handleAddAddress}
                                style={{ marginTop: '16px', color: '#2563eb', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                                + Add New Address
                            </button>
                        </div>
                        
                        {/* Recent Orders */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>Recent Orders</h3>
                            
                            {orders.length === 0 ? (
                                <p style={{ color: '#6b7280', margin: 0 }}>No past orders found.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {orders.map(order => (
                                        <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <div style={{ fontWeight: 'bold' }}>{order.restaurantName}</div>
                                                <div style={{ backgroundColor: '#bef264', color: '#3f6212', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Delivered</div>
                                            </div>
                                            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{order.date} • ₹{order.total}</div>
                                            <div style={{ fontSize: '14px', color: '#374151' }}>{order.items}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
