import { jsPDF } from 'jspdf';

const COPY = {
  uz: {
    heading: 'TASHAKKURNOMA',
    subheading: 'RAQAMLI ENSIKLOPEDIYA HOMIYSI',
    presentedTo: 'Ushbu tashakkurnoma samimiy minnatdorlik bilan taqdim etiladi:',
    bodyLine1:
      "Xorazm vohasining boy tarixi, madaniy merosi, me'moriy obidalari va zamonaviy hayotini",
    bodyLine2:
      "raqamli makonda keng targ'ib etuvchi my-khorezm.uz loyihasini qo'llab-quvvatlaganingiz uchun!",
    amountLabel: "Qo'llab-quvvatlash hissasi:",
    dateLabel: 'Sana:',
    idLabel: 'Sertifikat №:',
    teamLabel: 'my-khorezm.uz jamoasi',
    sealTop: 'XORAZM',
    sealBottom: 'MEROS',
  },
  ru: {
    heading: 'БЛАГОДАРНОСТЬ',
    subheading: 'ПОЧЁТНЫЙ МЕЦЕНАТ ПРОЕКТА',
    presentedTo: 'Настоящее благодарственное письмо с глубокой признательностью вручается:',
    bodyLine1:
      'За вклад в развитие цифровой энциклопедии my-khorezm.uz, сохранение и популяризацию',
    bodyLine2: 'богатой истории, культуры, памятников и современной жизни Хорезмского оазиса!',
    amountLabel: 'Благотворительный вклад:',
    dateLabel: 'Дата:',
    idLabel: 'Сертификат №:',
    teamLabel: 'Команда my-khorezm.uz',
    sealTop: 'ХОРЕЗМ',
    sealBottom: 'НАСЛЕДИЕ',
  },
  en: {
    heading: 'CERTIFICATE',
    subheading: 'OF APPRECIATION · PROJECT SUPPORTER',
    presentedTo: 'This certificate of appreciation is proudly presented to:',
    bodyLine1:
      'In sincere gratitude for supporting the my-khorezm.uz digital encyclopedia and helping',
    bodyLine2:
      "preserve and share Khorezm's rich history, cultural heritage, monuments and modern life!",
    amountLabel: 'Contribution:',
    dateLabel: 'Date:',
    idLabel: 'Certificate ID:',
    teamLabel: 'my-khorezm.uz Team',
    sealTop: 'KHOREZM',
    sealBottom: 'HERITAGE',
  },
};

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawCornerOrnament(ctx, x, y, scaleX, scaleY) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);

  // Outer turquoise/cobalt corner filigree
  ctx.fillStyle = '#15528B';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(136, 0);
  ctx.bezierCurveTo(106, 20, 86, 22, 64, 48);
  ctx.bezierCurveTo(42, 74, 24, 98, 0, 136);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#2C9AB0';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(106, 0);
  ctx.bezierCurveTo(82, 16, 66, 20, 48, 40);
  ctx.bezierCurveTo(30, 60, 18, 78, 0, 106);
  ctx.closePath();
  ctx.fill();

  // Gold lotus border inside corner
  ctx.strokeStyle = '#E8BD6B';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(14, 14);
  ctx.quadraticCurveTo(44, 22, 62, 10);
  ctx.moveTo(14, 14);
  ctx.quadraticCurveTo(22, 44, 10, 62);
  ctx.stroke();

  ctx.fillStyle = '#E8BD6B';
  ctx.beginPath();
  ctx.arc(28, 28, 6.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawWatermarkPattern(ctx, w, h) {
  ctx.save();
  ctx.strokeStyle = 'rgba(197, 139, 67, 0.08)';
  ctx.lineWidth = 1.4;
  const step = 160;
  for (let cx = 80; cx < w; cx += step) {
    for (let cy = 80; cy < h; cy += step) {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? 46 : 24;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

export async function renderCertificateDataUrl({
  fullName,
  amountText,
  dateText,
  certificateId,
  language = 'uz',
}) {
  const copy = COPY[language] || COPY.uz;
  const W = 1754;
  const H = 1240;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Warm parchment base
  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 120, W / 2, H / 2, W * 0.65);
  bgGrad.addColorStop(0, '#FFFDF9');
  bgGrad.addColorStop(0.7, '#FAF4E7');
  bgGrad.addColorStop(1, '#F1E5CC');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  drawWatermarkPattern(ctx, W, H);

  // Outer deep cobalt & gold frames
  ctx.strokeStyle = '#15528B';
  ctx.lineWidth = 12;
  ctx.strokeRect(42, 42, W - 84, H - 84);

  ctx.strokeStyle = '#C58B43';
  ctx.lineWidth = 4;
  ctx.strokeRect(64, 64, W - 128, H - 128);

  ctx.strokeStyle = '#2C9AB0';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(78, 78, W - 156, H - 156);

  // Four Khivan majolica corners
  drawCornerOrnament(ctx, 42, 42, 1, 1);
  drawCornerOrnament(ctx, W - 42, 42, -1, 1);
  drawCornerOrnament(ctx, 42, H - 42, 1, -1);
  drawCornerOrnament(ctx, W - 42, H - 42, -1, -1);

  // Top logo
  const logoImg = await loadImage('/images/logo-khorezm.png');
  if (logoImg) {
    const logoH = 104;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(logoImg, (W - logoW) / 2, 126, logoW, logoH);
    ctx.restore();
  } else {
    ctx.fillStyle = '#15528B';
    ctx.font = '700 44px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('my-khorezm.uz', W / 2, 190);
  }

  // Decorative divider
  ctx.strokeStyle = '#C58B43';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 220, 268);
  ctx.lineTo(W / 2 + 220, 268);
  ctx.stroke();

  ctx.fillStyle = '#2C9AB0';
  ctx.beginPath();
  ctx.moveTo(W / 2, 258);
  ctx.lineTo(W / 2 + 12, 268);
  ctx.lineTo(W / 2, 278);
  ctx.lineTo(W / 2 - 12, 268);
  ctx.closePath();
  ctx.fill();

  // Main Certificate Heading
  ctx.textAlign = 'center';
  ctx.fillStyle = '#123A61';
  ctx.font = '800 84px Georgia, "Times New Roman", serif';
  ctx.fillText(copy.heading, W / 2, 382);

  // Subheading
  ctx.fillStyle = '#C58B43';
  ctx.font = '700 24px Inter, system-ui, sans-serif';
  ctx.fillText(copy.subheading, W / 2, 434);

  // "Presented to"
  ctx.fillStyle = '#536275';
  ctx.font = '500 28px Inter, system-ui, sans-serif';
  ctx.fillText(copy.presentedTo, W / 2, 520);

  // Donor Name
  const displayName = (fullName || '').trim();
  ctx.fillStyle = '#15528B';
  ctx.font = 'italic 700 74px Georgia, "Times New Roman", serif';
  ctx.fillText(displayName, W / 2, 622);

  // Gold underline under donor name
  const nameMetrics = ctx.measureText(displayName);
  const lineHalf = Math.min(540, Math.max(260, nameMetrics.width / 2 + 50));
  const lineGrad = ctx.createLinearGradient(W / 2 - lineHalf, 0, W / 2 + lineHalf, 0);
  lineGrad.addColorStop(0, 'rgba(197, 139, 67, 0.1)');
  lineGrad.addColorStop(0.5, '#C58B43');
  lineGrad.addColorStop(1, 'rgba(197, 139, 67, 0.1)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - lineHalf, 650);
  ctx.lineTo(W / 2 + lineHalf, 650);
  ctx.stroke();

  // Body lines
  ctx.fillStyle = '#2A394D';
  ctx.font = '400 27px Inter, system-ui, sans-serif';
  ctx.fillText(copy.bodyLine1, W / 2, 730);
  ctx.fillText(copy.bodyLine2, W / 2, 774);

  // Contribution pill box
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#DFD0B2';
  ctx.lineWidth = 2;
  const pillW = 540;
  const pillH = 68;
  const pillX = (W - pillW) / 2;
  const pillY = 824;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 34);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#17243B';
  ctx.font = '600 26px Inter, system-ui, sans-serif';
  ctx.fillText(`${copy.amountLabel}  ${amountText}`, W / 2, pillY + 43);

  // Bottom row: Date/ID (left), Golden Seal (center), Signature (right)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#66758A';
  ctx.font = '500 22px Inter, system-ui, sans-serif';
  ctx.fillText(`${copy.dateLabel} ${dateText}`, 180, 1030);
  ctx.fillText(`${copy.idLabel} ${certificateId}`, 180, 1072);

  // Golden Emblem Seal at bottom center
  const sx = W / 2;
  const sy = 1038;
  ctx.save();
  ctx.strokeStyle = '#C58B43';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sx, sy, 74, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#15528B';
  ctx.beginPath();
  ctx.arc(sx, sy, 64, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#E8BD6B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sx, sy, 54, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8BD6B';
  ctx.font = '700 13px Inter, system-ui, sans-serif';
  ctx.fillText(copy.sealTop, sx, sy - 16);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 13.5px Inter, system-ui, sans-serif';
  ctx.fillText('my-khorezm.uz', sx, sy + 5);
  ctx.fillStyle = '#E8BD6B';
  ctx.font = '700 12px Inter, system-ui, sans-serif';
  ctx.fillText(copy.sealBottom, sx, sy + 24);
  ctx.restore();

  // Signature block on bottom right
  ctx.textAlign = 'right';
  ctx.fillStyle = '#15528B';
  ctx.font = 'italic 600 32px Georgia, serif';
  ctx.fillText('my-khorezm.uz', W - 180, 1022);
  ctx.strokeStyle = '#C58B43';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 430, 1038);
  ctx.lineTo(W - 180, 1038);
  ctx.stroke();
  ctx.fillStyle = '#66758A';
  ctx.font = '500 22px Inter, system-ui, sans-serif';
  ctx.fillText(copy.teamLabel, W - 180, 1072);

  return canvas.toDataURL('image/jpeg', 0.94);
}

export async function downloadCertificatePdf(params) {
  const dataUrl = await renderCertificateDataUrl(params);
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });
  doc.addImage(dataUrl, 'JPEG', 0, 0, 297, 210);

  const safeName = (params.fullName || 'Donor')
    .trim()
    .replace(/[^a-zA-Z0-9\u0400-\u04FF_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  doc.save(`Tashakkurnoma-${safeName || 'my-khorezm-uz'}.pdf`);
  return dataUrl;
}
