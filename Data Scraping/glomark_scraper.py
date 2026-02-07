import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import urllib.parse
import re 
import random

# --- ✅ GLOMARK CONFIGURATION ---
CARD_CLASS = "product-box"
NAME_SELECTOR = ".product-title"
PRICE_SELECTOR = ".price strong" # We target the bold text inside the price div
# --------------------------------

def extract_weight_glomark(product_name):
    """
    Glomark names usually have the weight: "Basmati Rice 2Kg"
    """
    match = re.search(r'(\d+\.?\d*)\s?(kg|g|ml|l|ltr|pcs)', product_name, re.IGNORECASE)
    if match:
        return match.group(0)
    return "1 Unit"

def is_valid_product(product_name, search_term):
    """
    Standard filter to remove "Peanut Butter" from "Butter" searches.
    """
    name_lower = product_name.lower()
    term_lower = search_term.lower()

    if "butter" in term_lower:
        banned = ["peanut", "cashew", "biscuit", "cookie", "body", "lotion", "lip", "soap", "cream"]
        if any(x in name_lower for x in banned): return False

    if "curd" in term_lower:
        if "curry" in name_lower or "curl" in name_lower or "diaper" in name_lower or "soap" in name_lower: return False

    if "soft drink" in term_lower:
        if "wash" in name_lower or "soap" in name_lower or "shampoo" in name_lower or "tissue" in name_lower: return False

    fruit_terms = ["lime", "orange", "apple", "papaya", "lemon"]
    if any(f in term_lower for f in fruit_terms):
        if "wash" in name_lower or "soap" in name_lower or "shampoo" in name_lower or "gel" in name_lower: return False

    return True

def mass_scrape_glomark(search_terms):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    all_products = []

    for term in search_terms:
        print(f"🤖 Searching Glomark for: {term}...")
        
        safe_term = urllib.parse.quote(term)
        # Glomark Search URL
        url = f"https://glomark.lk/search?search-text={safe_term}"
        
        driver.get(url)
        
        # Random wait to act human
        wait_time = random.uniform(5, 10)
        time.sleep(wait_time)
        
        try:
            cards = driver.find_elements(By.CLASS_NAME, CARD_CLASS)
        except:
            print("   ⚠️ No cards found (Check internet?)")
            continue
            
        print(f"   -> Found {len(cards)} results")

        for card in cards:
            try:
                # 1. Get Name
                name = card.find_element(By.CSS_SELECTOR, NAME_SELECTOR).text.strip()
                
                # 2. Filter Bad Items
                if not is_valid_product(name, term):
                    continue

                # 3. Get Price
                # Glomark price is often "Rs 1,185.00".
                raw_price = card.find_element(By.CSS_SELECTOR, PRICE_SELECTOR).text
                price_clean = raw_price.replace("Rs", "").replace("LKR", "").replace(",", "").strip()

                # 4. Get Weight (from Name)
                weight = extract_weight_glomark(name)

                print(f"   Found: {name} | {weight} | {price_clean}")
                
                all_products.append({
                    "Category": term,
                    "Name": name,
                    "Weight": weight,
                    "Price": price_clean,
                    "Store": "Glomark"
                })
            except Exception as e:
                # print(f"Error: {e}") 
                continue

    driver.quit()
    return all_products

# --- YOUR SHOPPING LIST ---
shopping_dict = {
    "Grains & Pasta": [
        "Basmati Rice", "Keeri Samba", "Nadu Rice", "Red Raw Rice", 
        "Pasta", "Spaghetti", "Macaroni", "Noodles",
        "Red Dhal", "Mysore Dhal", "Chickpeas"
    ],
    
    "Dairy & Fridge": [
        "Cheddar Cheese", "Happy Cow Cheese", "Butter", "Margarine",
        "Eggs", "Fresh Milk", "Full Cream Milk Powder", 
        "Yoghurt", "Curd", "Ice Cream"
    ],
    
    "Meat & Seafood": [
        "Chicken Breast", "Whole Chicken", "Chicken Drumsticks", 
        "Sausages", "Meatballs",
        "Tuna Fish", "Canned Fish", "Sprats"
    ],
    
    "Bakery": [
        "Brown Bread", "White Bread", "Sandwich Bread", 
        "Cream Crackers", "Marie Biscuits", "Nice Biscuits"
    ],
    
    "Vegetables": [
        "Carrots", "Potatoes", "Red Onions", "Big Onions", "Tomatoes",
        "Leeks", "Beans", "Pumpkin", "Cabbage", "Green Chillies",
        "Ginger", "Garlic", "Lime"
    ],
    
    "Cooking Essentials": [
        "Coconut Oil", "Vegetable Oil", "Coconut Milk", "Coconut Powder",
        "White Sugar", "Brown Sugar", "Table Salt", 
        "Chilli Powder", "Curry Powder", "Turmeric"
    ],
    
    "Beverages": [
        "Ceylon Tea", "Tea Bags", "Coffee", 
        "Orange Juice", "Mixed Fruit Juice", 
        "Soft Drinks", "Coca Cola", "EGB"
    ],
    
    "Fruits": [
        "Apples", "Banana", "Papaya", "Pineapple", "Mango", "Watermelon"
    ]
}

shopping_list = []
for category, items in shopping_dict.items():
    shopping_list.extend(items)

# --- RUN THE SCRAPER ---
data = mass_scrape_glomark(shopping_list)
df = pd.DataFrame(data)
df.to_csv("glomark_final.csv", index=False)
print("✅ Done! Saved to glomark_final.csv")