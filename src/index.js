const URL = 'https://in3.dev/inv/';
let items = [];
const currencySymbol = 'EUR';
let totalFinalSum = 0;
let totalSumArray  = [];
let sumResult = 0;
const VATnum = 0.21;


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

    //items
    items = result.items;
    console.log(items);
    //sukurti node



    items.forEach(item => {
        const itemRow = document.querySelector('[data-table-row]');
        const itemRowTemplate = document.querySelector('[data-row-template]');
        const div = itemRowTemplate.content.cloneNode(true);

        let discountDescription = () => {
            if(item.discount.type == 'fixed'){
                return `fiksuota`
                // return item.discount.value;
            }else if( item.discount.type == 'percentage'){
                return `${item.discount.value} %`; 
            }else {
                return 0;
            }
        }

        let discountCalc = () => {
            if(item.discount.type == 'fixed'){
                return item.discount.value;
            }else if( item.discount.type == 'percentage'){
                let calculatePercent = (item.quantity * item.price) * (item.discount.value/100)
                return calculatePercent.toFixed(2); 
            }else {
                return 0;
            }

        }

        let beforeVATcalc = () => {
            return (item.quantity * item.price).toFixed(2);
        }

        let sumAfterDiscount = () => {
            let sumAfter = beforeVATcalc() - discountCalc();
            console.log(sumAfter);
            totalSumArray.push(sumAfter);
            console.log(totalSumArray);
    
            return sumAfter.toFixed(2);
        }

        console.log(`after push:${totalSumArray}`);

        // totalSumArray.push(sumAfter);
        // console.log(totalSumArray);

    
        const description = div.querySelector('[data-description]');
        const quantity = div.querySelector('[data-quantity]');
        const priceWithoutVAT = div.querySelector('[data-price-WithoutVAT]');
        const sumWithoutVAT = div.querySelector('[data-sum-WithoutVAT]');
        const discountType = div.querySelector('[data-discount-type]');
        const discountAmount = div.querySelector('[data-discount-amount]');
        const sumAfter = div.querySelector('[data-sum-after]');
        const currency = div.querySelector('[data-currency]');
    
        description.innerText = item.description;
        quantity.innerText = item.quantity;
        priceWithoutVAT.innerText = item.price;
        sumWithoutVAT.innerText = beforeVATcalc()
        discountType.innerText = discountDescription();
        discountAmount.innerText = discountCalc();
        sumAfter.innerText = sumAfterDiscount();
        currency.innerText = currencySymbol;
        
        itemRow.appendChild(div);

        sumResult = totalSumArray.reduce((a, b) => a + b, 0);
        console.log(`sumeResult: ${sumResult}`);
        return sumResult;
        

    })

    console.log(`sumeResult outside: ${sumResult}`);

    let VATcalc = () => sumResult * VATnum;
    let totalCalc = () => sumResult + VATcalc();
 
        //total
        const totalWithoutVAT = document.querySelector('[data-sum-all]');
        const VAT = document.querySelector('[data-VAT]');
        const totalFinal = document.querySelector('[data-total-final]');

        totalWithoutVAT.innerText = `${sumResult.toFixed(2)} ${currencySymbol}`;
        VAT.innerText = `${VATcalc().toFixed(2)} ${currencySymbol}`;
        totalFinal.innerText = `${totalCalc().toFixed(2)} ${currencySymbol}`;

})

