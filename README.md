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