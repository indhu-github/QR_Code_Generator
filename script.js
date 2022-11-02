const form = document.getElementById('input-form');
const qrcode = document.getElementById('qrcode');

const onSubmit = e => {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url === ''){
        alert('Please enter a URL');
    }else{
        showSpinner();

        //Show spinner for 1 sec
        setTimeout(()=>{
            hideSpinner();
            generateQRCode(url,size);
            setTimeout(()=>{
                const saveURL = qrcode.querySelector('img').src;
                createSaveButton(saveURL);
            },50);  
        },1000);
    }
}

const generateQRCode = (url,size) => {
    new QRCode('qrcode',{
        text: url,
        width: size,
        height: size,
    })
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

//to clear the qr code image and the save button everytime
const clearUI = () => {
    qrcode.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if(saveLink) saveLink.remove();
}

//create a save button to download the QR code image
const createSaveButton = (saveURL) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-800 text-white m-auto my-5 font-bold py-2 rounded w-1/3';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated-image').appendChild(link);
}

hideSpinner();

form.addEventListener('submit',onSubmit);

