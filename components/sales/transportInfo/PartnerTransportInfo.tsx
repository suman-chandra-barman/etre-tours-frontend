import { PartnerSalesFormData } from "@/lib/schemas";

interface PartnerTransportInfoProps {
  formData?: Partial<PartnerSalesFormData>;
}

function PartnerTransportInfo({ formData = {} }: PartnerTransportInfoProps) {
  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Calculate total passengers
  const totalAdults = formData.adults || 0;
  const totalChildren = formData.children || 0;
  const totalInfants = formData.infant || 0;
  const totalFOC = formData.foc || 0;
  const totalPassengers = totalAdults + totalChildren + totalInfants + totalFOC;

  // Calculate total price based on partner sales pricing
  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 29.0;
  const totalAmount = totalAdults * ADULT_PRICE + totalChildren * CHILD_PRICE;

  return (
    <div className="bg-white p-8 border-l border-gray-200 overflow-y-auto min-w-md">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Invoice</h2>
        </div>

        {/* Reservation Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Reservation : </p>
              <p>
                {formData.date && formData.time
                  ? `${formatDate(formData.date)}, ${formData.time} AM`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Partner : </p>
              <p>
                {formData.partner && formData.partnerType
                  ? `${formData.partner} (${formData.partnerType})`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Tour : </p>
              <p>{formData.tour ? formData.tour : "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Guide : </p>
              <p>
                {formData.guide
                  ? formData.extraGuide
                    ? `${formData.guide}, ${formData.extraGuide}`
                    : formData.guide
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Transport Details */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Transport : </p>
              <p>{formData.transport ? `${formData.transport} |` : "N/A"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Driver : </p>
              <p>
                {formData.driver && formData.busId
                  ? `${formData.driver} | Bus ID: ${formData.busId}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Passengers Summary */}
        {totalPassengers > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <p className="text-sm text-gray-600 mb-3">Guests</p>
            <div className="space-y-2 mb-4">
              {totalAdults > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <p>Adults : </p>
                  <p>{totalAdults}</p>
                </div>
              )}
              {totalChildren > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <p>Children : </p>
                  <p>{totalChildren}</p>
                </div>
              )}
              {totalFOC > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <p>FOC : </p>
                  <p>{totalFOC.toString().padStart(2, "0")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        {totalAmount > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <p className="text-sm text-gray-600 mb-3">Unit Price</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <p>
                  ${ADULT_PRICE.toFixed(2)} (Adults), ${CHILD_PRICE.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <p>(Children)</p>
              </div>
            </div>
          </div>
        )}

        {/* Amount to Pay */}
        {totalAmount > 0 && (
          <div className="pt-6">
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 mb-4">
              <span className="font-semibold text-blue-600">Amount to Pay</span>
              <span className="text-lg font-bold text-blue-600">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <p className="font-semibold">Payment Method:</p>
              <p className="text-blue-600">{formData.paymentMethod || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartnerTransportInfo;
