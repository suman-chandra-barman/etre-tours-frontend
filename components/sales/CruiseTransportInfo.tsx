import React from "react";
import { MapPin, Clock, Users, Bus } from "lucide-react";

interface FormData {
  date: string;
  departureTime: string;
  returnTime: string;
  tour: string;
  transport: string;
  driver: string;
  busId: string;
  guide: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
}

interface CruiseTransportInfoProps {
  formData: FormData;
  additionalTransports?: Array<{
    id: number;
    transport: string;
    driver: string;
    busId: string;
    adults: number;
    children: number;
    infant: number;
    foc: number;
  }>;
}

function CruiseTransportInfo({
  formData,
  additionalTransports = [],
}: CruiseTransportInfoProps) {
  // Calculate duration in minutes
  const calculateDuration = () => {
    if (!formData.departureTime || !formData.returnTime) return "";

    const [depHour, depMin] = formData.departureTime.split(":").map(Number);
    const [retHour, retMin] = formData.returnTime.split(":").map(Number);

    const depTotalMin = depHour * 60 + depMin;
    let retTotalMin = retHour * 60 + retMin;

    // Handle day overflow
    if (retTotalMin < depTotalMin) {
      retTotalMin += 24 * 60;
    }

    const durationMin = retTotalMin - depTotalMin;
    const hours = Math.floor(durationMin / 60);
    const minutes = durationMin % 60;

    return `${hours.toString().padStart(2, "0")} hour ${minutes
      .toString()
      .padStart(2, "0")} min`;
  };

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
  const totalAdults =
    formData.adults +
    (additionalTransports?.reduce((sum, t) => sum + t.adults, 0) || 0);
  const totalChildren =
    formData.children +
    (additionalTransports?.reduce((sum, t) => sum + t.children, 0) || 0);
  const totalInfants =
    formData.infant +
    (additionalTransports?.reduce((sum, t) => sum + t.infant, 0) || 0);
  const totalFOC =
    formData.foc +
    (additionalTransports?.reduce((sum, t) => sum + t.foc, 0) || 0);
  const totalPassengers = totalAdults + totalChildren + totalInfants + totalFOC;

  return (
    <div className=" bg-white p-8 border-l border-gray-200 overflow-y-auto min-w-md">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Receipt</h2>
        </div>

        {/* Tour Information */}
        <div className="mb-4 flex items-center gap-3 text-sm tracking-widest">
          <p>Tour : </p>
          <p>{formData.tour ? formData.tour : "N/A"}</p>
        </div>

        <div className="mb-4 flex items-center gap-3 text-sm tracking-widest">
          <p>Guide : </p>
          <p>{formData.guide ? formData.guide : "N/A"}</p>
        </div>

        {/* Date and Time */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Departure Time : </p>
              <p>
                {formData.date ? (
                  <>
                    {formatDate(formData.date)},{" "}
                    {formData.departureTime || "--:--"} AM
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Return Time : </p>
              <p>
                {formData.date && formData.returnTime
                  ? `${formatDate(formData.date)}, ${formData.returnTime} AM`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Duration : </p>
              <p>{calculateDuration() || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Transport Details */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 text-sm tracking-widest">
              <p>Bus : </p>
              <p>
                {formData.transport
                  ? `${formData.driver} - ${formData.busId} - ${
                      formData.adults +
                      formData.children +
                      formData.infant +
                      formData.foc
                    } pax`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Additional Transports */}
          {additionalTransports &&
            additionalTransports.map((transport, index) => (
              <div key={transport.id} className="flex items-start gap-3">
                <div className="flex items-center gap-3 text-sm tracking-widest">
                  <p>Bus{index + 2} : </p>
                  <p>
                    {transport.driver} - {transport.busId} -{" "}
                    {transport.adults +
                      transport.children +
                      transport.infant +
                      transport.foc}{" "}
                    pax
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Passengers Summary */}
        {totalPassengers > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-3">Passengers</p>
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
              {totalInfants > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <p>Infants : </p>
                  <p>{totalInfants}</p>
                </div>
              )}
              {totalFOC > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <p>FOC : </p>
                  <p>{totalFOC}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-blue-600">Total</span>
              <span className="text-lg font-bold text-blue-600">
                {totalPassengers} pax
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CruiseTransportInfo;
