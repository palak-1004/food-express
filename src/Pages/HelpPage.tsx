import "../styles/home.css";

export default function HelpPage() {
    return (
        <div className="help-container">
            <h1 className="help-title">Help & Support</h1>

            {/* FAQ Section */}
            <section className="help-section">
                <h2>Frequently Asked Questions</h2>

                <div className="faq">
                    <h3>How do I place an order?</h3>
                    <p>
                        Browse restaurants, select your favorite food items, add them to cart,
                        and click on "Checkout" to place your order.
                    </p>
                </div>

                <div className="faq">
                    <h3>Can I cancel my order?</h3>
                    <p>
                        Yes, you can cancel your order before it is prepared. Go to "My Orders"
                        and click on cancel.
                    </p>
                </div>

                <div className="faq">
                    <h3>How do I track my order?</h3>
                    <p>
                        After placing an order, you can track it in real-time from the "My Orders" section.
                    </p>
                </div>

                <div className="faq">
                    <h3>What payment methods are supported?</h3>
                    <p>
                        We support UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.
                    </p>
                </div>
            </section>

            {/* Contact Support */}
            <section className="help-section">
                <h2>Contact Support</h2>
                <p>If you need further help, reach out to us:</p>

                <ul className="contact-list">
                    <li>Email: support@foodexpress.com</li>
                    <li>Phone: +91 99887 76655</li>
                </ul>
            </section>

            {/* Report Issue */}
            <section className="help-section">
                <h2>Report an Issue</h2>

                <form className="help-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Describe your issue..." required />
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    );
}