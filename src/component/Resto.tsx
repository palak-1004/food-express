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
    return (
        <div className="restaurants">
            <h2>Featured Restaurants</h2>

            <div className="restaurant-list">
                {restaurants.map((res) => (
                    <div className="restaurant" key={res.id}>
                        <img src="imgs/1.png" alt="" />

                        <div className="restaurant-info">
                            <h3>{res.name}</h3>
                            <p>{res.location}</p>

                            {/* food*/}
                            {res.foods?.slice(0, 2).map((food, i) => (
                                <div key={i}>
                                    {food.name} - ₹{food.price}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}