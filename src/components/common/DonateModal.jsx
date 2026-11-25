import { useState } from 'react';
import { X, Heart, Download, CheckCircle2, CreditCard, Sparkles, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { renderCertificateDataUrl, downloadCertificatePdf } from '../../utils/generateCertificatePdf';

const PRESET_AMOUNTS = [25000, 50000, 100000, 250000];
const PAYMENT_METHODS = ['Payme', 'Click', 'Uzcard / Humo', 'Visa / Mastercard'];

function formatAmount(val, currency) {
  const num = Number(val) || 0;
  return `${num.toLocaleString('uz-UZ').replace(/,/g, ' ')} ${currency}`;
}

export default function DonateModal({ open, onClose }) {
  const { language, t } = useLanguage();
  const d = t.donate;

  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState('Payme');
  const [note, setNote] = useState('');
  const [nameError, setNameError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [certPreviewUrl, setCertPreviewUrl] = useState('');
  const [certRecord, setCertRecord] = useState(null);

  if (!open) return null;

  const effectiveAmount = customAmount.trim() ? Math.max(1000, Number(customAmount) || 0) : amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedName = fullName.trim();
    if (!cleanedName) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setLoading(true);

    const now = new Date();
    const dateText = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
    const certificateId = `MKH-${now.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const amountText = formatAmount(effectiveAmount, d.currency);

    const record = {
      fullName: cleanedName,
      amountText,
      dateText,
      certificateId,
      language,
      method,
    };

    try {
      const previewUrl = await renderCertificateDataUrl(record);
      setCertPreviewUrl(previewUrl);
      setCertRecord(record);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!certRecord) return;
    await downloadCertificatePdf(certRecord);
  };

  const handleReset = () => {
    setCertPreviewUrl('');
    setCertRecord(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E5EAF0] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5EAF0] bg-[#FAF7F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#15528B] text-white flex items-center justify-center">
              <Heart size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#17243B] text-sm sm:text-base">{d.modalTitle}</h3>
              <p className="text-[11px] text-[#66758A]">{d.modalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="w-8 h-8 rounded-lg hover:bg-[#E5EAF0]/60 flex items-center justify-center text-[#66758A] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!certRecord ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Donor Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#17243B] mb-1.5">
                  {d.fullNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError && e.target.value.trim()) setNameError(false);
                  }}
                  placeholder={d.fullNamePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    nameError
                      ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                      : 'border-[#E5EAF0] bg-[#F7F9FC] focus:bg-white focus:border-[#15528B]'
                  }`}
                />
                {nameError && <p className="text-xs text-red-600 mt-1">{d.fullNameRequired}</p>}
              </div>

              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-semibold text-[#17243B] mb-1.5">{d.amountLabel}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                  {PRESET_AMOUNTS.map((val) => {
                    const active = !customAmount && amount === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setAmount(val);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                          active
                            ? 'bg-[#15528B] border-[#15528B] text-white shadow-xs'
                            : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#17243B] hover:border-[#15528B]/50'
                        }`}
                      >
                        {formatAmount(val, d.currency)}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={d.customAmountPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] focus:bg-white focus:border-[#15528B] text-sm outline-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-[#17243B] mb-1.5">{d.methodLabel}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        method === m
                          ? 'bg-[#EBF3FA] border-[#15528B] text-[#15528B] font-semibold'
                          : 'bg-white border-[#E5EAF0] text-[#66758A] hover:border-[#15528B]/40'
                      }`}
                    >
                      <CreditCard size={13} />
                      <span className="truncate">{m}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Wish */}
              <div>
                <label className="block text-xs font-semibold text-[#17243B] mb-1.5">{d.noteLabel}</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={d.notePlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] focus:bg-white focus:border-[#15528B] text-sm outline-none"
                />
              </div>

              <div className="flex items-start gap-2 bg-[#FCF8EE] border border-[#E6D6B5] rounded-xl px-3.5 py-2.5 text-[11px] text-[#66758A]">
                <Sparkles size={14} className="text-[#C58B43] shrink-0 mt-0.5" />
                <span>{d.certificateHint}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2A74BA] to-[#15528B] hover:from-[#15528B] hover:to-[#123A61] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <Heart size={16} />
                <span>{loading ? d.generating : d.submitButton}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-[#E8F5EE] border border-[#319568]/25 rounded-xl px-4 py-3">
                <CheckCircle2 size={22} className="text-[#319568] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#17243B] text-sm">
                    {d.thankYouTitle.replace('{name}', certRecord.fullName)}
                  </h4>
                  <p className="text-xs text-[#66758A] mt-0.5">{d.thankYouSubtitle}</p>
                </div>
              </div>

              {/* Crisp live preview of the generated Khorezm Certificate */}
              <div className="rounded-xl border border-[#E2D4B7] bg-[#FAF5EA] p-2 shadow-xs">
                <img
                  src={certPreviewUrl}
                  alt={`Tashakkurnoma — ${certRecord.fullName}`}
                  className="w-full h-auto rounded-lg block"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5EAF0] text-xs font-semibold text-[#66758A] hover:text-[#15528B] hover:border-[#15528B]/40 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>{d.donateAgain}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#15528B] hover:bg-[#123A61] text-white text-sm font-semibold shadow-sm cursor-pointer transition-colors"
                >
                  <Download size={16} />
                  <span>{d.downloadPdf}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
