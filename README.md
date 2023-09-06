# cuownbe_core


Delete Product
URL : http://sagpos.cuownbe.co.in/a1/product/{_id}
Method : DELETE

Add Product
URL : http://sagpos.cuownbe.co.in/a1/product
Method : POST
Body : {
"itemCode":"",
"itemId":"",
"desc":"",
"price":"",
"qty":""
}

Edit Product
URL : http://sagpos.cuownbe.co.in/a1/product
Method : PUT
Body : {
"_id":"",
"itemCode":"",
"itemId":"",
"desc":"",
"price":"",
"qty":""
}

Get Prodects
URL : http://sagpos.cuownbe.co.in/a1/products
Method : GET

Get Prodects By search
URL : http://sagpos.cuownbe.co.in/a1/products/{itemName}
Method : GET

Get Prodects By barcode
URL : http://sagpos.cuownbe.co.in/a1/productsbybarcode/{barcode}
Method : GET


<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->
<!-- ////////////////////////////////////////////////////////////////////////////////////////// -->

Delete purchase
URL : http://sagpos.cuownbe.co.in/a1/purchase/{_id}
Method : DELETE

Add purchase
URL : http://sagpos.cuownbe.co.in/a1/purchase
Method : POST
Body : {
    "list": [
        {
            "qty": 10,
            "itemId": "64f8c632846938ee622d8cb2",
            "price": 100
        },
        {
            "qty": 20,
            "itemId": "64f8c626846938ee622d8cb1",
            "price": 100
        }
    ],
    "note": "Sample Purchase"
}

Edit purchase
URL : http://sagpos.cuownbe.co.in/a1/purchase
Method : PUT
Body : {
    "list": [
        {
            "qty": 10,
            "itemId": "64f8c632846938ee622d8cb2",
            "price": 100
        },
        {
            "qty": 20,
            "itemId": "64f8c626846938ee622d8cb1",
            "price": 100
        }
    ],
    "note": "Sample Purchase"
}

Get Purchase
URL : http://sagpos.cuownbe.co.in/a1/purchase/{_id}
Method : GET

Get All Purchase
URL : http://sagpos.cuownbe.co.in/a1/purchases
Method : GET
