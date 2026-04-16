import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocationStore } from "../types/useLocationStore";
import { useState } from "react";
import { searchApi } from "../api/searchApi"; // ✅ API import
import { useCartStore } from "../types/useCartStore";

export default function Navbar() {
    const address = useLocationStore((state) => state.address);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const navigate = useNavigate();

    // ✅ STATE
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const cartCount = getTotalItems();

    // ✅ FUNCTION WHERE API IS USED
    const handleSearchChange = async (value: string) => {
        setQuery(value);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        const res = await searchApi(value); // 🔥 API CALL
        setResults(res);
        console.log("Searching:", value);
    };

    return (
        <header className='navv'>
            <div className="logo" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
                🍴 FoodExpress
            </div>

            <div className="nav-center">
                {/* LOCATION */}
                <div
                    className="locationBar"
                    onClick={() => navigate("/select-location")}
                >
                    📍 {address ? address.split(",")[0] : "Select Location"}
                    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                        {address ? "Change" : ""}
                    </span>
                </div>

                {/* SEARCH */}
                <div className="search-wrapper">

                    <div className="nav-search">
                        <input
                            type="text"
                            placeholder="Search dishes or restaurants..."
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onBlur={() => {
                                setTimeout(() => setResults([]), 150);
                            }}
                        />

                        <button onClick={() => handleSearchChange(query)}>🔍</button>
                    </div>

                    {/* 🔥 MOVE DROPDOWN HERE (OUTSIDE nav-search) */}
                    {results.length > 0 && (
                        <div className="search-dropdown">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="search-item"
                                    onMouseDown={() => {
                                        navigate(`/search?q=${encodeURIComponent(item.name)}&type=${item.type}`);
                                        setQuery("");
                                        setResults([]);
                                    }}
                                >
                                    {item.type === "restaurant" ? "🏪" : "🍔"} {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="nav-right">
                <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🛒 Cart
                    {cartCount > 0 && (
                        <span style={{ background: '#eab308', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold' }}>
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link to="/profile">🙍 Profile</Link>
                <Link to="/help">❓ Help</Link>
            </div>
        </header>
    );
}