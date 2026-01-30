from playwright.sync_api import sync_playwright

urls = [
    "https://keellssuper.com/productDetail?itemcode=4061&B/Cheramy_Milk_Soap_Al.Oil_Vit.E_5S_75g",
    "https://keellssuper.com/productDetail?itemcode=126694&Calin_Baby_Soap_Creamy_65g",
    "https://keellssuper.com/productDetail?itemcode=13461&Flora_Facial_Tissue_Box_2Ply_200S"
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    for url in urls:
        page.goto(url, timeout=60000)

        # Wait for the main product container to load
        page.wait_for_selector("div.revamp-productNameV2", timeout=15000)

        # Extract product info
        product_name = page.query_selector("div.revamp-productNameV2").inner_text()
        product_price = page.query_selector("span.product-card-final-price-desktopV2").inner_text()

        print(f"URL: {url}")
        print(f"Product: {product_name}")
        print(f"Price: {product_price}")
        print("-" * 40)

    input("Check browser and press Enter to close...")
    browser.close()
