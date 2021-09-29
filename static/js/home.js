

function handleFormSubmit() {
    var orderid = "RVDDA" + Math.floor(Math.random() * (10000 - 1) + 1)
    affirm.checkout({
        "merchant": {
            "user_confirmation_url": "http://127.0.0.1:5000/success",
            "user_cancel_url": "http://127.0.0.1:5000/",
            "user_confirmation_url_action": "POST",
            "name": "Todd Test Merchant"
        },
        "shipping": {
            "name": {
                "first": document.getElementById("fname").value,
                "last": document.getElementById("lname").value
            },
            "address": {
                "line1": document.getElementById("address1").value,
                "line2": document.getElementById("address2").value,
                "city": document.getElementById("city").value,
                "state": document.getElementById("state").value,
                "zipcode": document.getElementById("zipcode").value,
                "country": "USA"
            },
            "phone_number": document.getElementById("phone").value,
            "email": document.getElementById("email").value
        },
        "billing": {
            "name": {
                "first": document.getElementById("fname").value,
                "last": document.getElementById("lname").value
            },
            "address": {
                "line1": document.getElementById("address1").value,
                "line2": document.getElementById("address2").value,
                "city": document.getElementById("city").value,
                "state": document.getElementById("state").value,
                "zipcode": document.getElementById("zipcode").value,
                "country": "USA"
            },
            "phone_number": document.getElementById("phone").value,
            "email": document.getElementById("email").value
        },
        "items": [{
            "display_name": "Reverend Double Agent Guitar",
            "sku": "rev-da-02482",
            "unit_price": 110000,
            "qty": parseInt(document.getElementById("quantity").value),
            "item_image_url": "https://media.musiciansfriend.com/is/image/MMGS7/Double-Agent-OG-Roasted-Maple-Fingerboard-Electric-Guitar-Metallic-Alpine/L78139000002000-00-500x500.jpg",
            "item_url": "https://www.musiciansfriend.com/guitars/reverend-double-agent-og-roasted-maple-fingerboard-electric-guitar",
            "categories": [
                ["Electronics", "Music", "Guitar"]
            ]
        }
        ],
        "metadata": {
            "mode": "modal"
        },
        "order_id": orderid,
        "currency": "USD",
        "shipping_amount": 15000,
        "tax_amount": 5000,
        "total": parseInt(document.getElementById("subtotal").value)*100
})

affirm.checkout.open({
    onSuccess: function (response){
        const url = 'http://127.0.0.1:5000/confirm';
        const checkout_token = response.checkout_token;
        axios({
            method: 'post',
            url: url,
            data: {
                checkout_token: checkout_token,
                order_id: orderid
            }
        }).then(
            window.open("http://127.0.0.1:5000/success")
        ).catch(err=>console.log(err))
    }
})
}


