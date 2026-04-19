import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { getRestaurantsWithFoods } from '../services/restaurantsService';
import { useCartStore } from '../types/useCartStore';

type Food = { name: string; price: number }
type Restaurant = { id: string; name: string; location: string; foods: Food[] }

export default function RestaurantDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const { items, addItem, updateQuantity } = useCartStore();

    useEffect(() => {
        const fetchDetail = async () => {
            const data = await getRestaurantsWithFoods();
            const found = data.find((r: Restaurant) => r.id === id);
            if (found) {
                setRestaurant(found);
            }
        };
        fetchDetail();
    }, [id]);

    if (!restaurant) {
        return (
            <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: '#6b7280', fontSize: '18px' }}>Loading or Restaurant not found...</p>
                </div>
                <Footer />
            </div>
        );
    }

    const getQuantity = (itemId: string) => {
        const item = items.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    }

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <div style={{ alignSelf: 'stretch', height: '250px', position: 'relative' }}>
                <img src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&random=${restaurant.id}`}
                    alt={restaurant.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '16px', backdropFilter: 'blur(4px)' }}>
                        ← Back
                    </button>
                    <h1 style={{ color: '#fff', fontSize: '42px', margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{restaurant.name}</h1>
                    <p style={{ color: '#e5e7eb', fontSize: '18px', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>📍 {restaurant.location}</p>
                </div>
            </div>

            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
                <h2 style={{ fontSize: '24px', borderBottom: '2px solid #e5e7eb', paddingBottom: '12px', marginBottom: '24px' }}>Menu</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                    {restaurant.foods.map((food, i) => {
                        const itemId = `${restaurant.id}-${food.name}`;
                        const qty = getQuantity(itemId);

                        return (
                            <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '18px', color: '#111827', marginBottom: '4px' }}>{food.name}</div>
                                    <div style={{ color: '#059669', fontWeight: 600, fontSize: '16px' }}>₹{food.price}</div>
                                </div>

                                <div>
                                    {qty === 0 ? (
                                        <button
                                            onClick={() => addItem({ id: itemId, name: food.name, price: food.price, restaurantId: restaurant.id, restaurantName: restaurant.name })}
                                            style={{ padding: '8px 20px', background: '#eab308', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            Add
                                        </button>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e5e7eb', padding: '4px 8px', borderRadius: '6px' }}>
                                            <button onClick={() => updateQuantity(itemId, qty - 1)} style={{ width: '28px', height: '28px', border: 'none', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                                            <span style={{ fontWeight: 'bold', width: '24px', textAlign: 'center' }}>{qty}</span>
                                            <button onClick={() => updateQuantity(itemId, qty + 1)} style={{ width: '28px', height: '28px', border: 'none', backgroundColor: '#dcfce3', color: '#22c55e', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
}
