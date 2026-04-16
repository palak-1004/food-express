


import { useNavigate } from 'react-router-dom';

export default function Categories() {
    const navigate = useNavigate();

    return (
        <div className="categories">
            <h2>Browse Categories</h2>
            <div className="category-list">
                <div className="category" onClick={() => navigate('/category/Pizza')} style={{ cursor: 'pointer' }}>
                    <img src="/imgs/pizza.png" alt="Pizza" />
                    <h4>Pizza</h4>
                </div>
                <div className="category" onClick={() => navigate('/category/Burgers')} style={{ cursor: 'pointer' }}>
                    <img src="/imgs/burger.png" alt="Burger" />
                    <h4>Burgers</h4>
                </div>
                <div className="category" onClick={() => navigate('/category/Desserts')} style={{ cursor: 'pointer' }}>
                    <img src="/imgs/dessert.png" alt="Desserts" />
                    <h4>Desserts</h4>
                </div>
                <div className="category" onClick={() => navigate('/category/Indian')} style={{ cursor: 'pointer' }}>
                    <img src="/imgs/indian.png" alt="Indian Food" />
                    <h4>Indian</h4>
                </div>
                <div className="category" onClick={() => navigate('/category/Chinese')} style={{ cursor: 'pointer' }}>
                    <img src="/imgs/chinese.png" alt="Chinese Food" />
                    <h4>Chinese</h4>
                </div>
            </div>
        </div>
    )
}
