const URL = 'https://in3.dev/inv/';

// let invoiceData = null;

const getData = () => {
    return fetch(URL)
    .then(response => response.json())
    .then(data => {
        // invoiceData = data;
        return data;

    })
    .catch(error => console.error('Klaida:', error));
}

getData().then(result => {

    console.log(Object.keys(result));
    console.log(result);
    console.log(result.company)
    console.log(result.company.buyer.name)

    // ['number', 'date', 'due_date', 'company', 'items', 'shippingPrice']
    // console.log('invoiceData: ', invoiceData);

    //number and dates
    const invoiceNum = document.querySelector('[data-num]');
    const numSpan = document.createElement('span');
    numSpan.textContent = result.number;
    invoiceNum.appendChild(numSpan);

    const invDate = document.querySelector('[data-date]');
    const dateSpan = document.createElement('span');
    dateSpan.textContent = result.date;
    invDate.appendChild(dateSpan);

    const dueDate = document.querySelector('[data-due-date]');
    const dueSpan = document.createElement('span');
    dueSpan.textContent = result.due_date;
    dueDate.appendChild(dueSpan);




    //seller details
    const sellerName = document.querySelector('[data-seller-name]');
    console.log(sellerName);
    const sNameSpan = document.createElement('span');
    sNameSpan.textContent = result.company.seller.name;
    sellerName.appendChild(sNameSpan);

    const sellerAddress = document.querySelector('[data-seller-address]');
    const sAddressSpan = document.createElement('span');
    sAddressSpan.textContent = result.company.seller.address;
    sellerAddress.appendChild(sAddressSpan);

    const sellerCode = document.querySelector('[data-seller-code]');
    const sCodeSpan = document.createElement('span');
    sCodeSpan.textContent = result.company.seller.code;
    sellerCode.appendChild(sCodeSpan);

    const sellerVAT = document.querySelector('[data-seller-VAT]');
    const sVATSpan = document.createElement('span');
    sVATSpan.textContent = result.company.seller.vat;
    sellerVAT.appendChild(sVATSpan);

    const sellerPhone = document.querySelector('[data-seller-phone]');
    const sPhoneSpan = document.createElement('span');
    sPhoneSpan.textContent = result.company.seller.phone;
    sellerPhone.appendChild(sPhoneSpan);

    const sellerEmail = document.querySelector('[data-seller-email]');
    const sEmailSpan = document.createElement('span');
    sEmailSpan.textContent = result.company.seller.email;
    sellerEmail.appendChild(sEmailSpan);


    //buyer details
    const buyerName = document.querySelector('[data-buyer-name]');
    const bNameSpan = document.createElement('span');
    bNameSpan.textContent = result.company.buyer.name;
    buyerName.appendChild(bNameSpan);

    const buyerAddress = document.querySelector('[data-buyer-address]');
    const bAddressSpan = document.createElement('span');
    bAddressSpan.textContent = result.company.buyer.address;
    buyerAddress.appendChild(bAddressSpan);

    const buyerCode = document.querySelector('[data-buyer-code]');
    const bCodeSpan = document.createElement('span');
    bCodeSpan.textContent = result.company.buyer.code;
    buyerCode.appendChild(bCodeSpan);

    const buyerVAT = document.querySelector('[data-buyer-VAT]');
    const bVATSpan = document.createElement('span');
    bVATSpan.textContent = result.company.buyer.vat;
    buyerVAT.appendChild(bVATSpan);

    const buyerPhone = document.querySelector('[data-buyer-phone]');
    const bPhoneSpan = document.createElement('span');
    bPhoneSpan.textContent = result.company.buyer.phone;
    buyerPhone.appendChild(bPhoneSpan);

    const buyerEmail = document.querySelector('[data-buyer-email]');
    const bEmailSpan = document.createElement('span');
    bEmailSpan.textContent = result.company.buyer.email;
    buyerEmail.appendChild(bEmailSpan);



})
