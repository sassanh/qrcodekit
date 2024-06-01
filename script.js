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

function downloadQRCode() {
  const canvas = qrcodeElement.querySelector('canvas');
  const padding = 16;
  const context = canvas.getContext('2d');
  const width = canvas.width + padding * 2;
  const height = canvas.height + padding * 2;
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempContext = tempCanvas.getContext('2d');
  tempContext.fillStyle = 'white';
  tempContext.fillRect(0, 0, width, height);
  tempContext.putImageData(imageData, padding, padding);

  const url = tempCanvas.toDataURL('image/png');

  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrcode.png';
  a.click();
}

function copyQRCode() {
  navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
}

document.getElementById('text-input').addEventListener('paste', async function(event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (let item of items) {
    if (item.type.indexOf('image') === 0) {
      const blob = item.getAsFile();
      const html5QrCode = new Html5Qrcode('qr-reader');
      const result = await html5QrCode.scanFile(blob, false)
      inputElement.value = result
      updateQRCode(result)
    }
  }
});
