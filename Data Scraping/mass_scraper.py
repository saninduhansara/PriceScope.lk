import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import urllib.parse
import re 

# --- CONFIGURATION ---
CARD_CLASS = "cargillProd"
PRICE_SELECTOR = ".strike1 h4"
NAME_TAG = "p"
WEIGHT_BOX_CLASS = "dropbtn1"
# ---------------------

def get_weight(card, product_name):
    # STRATEGY A: Look for the specific "Weight Box"
    try:
        weight_box = card.find_element(By.CLASS_NAME, WEIGHT_BOX_CLASS)
        weight_text = weight_box.text.strip()
        if weight_text:
            return weight_text
    except:
        pass 

    # STRATEGY B: Regex extraction from Name
    match = re.search(r'(\d+\.?\d*)\s?(kg|g|ml|l|ltr)', product_name, re.IGNORECASE)
    if match:
        return match.group(0)
        
    return "1 Unit"

# --- THE SECURITY GUARD (FIXED) ---
def is_valid_product(product_name, search_term):
    name_lower = product_name.lower()
    term_lower = search_term.lower()

    # 1. BUTTER vs. PEANUT/COSMETICS/BEANS
    if "butter" in term_lower:
        banned = [
            "peanut", "cashew", "almond",
            "cream", "creamy",
            "biscuit", "cookie", "cracker",
            "body", "lotion", "lip", "soap", "shampoo",
            "shea", "cocoa", "skin", "hair",
            "spread", "sandwich", "flavoured", "flavor",
            "bean", "gourd"  # <--- ADDED: Blocks "Butter Beans" & "Bitter Gourd"
        ]
        if any(x in name_lower for x in banned):
            return False

        # HARD REQUIRE – must contain "butter" or "margarine"
        # (This filters out random stuff like "Butterscotch Ice Cream" if not caught above)
        required = ["butter", "margarine"]
        if not any(x in name_lower for x in required):
            return False

    # 2. CURD vs. CURLS/CURRY
    if "curd" in term_lower:
        if "curry" in name_lower or "curl" in name_lower or "diaper" in name_lower or "soap" in name_lower:
            return False

    # 3. SOFT DRINKS vs. SOAP
    if "soft drink" in term_lower:
        if "wash" in name_lower or "soap" in name_lower or "shampoo" in name_lower or "tissue" in name_lower or "roll" in name_lower:
            return False

    # 4. FRUITS/VEG vs. PROCESSED/COSMETICS
    fruit_veg_terms = ["lime", "orange", "apple", "papaya", "lemon", "mango", "pineapple", "carrot", "pumpkin", "bean"]
    
    if any(f in term_lower for f in fruit_veg_terms):
        banned_fruit = [
            "wash", "soap", "shampoo", "gel", "face", "lotion", 
            "jam", "cordial", "nectar", "drink", "juice", "squash", 
            "jelly", "essence", "flavour", "biscuit", "cake",
            "earring", "necklace", "coffee" 
        ]
        if any(x in name_lower for x in banned_fruit):
            return False

    # 5. BREAD vs. HAIR COLOR
    if "bread" in term_lower:
        if "hair" in name_lower or "color" in name_lower:
            return False

    # 6. CHEESE vs. SAUCE
    if "cheese" in term_lower:
        if "sauce" in name_lower or "biscuit" in name_lower or "kottu" in name_lower:
             return False
             
    # 7. GENERAL BLACKLIST
    if "hair colour" in name_lower or "toothpaste" in name_lower or "panty liner" in name_lower:
        return False

    return True

# --- THE MAIN ROBOT ---
def mass_scrape(search_terms):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    all_products = []

    for term in search_terms:
        print(f"🤖 Searching for: {term}...")
        safe_term = urllib.parse.quote(term)
        url = f"https://cargillsonline.com/product/{safe_term}?PS={safe_term}"
        
        driver.get(url)
        time.sleep(3)
        
        cards = driver.find_elements(By.CLASS_NAME, CARD_CLASS)
        
        for card in cards:
            try:
                # 1. Get Name
                name = card.find_element(By.CSS_SELECTOR, "p[title]").get_attribute("title")
                
                # --- CHECK IF VALID ---
                if not is_valid_product(name, term):
                    print(f"      🚫 Skipping: {name}")
                    continue
                # ----------------------
                
                # 2. Get Price (Cleaned)
                raw_price = card.find_element(By.CSS_SELECTOR, PRICE_SELECTOR).text
                price_clean = raw_price.split("MRP")[0].strip()
                
                weight = get_weight(card, name)

                print(f"   Found: {name} | {weight} | {price_clean}")
                
                all_products.append({
                    "Category": term,
                    "Name": name,
                    "Weight": weight,
                    "Price": price_clean,
                    "Store": "Cargills"
                })
            except Exception as e:
                continue

    driver.quit()
    return all_products

# --- SHOPPING LIST ---
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

# --- EXECUTION ---
shopping_list = []
for category, items in shopping_dict.items():
    shopping_list.extend(items)

print(f"✅ Loaded {len(shopping_list)} items to scrape.")

data = mass_scrape(shopping_list)
df = pd.DataFrame(data)
df.to_csv("cargills_final.csv", index=False)
print("✅ Done! Saved to cargills_final.csv")