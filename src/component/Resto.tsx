import { useCartStore } from "../types/useCartStore"
import { useNavigate } from "react-router-dom";

type Food = {
    name: string
    price: number
}

type Restaurant = {
    id: string
    name: string
    location: string
    foods: Food[]
}

type Props = {
    restaurants: Restaurant[]
}

export default function Resto({ restaurants }: Props) {
    const { items, addItem, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    const getQuantity = (id: string) => {
        const item = items.find(i => i.id === id);
        return item ? item.quantity : 0;
    }

    return (
        <div className="restaurants">
            <h2>Featured Restaurants</h2>

            <div className="restaurant-list">
                {restaurants.map((res) => (
                    <div className="restaurant" key={res.id}>
                        <img 
                            src={`https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80&random=${res.id}`} 
                            alt={res.name} 
                            style={{ height: '200px', objectFit: 'cover' }}
                            onClick={() => navigate(`/restaurant/${res.id}`)}
                        />

                        <div className="restaurant-info">
                            <h3 
                                onClick={() => navigate(`/restaurant/${res.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                {res.name}
                            </h3>
                            <p>{res.location}</p>

                            {/* food*/}
                            <div className="food-list">
                                {res.foods?.slice(0, 2).map((food, i) => {
                                    const itemId = `${res.id}-${food.name}`
                                    const qty = getQuantity(itemId)

                                    return (
                                        <div key={i} className="food-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{food.name}</div>
                                                <div style={{ color: '#555' }}>₹{food.price}</div>
                                            </div>

                                            <div>
                                                {qty === 0 ? (
                                                    <button
                                                        className="add-to-cart-btn"
                                                        onClick={() => addItem({
                                                            id: itemId,
                                                            name: food.name,
                                                            price: food.price,
                                                            restaurantId: res.id,
                                                            restaurantName: res.name
                                                        })}
                                                        style={{ padding: '4px 12px', background: '#eab308', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        Add
                                                    </button>
                                                ) : (
                                                    <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <button onClick={() => updateQuantity(itemId, qty - 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>-</button>
                                                        <span>{qty}</span>
                                                        <button onClick={() => updateQuantity(itemId, qty + 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>+</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}