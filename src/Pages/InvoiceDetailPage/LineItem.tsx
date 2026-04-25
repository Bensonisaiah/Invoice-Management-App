import React from "react";

interface LineItemProps {
  /** Name/description of the item or service */
  name: string;
  /** Quantity (can be a number or a string) */
  quantity: number;
  /** Unit price (numeric) */
  unitPrice: number;
  /** Currency symbol (default: £) */
  currency?: string;
  /** Additional classes for the outer grid container */
  className?: string;
}

const LineItem: React.FC<LineItemProps> = ({
  name,
  quantity,
  unitPrice,
  currency = "£",
  className = "",
}) => {
  // Convert quantity to a number for calculation
  const qty = typeof quantity === "string" ? parseFloat(quantity) : quantity;

  // Calculate total line amount
  const totalPrice = unitPrice * qty;

  // Format numbers to 2 decimal places with the chosen currency symbol
  const formatPrice = (value: number | undefined | null) => {
  if (typeof value !== 'number' || isNaN(value)) return `${currency} 0.00`;
  return `${currency} ${value.toFixed(2)}`;
};

  return (
    <div
      className={`grid grid-cols-12 font-bold text-[15px] leading-[15px] tracking-[0.25px] ${className}`}
    >
      {/* Item name */}
      <div className="col-span-6 text-text-primary">{name}</div>

      {/* Quantity */}
      <div className="col-span-2 text-[#7E88C3] dark:text-[#DFE3FA]">
        {quantity}
      </div>

      {/* Unit price */}
      <div className="col-span-2 text-[#7E88C3] dark:text-[#DFE3FA]">
        {formatPrice(unitPrice)}
      </div>

      {/* Calculated total */}
      <div className="col-span-2 text-text-primary">
        {formatPrice(totalPrice)}
      </div>
    </div>
  );
};

export default LineItem;