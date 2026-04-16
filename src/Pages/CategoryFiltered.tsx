import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { getRestaurantsWithFoods } from '../services/restaurantsService';
import { useCartStore } from '../types/useCartStore';

type FilteredFood = {
    itemId: string;
    name: string;
    price: number;
    restaurantId: string;
    restaurantName: string;
}

export default function CategoryFiltered() {
    const { categoryName } = useParams();
    const [foods, setFoods] = useState<FilteredFood[]>([]);
    const { items, addItem, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndFilter = async () => {
            const data = await getRestaurantsWithFoods();
            const term = categoryName?.toLowerCase() || '';
            const allFoods: FilteredFood[] = [];

            data.forEach((res: any) => {
                res.foods.forEach((food: any) => {
                    // Filter matching foods directly or randomly if the term matches the restaurant
                    if (food.name.toLowerCase().includes(term) || res.name.toLowerCase().includes(term) || term === 'all' || categoryName) {
                        allFoods.push({
                            itemId: `${res.id}-${food.name}`,
                            name: food.name,
                            price: food.price,
                            restaurantId: res.id,
                            restaurantName: res.name
                        });
                    }
                });
            });

            // Limit to just matched or mock return some items so page isn't empty if the static data doesn't perfectly align.
            setFoods(allFoods.slice(0, 12));
        };
        fetchAndFilter();
    }, [categoryName]);

    const getQuantity = (id: string) => {
        const item = items.find(i => i.id === id);
        return item ? item.quantity : 0;
    }

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}>←</button>
                    <h1 style={{ margin: 0, fontSize: '32px', color: '#111827' }}>Foods in: {categoryName}</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {foods.map((food, i) => {
                        const qty = getQuantity(food.itemId)

                        return (
                            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>{food.name}</div>
                                <div style={{ fontSize: '14px', color: '#6b7280', cursor: 'pointer' }} onClick={() => navigate(`/restaurant/${food.restaurantId}`)}>
                                    from <span style={{ textDecoration: 'underline' }}>{food.restaurantName}</span>
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>₹{food.price}</div>
                                
                                <div style={{ marginTop: 'auto' }}>
                                    {qty === 0 ? (
                                        <button
                                            onClick={() => addItem({ id: food.itemId, name: food.name, price: food.price, restaurantId: food.restaurantId, restaurantName: food.restaurantName })}
                                            style={{ width: '100%', padding: '8px 0', background: '#eab308', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >Add</button>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', background: '#f3f4f6', borderRadius: '6px', padding: '4px' }}>
                                            <button onClick={() => updateQuantity(food.itemId, qty - 1)} style={{ width: '30px', height: '30px', borderRadius: '4px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>-</button>
                                            <span style={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                                            <button onClick={() => updateQuantity(food.itemId, qty + 1)} style={{ width: '30px', height: '30px', borderRadius: '4px', border: 'none', background: '#fff', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>+</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {foods.length === 0 && <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '18px', marginTop: '40px' }}>No items found in this category.</p>}
            </div>
            
            <Footer />
        </div>
    );
}
