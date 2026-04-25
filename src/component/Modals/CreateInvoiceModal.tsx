import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { InvoiceFormData, InvoiceItem, FormErrors, AnimationPhase } from '../../Types/invoice'
import { CalendarIcon, TrashIcon, ArrowLeftIcon, PlusIcon } from '../common/Icons/icons'
import { useInvoice } from '../../context/InvoiceContext'
import { formToInvoice, generateInvoiceId } from '../../Types/invoice'

interface CreateInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
}

// Empty initial data – no pre-filled values
const EMPTY_FORM_DATA: InvoiceFormData = {
  billFromStreet: '',
  billFromCity: '',
  billFromPostCode: '',
  billFromCountry: '',
  clientName: '',
  clientEmail: '',
  billToStreet: '',
  billToCity: '',
  billToPostCode: '',
  billToCountry: '',
  invoiceDate: '', // will default to today? keep empty for user choice
  paymentTerms: 'Net 30 Days', // sensible default
  projectDescription: '',
  items: [], // start with no items
}

const PAYMENT_TERMS_OPTIONS = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'] as const

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose }) => {

  const { addInvoice, invoices } = useInvoice();


  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('entering')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<InvoiceFormData>(EMPTY_FORM_DATA)

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Animation on open
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase('entering')
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimationPhase('visible'))
      })
      return () => cancelAnimationFrame(timer)
    }
  }, [isOpen])

  // Focus trap + keyboard
  useEffect(() => {
    if (animationPhase === 'visible') {
      const firstInput = modalRef.current?.querySelector<HTMLElement>('input, select, textarea, button:not([disabled])')
      if (firstInput) setTimeout(() => firstInput.focus(), 100)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [animationPhase])

  const handleClose = useCallback(() => {
    if (isLoading) return
    setAnimationPhase('exiting')
    setTimeout(() => onClose(), 300)
  }, [onClose, isLoading])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) handleClose()
  }

  const handleChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

const handleItemChange = (itemId: string, field: keyof InvoiceItem, value: string) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.map(item => {
      if (item.id !== itemId) return item;
      const updated = { ...item, [field]: value };
      // Recalculate total when quantity or price changes
      if (field === 'quantity' || field === 'price') {
        const qty = field === 'quantity' ? parseFloat(value) || 0 : updated.quantity;
        const price = field === 'price' ? parseFloat(value) || 0 : updated.price;
        updated.total = Math.round(qty * price * 100) / 100;
      }
      return updated;
    }),
  }));
};

  const handleAddItem = () => {
    const newId = generateInvoiceId(invoices.map(inv => inv.id)); // unique string ID
  setFormData(prev => ({
    ...prev,
    items: [...prev.items, { id: newId, name: '', quantity: 0, price: 0, total: 0 }],
  }));
    setTimeout(() => {
      if (contentRef.current) contentRef.current.scrollTop = contentRef.current.scrollHeight
    }, 100)
  }

const handleDeleteItem = (itemId: string) => {
  setFormData(prev => ({
    ...prev,
    items: prev.items.filter(item => item.id !== itemId),
  }));
};

  const overallTotal = useMemo(
    () => formData.items.reduce((sum, item) => sum + (item.total || 0), 0),
    [formData.items]
  )

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!formData.billFromStreet?.trim()) e.billFromStreet = 'Required'
    if (!formData.billFromCity?.trim()) e.billFromCity = 'Required'
    if (!formData.billFromPostCode?.trim()) e.billFromPostCode = 'Required'
    if (!formData.billFromCountry?.trim()) e.billFromCountry = 'Required'
    if (!formData.clientName?.trim()) e.clientName = 'Required'
    if (!formData.clientEmail?.trim()) e.clientEmail = 'Required'
    if (!formData.billToStreet?.trim()) e.billToStreet = 'Required'
    if (!formData.billToCity?.trim()) e.billToCity = 'Required'
    if (!formData.billToPostCode?.trim()) e.billToPostCode = 'Required'
    if (!formData.billToCountry?.trim()) e.billToCountry = 'Required'
    if (!formData.invoiceDate?.trim()) e.invoiceDate = 'Required'
    if (!formData.projectDescription?.trim()) e.projectDescription = 'Required'
    if (formData.items.length === 0) e.items = 'Add at least one item'
    formData.items.forEach(item => {
      if (!item.name?.trim()) e[`itemName_${item.id}`] = 'Required'
      if (!item.quantity || item.quantity <= 0) e[`itemQty_${item.id}`] = 'Required';
      if (!item.price || item.price <= 0) e[`itemPrice_${item.id}`] = 'Required'
    })
    return e
  }

  // ---------- Save as Draft ----------
  const handleSaveAsDraft = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // focus first error (existing logic) …
      return;
    }
    setIsLoading(true);
    const newId = generateInvoiceId(invoices.map(inv => inv.id));
    const newInvoice = formToInvoice(formData, newId, "draft");
    addInvoice(newInvoice);
    setIsLoading(false);
    handleClose();
  };

  // ---------- Save & Send (Pending) ----------
  const handleSaveAndSend = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // focus first error …
      return;
    }

    setIsLoading(true);   
    const newId = generateInvoiceId(invoices.map(inv => inv.id));
    const newInvoice = formToInvoice(formData, newId, "pending");
    addInvoice(newInvoice);
    setIsLoading(false);
    handleClose();
  };

  const getError = (field: string) => errors[field] || null

  const inputClass = (field: string) => `
    w-full px-4 py-3.5 rounded-md text-[13px] font-medium tracking-[-0.1px]
    border transition-all duration-200
    ${getError(field) ? 'input-error border-[#EC5757]' : 'border-[#DFE3FA] dark:border-[#252945]'}
    bg-[#F9FAFE] dark:bg-[#252945]
    text-[#0C0E16] dark:text-white
    placeholder-[#7E88C3] dark:placeholder-[#888EB0]
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const isVisible = animationPhase === 'visible'
  const isExiting = animationPhase === 'exiting'

  return (
    <div
      className="fixed inset-0 z-40 flex"
      style={{
        backgroundColor: isExiting ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
        transition: 'background-color 300ms ease-in-out',
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Create New Invoice"
    >
      {/* Modal panel */}
      <div
        ref={modalRef}
        className={`
          relative lg:pl-[159px] h-full flex flex-col bg-white dark:bg-[#1E2139]
          ${isVisible ? 'translate-x-0 opacity-100' : ''}
          ${isExiting ? '-translate-x-full opacity-0' : ''}
          ${!isVisible && !isExiting ? '-translate-x-full opacity-0' : ''}
        `}
        style={{
          width: 'min(100%, 616px)',
          borderRadius: '0 20px 20px 0',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
        }}
      >
        {/* Mobile "Go back" */}
        <div className="md:hidden flex items-center gap-4 px-6 pt-6 pb-2">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-[#0C0E16] dark:text-white font-bold text-[15px] tracking-[-0.25px] font-spartan hover:text-[#7C5DFA] transition-colors"
            disabled={isLoading}
          >
            <ArrowLeftIcon />
            Go back
          </button>
        </div>

        {/* Header */}
        <div className="px-6 md:px-8 pt-2 md:pt-8 pb-2 flex-shrink-0">
          <h2 className="text-2xl leading-[22px] tracking-[-0.75px] font-bold font-spartan text-[#0C0E16] dark:text-white">
            New Invoice
          </h2>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto modal-scroll px-6 md:px-8 py-4" style={{ scrollBehavior: 'smooth' }}>
          {/* Bill From */}
          <Section title="Bill From">
            <FieldWrapper>
              <Label>Street Address</Label>
              <input type="text" value={formData.billFromStreet} onChange={e => handleChange('billFromStreet', e.target.value)} className={inputClass('billFromStreet')} data-field="billFromStreet" disabled={isLoading} placeholder="Street address" />
              <FieldError error={getError('billFromStreet')} />
            </FieldWrapper>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FieldWrapper>
                <Label>City</Label>
                <input type="text" value={formData.billFromCity} onChange={e => handleChange('billFromCity', e.target.value)} className={inputClass('billFromCity')} data-field="billFromCity" disabled={isLoading} placeholder="City" />
                <FieldError error={getError('billFromCity')} />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Post Code</Label>
                <input type="text" value={formData.billFromPostCode} onChange={e => handleChange('billFromPostCode', e.target.value)} className={inputClass('billFromPostCode')} data-field="billFromPostCode" disabled={isLoading} placeholder="Post code" />
                <FieldError error={getError('billFromPostCode')} />
              </FieldWrapper>
              <FieldWrapper className="col-span-2 md:col-span-1">
                <Label>Country</Label>
                <input type="text" value={formData.billFromCountry} onChange={e => handleChange('billFromCountry', e.target.value)} className={inputClass('billFromCountry')} data-field="billFromCountry" disabled={isLoading} placeholder="Country" />
                <FieldError error={getError('billFromCountry')} />
              </FieldWrapper>
            </div>
          </Section>

          {/* Bill To */}
          <Section title="Bill To">
            <FieldWrapper>
              <Label>Client's Name</Label>
              <input type="text" value={formData.clientName} onChange={e => handleChange('clientName', e.target.value)} className={inputClass('clientName')} data-field="clientName" disabled={isLoading} placeholder="Client's name" />
              <FieldError error={getError('clientName')} />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Client's Email</Label>
              <input type="email" value={formData.clientEmail} onChange={e => handleChange('clientEmail', e.target.value)} className={inputClass('clientEmail')} data-field="clientEmail" disabled={isLoading} placeholder="client@email.com" />
              <FieldError error={getError('clientEmail')} />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Street Address</Label>
              <input type="text" value={formData.billToStreet} onChange={e => handleChange('billToStreet', e.target.value)} className={inputClass('billToStreet')} data-field="billToStreet" disabled={isLoading} placeholder="Street address" />
              <FieldError error={getError('billToStreet')} />
            </FieldWrapper>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FieldWrapper>
                <Label>City</Label>
                <input type="text" value={formData.billToCity} onChange={e => handleChange('billToCity', e.target.value)} className={inputClass('billToCity')} data-field="billToCity" disabled={isLoading} placeholder="City" />
                <FieldError error={getError('billToCity')} />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Post Code</Label>
                <input type="text" value={formData.billToPostCode} onChange={e => handleChange('billToPostCode', e.target.value)} className={inputClass('billToPostCode')} data-field="billToPostCode" disabled={isLoading} placeholder="Post code" />
                <FieldError error={getError('billToPostCode')} />
              </FieldWrapper>
              <FieldWrapper className="col-span-2 md:col-span-1">
                <Label>Country</Label>
                <input type="text" value={formData.billToCountry} onChange={e => handleChange('billToCountry', e.target.value)} className={inputClass('billToCountry')} data-field="billToCountry" disabled={isLoading} placeholder="Country" />
                <FieldError error={getError('billToCountry')} />
              </FieldWrapper>
            </div>
          </Section>

          {/* Invoice Info */}
          <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FieldWrapper>
                <Label>Invoice Date</Label>
                <div className="relative">
                  <input type="date" value={formData.invoiceDate} onChange={e => handleChange('invoiceDate', e.target.value)} className={`${inputClass('invoiceDate')} pr-10`} data-field="invoiceDate" disabled={isLoading} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><CalendarIcon /></span>
                </div>
                <FieldError error={getError('invoiceDate')} />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Payment Terms</Label>
                <select value={formData.paymentTerms} onChange={e => handleChange('paymentTerms', e.target.value)} className={inputClass('paymentTerms')} data-field="paymentTerms" disabled={isLoading}>
                  {PAYMENT_TERMS_OPTIONS.map(term => <option key={term} value={term}>{term}</option>)}
                </select>
              </FieldWrapper>
            </div>
            <FieldWrapper>
              <Label>Project / Description</Label>
              <input type="text" value={formData.projectDescription} onChange={e => handleChange('projectDescription', e.target.value)} className={inputClass('projectDescription')} data-field="projectDescription" disabled={isLoading} placeholder="Project description" />
              <FieldError error={getError('projectDescription')} />
            </FieldWrapper>
          </Section>

          {/* Item List */}
          <div className="mb-4">
            <h3 className="text-[13px] font-bold tracking-[-0.1px] uppercase mb-4 text-[#777F98] dark:text-[#DFE3FA]">Item List</h3>
            <div className="hidden md:grid md:grid-cols-[2fr_0.7fr_1fr_1fr_0.3fr] gap-3 mb-3 px-1">
              <span className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">Item Name</span>
              <span className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] text-center">Qty.</span>
              <span className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] text-center">Price</span>
              <span className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] text-center">Total</span>
              <span />
            </div>

            {formData.items.length === 0 ? (
              <div className="text-center py-8 text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] italic">
                No items added yet. Click "+ Add New Item" to start.
              </div>
            ) : (
              <div className="space-y-3">
                {formData.items.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-[2fr_0.7fr_1fr_1fr_0.3fr] gap-3 items-start md:items-center">
                    <div>
                      <span className="md:hidden text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] font-medium block mb-1">Item Name</span>
                      <input type="text" value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className={inputClass(`itemName_${item.id}`)} data-field={`itemName_${item.id}`} disabled={isLoading} placeholder="Item name" />
                      <FieldError error={getError(`itemName_${item.id}`)} />
                    </div>
                    <div>
                      <span className="md:hidden text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] font-medium block mb-1">Qty.</span>
                      <input
                       type="number" 
                       value={item.quantity || ''}
                       onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} 
                       className={`${inputClass(`itemQty_${item.id}`)} text-center`} 
                       data-field={`itemQty_${item.id}`} 
                       disabled={isLoading} 
                       placeholder="0" min="0" step="1" />
                      <FieldError error={getError(`itemQty_${item.id}`)} />
                    </div>
                    <div>
                      <span className="md:hidden text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] font-medium block mb-1">Price</span>
                      <input type="number" value={item.price || ''} onChange={e => handleItemChange(item.id, 'price', e.target.value)} className={`${inputClass(`itemPrice_${item.id}`)} text-center`} data-field={`itemPrice_${item.id}`} disabled={isLoading} placeholder="0.00" min="0" step="0.01" />
                      <FieldError error={getError(`itemPrice_${item.id}`)} />
                    </div>
                    <div>
                      <span className="md:hidden text-[11px] text-[#7E88C3] dark:text-[#DFE3FA] font-medium block mb-1">Total</span>
                      <div className="w-full px-4 py-3.5 rounded-md text-[13px] font-bold tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] text-center bg-transparent">
                        £ {(item.total ?? 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex md:justify-center pt-1 md:pt-0">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-[#7E88C3] dark:text-[#DFE3FA] hover:text-[#EC5757] hover:scale-115 transition-all duration-200"
                        disabled={isLoading}
                        title="Delete item"
                        aria-label={`Delete ${item.name || 'item'}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {getError('items') && (
              <p className="text-[#EC5757] text-[11px] mt-1 font-medium">{getError('items')}</p>
            )}

            <button
              onClick={handleAddItem}
              className="w-full mt-4 py-3.5 rounded-full text-[13px] font-bold tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] border border-dashed border-[#DFE3FA] dark:border-[#252945] bg-[#F9FAFE] dark:bg-[#252945] flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#DFE3FA] dark:hover:bg-[#373B53] hover:border-[#7C5DFA] dark:hover:border-[#9277FF]"
              disabled={isLoading}
            >
              <PlusIcon />
              Add New Item
            </button>
          </div>

          <div className="md:hidden mt-6 pt-4 border-t border-[#DFE3FA] dark:border-[#252945] flex justify-between items-center">
            <span className="text-[15px] font-bold text-[#0C0E16] dark:text-white">Total</span>
            <span className="text-[20px] font-bold text-[#0C0E16] dark:text-white font-spartan">£ {overallTotal.toFixed(2)}</span>
          </div>
          <div className="h-4" />
        </div>

        {/* // Footer (replace the existing footer div completely) */}
        <div className="flex-shrink-0 px-6 md:px-8 py-5 border-t border-[#DFE3FA] dark:border-[#252945] bg-white dark:bg-[#1E2139]" style={{ borderRadius: '0 0 20px 0' }}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Cancel */}
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-[13px] font-bold tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] bg-[#F9FAFE] dark:bg-[#252945] border border-[#DFE3FA] dark:border-[#252945] order-2 sm:order-1 transition-all duration-200 hover:bg-[#DFE3FA] dark:hover:bg-[#373B53] hover:text-[#7C5DFA]"
              disabled={isLoading}
            >
              Cancel
            </button>

            <div className="flex-1 hidden sm:block" />

            {/* Save as Draft */}
            <button
              onClick={handleSaveAsDraft}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-[13px] font-bold tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] bg-[#F9FAFE] dark:bg-[#252945] border border-[#DFE3FA] dark:border-[#252945] order-3 sm:order-2 transition-all duration-200 hover:bg-[#DFE3FA] dark:hover:bg-[#373B53] hover:text-[#7C5DFA]"
              disabled={isLoading}
            >
              Save as Draft
            </button>

            {/* Save & Send */}
            <button
              onClick={handleSaveAndSend}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-white text-[13px] font-bold tracking-[-0.1px] flex items-center justify-center order-1 sm:order-3 transition-all duration-200 hover:bg-[#9277FF] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(124,93,250,0.4)] active:translate-y-0 active:shadow-none"
              style={{ backgroundColor: '#7C5DFA' }}
              disabled={isLoading}
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper sub‑components (you can extract these into a shared file to avoid duplication)
const Section: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    {title && <h3 className="text-[13px] font-bold tracking-[-0.1px] uppercase mb-4 text-[#7C5DFA]">{title}</h3>}
    <div className={title ? 'space-y-4' : ''}>{children}</div>
  </div>
)

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[13px] font-medium tracking-[-0.1px] text-[#7E88C3] dark:text-[#DFE3FA] mb-2">{children}</label>
)

const FieldWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

const FieldError: React.FC<{ error: string | null }> = ({ error }) =>
  error ? <p className="text-[#EC5757] text-[11px] mt-1 font-medium">{error}</p> : null

export default CreateInvoiceModal