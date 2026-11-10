"""
InnovaTech World - Practice Dataset Generator
Creates a fictional retail business ("NaijaMart") dataset used across all 12 weeks.
Run:  python generate_data.py
Outputs: customers.csv, products.csv, orders_clean.csv, orders_raw.csv (deliberately messy)
"""
import csv, random
from datetime import date, timedelta
random.seed(42)

cities = ["Yenagoa", "Port Harcourt", "Lagos", "Abuja", "Warri", "Benin City"]
city_w = [25, 25, 20, 15, 10, 5]
first = ["Emeka","Ada","Tonye","Ibifubara","Chinedu","Ngozi","Ebi","Preye","Tamara","Seyi","Kemi","Bola",
         "Ifeanyi","Amaka","Dennis","Gloria","Joshua","Blessing","Tari","Ovie","Fatima","Musa","Yetunde","Samuel"]
last = ["Okonkwo","Ebiware","Igberi","Adeyemi","Bello","Okoro","Dikio","Ogbe","Etete","Nwosu","Alamieyeseigha",
        "Balogun","Eze","Opuene","Sylva","Ibrahim","Akpan","Tobi","Osagie","Preh"]
segments = ["Individual","Small Business","Institution"]

products = [
 (1,"Laptop Bag","Accessories",18000),(2,"Wireless Mouse","Accessories",6500),(3,"USB Flash Drive 64GB","Accessories",5500),
 (4,"Power Bank 20000mAh","Electronics",22000),(5,"Bluetooth Speaker","Electronics",28000),(6,"LED Desk Lamp","Home Office",12000),
 (7,"Office Chair","Home Office",65000),(8,"Standing Desk","Home Office",120000),(9,"A4 Paper (Ream)","Stationery",6000),
 (10,"Notebook Pack (5)","Stationery",4500),(11,"Wireless Keyboard","Accessories",14000),(12,"Webcam HD","Electronics",24000),
 (13,"Router (4G MiFi)","Electronics",38000),(14,"Surge Protector","Home Office",9000),(15,"Printer Ink Set","Stationery",31000),
]

# customers
customers = []
for cid in range(1, 201):
    name = f"{random.choice(first)} {random.choice(last)}"
    city = random.choices(cities, city_w)[0]
    seg = random.choices(segments, [70, 22, 8])[0]
    signup = date(2024,1,1) + timedelta(days=random.randint(0, 700))
    customers.append((cid, name, city, seg, signup.isoformat()))

# orders (seasonality: Nov/Dec busier)
month_w = [6,6,7,7,7,8,8,8,9,10,13,15]
days = [date(2025,1,1) + timedelta(days=i) for i in range(365)]
day_w = [month_w[d.month-1] for d in days]
orders = []
for oid in range(1001, 3001):
    d = random.choices(days, day_w)[0]
    cust = random.choice(customers)
    prod = random.choices(products, [10,12,12,9,7,8,4,2,14,14,9,5,5,7,5])[0]
    qty = random.choices([1,2,3,4,5],[50,25,13,7,5])[0]
    disc = random.choices([0,5,10,15],[70,15,10,5])[0]
    pay = random.choices(["Transfer","Card","Cash","POS"],[40,20,15,25])[0]
    status = random.choices(["Completed","Cancelled","Returned"],[86,8,6])[0]
    orders.append([oid, d.isoformat(), cust[0], prod[0], qty, prod[3], disc, cust[2], pay, status])

hdr = ["order_id","order_date","customer_id","product_id","quantity","unit_price","discount_pct","city","payment_method","status"]
with open("customers.csv","w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(["customer_id","customer_name","city","segment","signup_date"]); w.writerows(customers)
with open("products.csv","w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(["product_id","product_name","category","list_price"]); w.writerows(products)
with open("orders_clean.csv","w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(hdr); w.writerows(orders)

# ---- messy version for Week 2 / Week 9 cleaning practice ----
raw = [r[:] for r in orders]
for r in raw:
    d = date.fromisoformat(r[1])
    r[1] = random.choice([d.isoformat(), d.strftime("%d/%m/%Y"), d.strftime("%d-%b-%Y")])
    r[7] = random.choice([r[7], r[7].lower()+" ", r[7].upper(), r[7].replace(" ","-"), " "+r[7]]) if random.random()<0.35 else r[7]
    if random.random()<0.03: r[8] = ""
    if random.random()<0.02: r[4] = f"{r[4]} units"
    if random.random()<0.02: r[4] = -abs(int(str(r[4])[0]))
    if random.random()<0.15: r[5] = "₦{:,}".format(r[5])
dupes = random.sample(raw, 25)
raw.extend([d[:] for d in dupes])
random.shuffle(raw)
with open("orders_raw.csv","w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(hdr); w.writerows(raw)
print("Done:", len(customers),"customers,",len(products),"products,",len(orders),"clean orders,",len(raw),"raw orders")
