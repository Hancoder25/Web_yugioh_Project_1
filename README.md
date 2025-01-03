# Web_yugioh_Project_1


Welcome to the **Yu-Gi-Oh! E-commerce Platform** repository! This project is a fully functional online store designed for trading and collecting Yu-Gi-Oh! cards, with additional features for community engagement and customer support.

## Features

### 1. **Homepage**
- A dynamic homepage featuring:
  - **Image sliders** for showcasing highlighted products.
  - A **menu bar** for navigating product categories and collections.

### 2. **Product Browsing**
- Browse cards by:
  - Rarity (e.g., Rare, Ultra Rare, Platinum Secret Rare).
  - Search functionality for specific cards.

### 3. **Cart Management**
- Add and remove items from the shopping cart.
- Automatic calculation of total price (including discounts and taxes).
- Checkout with address confirmation.

### 4. **Community Section**
- Post and view community content.
- Users can:
  - Add new posts.
  - Comment on existing posts.
- Data is saved using `localStorage`.

### 5. **Order History**
- View the history of orders with details like:
  - Products purchased.
  - Address used for delivery.
  - Total cost.

### 6. **Contact & Support**
- A section for user inquiries and support with form validation.

### 7. **Responsive Design**
- Fully responsive layout for a seamless experience across devices.

## Technologies Used

### Frontend
- **HTML5**: Structure of the web pages.
- **CSS3**: Styling, animations, and responsiveness.
- **JavaScript (Vanilla)**: Dynamic content, event handling, and interactivity.

### APIs
- Fetching product data and interacting with a local JSON database.

### Assets
- FontAwesome for icons.
- Google Fonts for custom typography.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yu-gi-oh-platform.git
   ```
2. Navigate to the project directory:
   ```bash
   cd yu-gi-oh-platform
   ```
3. Open the `index.html` file in a web browser to view the project.

## Usage

### Browsing Products
- Navigate through categories using the menu bar.
- Use the search bar to find specific cards.

### Adding to Cart
- Hover over a product and click the shopping cart icon.
- Access your cart by clicking the "Giỏ hàng" button in the navigation menu.

### Community and Contact
- Share posts or ask questions via the **Community** or **Contact** sections.
- View past inquiries and responses.

### Order Management
- Confirm your cart and input your delivery address to generate an invoice.
- View your order history for details of previous purchases.

## Project Structure

```
├── index.html        # Main HTML file
├── style.css         # Styling for the platform
├── script.js         # JavaScript for interactivity
├── /images           # Product images and UI icons
├── /data             # Mock database in JSON format
└── README.md         # Project documentation
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Suggestions for Improvement

**a.** Add unit tests for JavaScript functions to ensure reliability.  
**b.** Enhance accessibility features, such as ARIA roles and keyboard navigation.
