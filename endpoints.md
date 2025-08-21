- [User]
- [Vendor]
- [Product] - Smartphone
- [Review]
- [Ram]
- [Color]
- [Type] ?? Fairly | London Used | Brand New
- [Model] ?? Iphone | Samsung
- [Rom]
- [Gadget] ?? Smartphone | Laptop | Airpod

I could send specification as json

<<ENDPOINTS>>

<AUTH>
- /auths
SIGN UP -POST /signup
SIGN IN -POST /signin
GOOGLE AUTHENTICATION -POST /google
REFRESH_TOKEN -POST /refresh
RESET PASSWORD -POST /reset
CHANGE PASSWORD -POST /change/password

<USER>
CREATE USER -POST /users ✅
<!-- UPDATE USER ROLE -POST /users/:id - admin | vendor | user  -->

<ADMIN>
VIEW ANALYTICS -GET /analytics

<PRODUCT>
ADD PRODUCT -POST /products
DELETE PRODUCT(SOFT) -DELETE /products/:id
UPDATE PRODUCT -PATCH /products/:id
RESTOCK PRODUCT -PATCH /products/:id
VIEW PRODUCTS - GET /products

<RAM>
ADD RAM SIZE -POST /ram
DELETE RAM SIZE -POST /ram/:id

<ROM>
ADD RAM SIZE -POST /rom
DELETE RAM SIZE -POST /rom/:id

<VENDOR>
CREATE VENDOR -POST /vendors ✅
DEACTIVATE VENDOR -PATCH /vendors/:id/deactivate ✅
VERIFY VENDOR -PATCH /vendors/:id/activate ✅
VIEW VENDORS -GET /vendors

<BRAND>
ADD BRAND -POST /brand
DELETE BRAND -DELETE /brand/:id
PATCH BRAND -PATCH /brand/:id

<REVIEW>
ADD REVIEW -POST /product/review
DELETE REVIEW - DELETE /product/review/:id

<PAYMENT_METHOD>
ADD PAYMENT METHOD -POST /payment/method
REMOVE PAYMENT METHOD -DELETE /payment/method/:id

<PAYMENT>
ADD PAYMENT RECORD -POST /payment

<ORDER>
PLACE ORDER -POST /orders
UPDATE ORDER STATUS -PATCH /orders/:id
