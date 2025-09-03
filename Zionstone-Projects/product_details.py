import json
import os

# Define directories and files
IMAGE_DIR = "images"
PRODUCT_PAGE_DIR = "product_pages"
INDEX_FILE = "index.html"
PRODUCTS_FILE = "products.html"
PRODUCT_JSON_FILE = "products.json"

# Ensure directories exist
os.makedirs(IMAGE_DIR, exist_ok=True)
os.makedirs(PRODUCT_PAGE_DIR, exist_ok=True)

# Template for individual product pages
PRODUCT_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{name}</title>
</head>
<body>
    <h1>{name}</h1>
    <p>Category: {category}</p>
    <p>Price: {price}</p>
    <img src="../{image_path}" alt="{name}">
    <p>{description}</p>
</body>
</html>
"""

def load_products():
    """Load existing products from JSON file."""
    if os.path.exists(PRODUCT_JSON_FILE):
        with open(PRODUCT_JSON_FILE, "r") as f:
            return json.load(f)
    return {}

def save_products(products):
    """Save products dictionary to JSON file."""
    with open(PRODUCT_JSON_FILE, "w") as f:
        json.dump(products, f, indent=4)

def create_product_page(product_data):
    """Create an HTML page for a new product."""
    product_html_content = PRODUCT_TEMPLATE.format(
        name=product_data["name"],
        category=product_data["category"],
        price=product_data["price"],
        image_path=f"{IMAGE_DIR}/{product_data['image_name']}",
        description=product_data["description"]
    )
    product_page_path = f"{PRODUCT_PAGE_DIR}/{product_data['id']}.html"
    with open(product_page_path, "w") as f:
        f.write(product_html_content)
    print(f"Created product page for '{product_data['name']}' at '{product_page_path}'")

def update_main_pages(product_data):
    """Add a link to the new product in index.html and products.html."""
    new_product_link = f'<a href="{PRODUCT_PAGE_DIR}/{product_data["id"]}.html">{product_data["name"]}</a><br>\n'
    
    for page_file in [INDEX_FILE, PRODUCTS_FILE]:
        with open(page_file, "a") as f:
            f.write(new_product_link)
        print(f"Updated '{page_file}' with link to '{product_data['name']}'")

def add_new_product(product_data):
    """Add a new product to JSON, create its page, and update main pages."""
    # Load existing products
    products = load_products()
    
    # Update product data in JSON
    products[product_data["id"]] = {
        "name": product_data["name"],
        "category": product_data["category"],
        "price": product_data["price"],
        "image": f"{IMAGE_DIR}/{product_data['image_name']}",
        "description": product_data["description"]
    }
    save_products(products)

    # Create a new HTML page for the product
    create_product_page(product_data)

    # Update index.html and products.html
    update_main_pages(product_data)

    print(f"Product '{product_data['name']}' added successfully!")

# Example usage
new_product = {
    "id": "new-product-1",
    "name": "New Product",
    "category": "Category",
    "price": "$199.99",
    "image_name": "new-product.jpg",
    "description": "This is a new product description."
}

add_new_product(new_product)
