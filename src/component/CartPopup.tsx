import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../types/useCartStore';

export default function CartPopup() {
    const { items, showPopup, closePopup, getTotalItems, getTotalPrice } = useCartStore();
    const navigate = useNavigate();

    if (!showPopup || items.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#111827',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 24px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            zIndex: 1000,
            animation: 'slideUp 0.3s ease-out forwards'
        }}>
            <div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>{getTotalItems()} items added</div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{getTotalPrice()}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                    onClick={() => {
                        navigate('/cart');
                        closePopup();
                    }}
                    style={{
                        backgroundColor: '#eab308',
                        color: '#111827',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Go to Cart
                </button>
                <button 
                    onClick={closePopup}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: 0
                    }}
                >
                    ×
                </button>
            </div>
            <style>
                {`
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
}
