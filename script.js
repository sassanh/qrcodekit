let qr;
let blob;
const qrcodeElement = document.getElementById('qrcode');

document.addEventListener('DOMContentLoaded', () => {
  qr = new QRCode(qrcodeElement, {
    width: 320,
    height: 320,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.L,
  });
  updateQRCode('')
})

function updateQRCode(text) {
  qr.makeCode(text);
  qrcodeElement.querySelector('canvas').toBlob(blob_ => {
    blob = blob_;
  });
}

let inputElement = document.getElementById('text-input');
inputElement.addEventListener('input', () => updateQRCode(inputElement.value));
