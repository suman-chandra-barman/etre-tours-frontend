import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { Users, Baby, Briefcase, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TransportDetails } from "./TransportDetails";
import { PassengerCounter } from "./PassengerCounter";
import { SelectField } from "./SelectField";
import { GUIDE_OPTIONS } from "@/constants/FormOptions";
import { UserCircle2 } from "lucide-react";

interface AdditionalTransportCardProps {
  index: number;
  transport: any;
  onRemove: () => void;
  onTransportChange: (value: string) => void;
  onDriverChange: (value: string) => void;
  onBusIdChange: (value: string) => void;
  onGuideChange: (value: string) => void;
  onExtraGuideChange: (value: string) => void;
  onAdultsIncrement: () => void;
  onAdultsDecrement: () => void;
  onAdultsChange: (value: string) => void;
  onChildrenIncrement: () => void;
  onChildrenDecrement: () => void;
  onChildrenChange: (value: string) => void;
  onInfantIncrement: () => void;
  onInfantDecrement: () => void;
  onInfantChange: (value: string) => void;
  onFocIncrement: () => void;
  onFocDecrement: () => void;
  onFocChange: (value: string) => void;
}

export function AdditionalTransportCard({
  index,
  transport,
  onRemove,
  onTransportChange,
  onDriverChange,
  onBusIdChange,
  onGuideChange,
  onExtraGuideChange,
  onAdultsIncrement,
  onAdultsDecrement,
  onAdultsChange,
  onChildrenIncrement,
  onChildrenDecrement,
  onChildrenChange,
  onInfantIncrement,
  onInfantDecrement,
  onInfantChange,
  onFocIncrement,
  onFocDecrement,
  onFocChange,
}: AdditionalTransportCardProps) {
  return (
    <div className="mb-6">
      {/* Separator */}
      <div className="border border-dashed my-6 border-gray-300" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <Label className="">Transport {index + 2}</Label>
        <Button
          variant="link"
          size="sm"
          className="text-red-500"
          onClick={onRemove}
          type="button"
        >
          <Minus className="w-4 h-4" /> Remove
        </Button>
      </div>

      <TransportDetails
        transport={transport.transport || ""}
        driver={transport.driver || ""}
        busId={transport.busId || ""}
        onTransportChange={onTransportChange}
        onDriverChange={onDriverChange}
        onBusIdChange={onBusIdChange}
        showLabel={false}
      />

      {/* Passengers Details */}
      <div className="mb-3 mt-4">
        <Label className="mb-2">Passengers Details</Label>
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <PassengerCounter
              icon={Users}
              label="Adults"
              value={transport.adults || 0}
              onIncrement={onAdultsIncrement}
              onDecrement={onAdultsDecrement}
              onChange={onAdultsChange}
              maxWidth="w-12"
            />

            <PassengerCounter
              icon={Users}
              label="Children"
              value={transport.children || 0}
              onIncrement={onChildrenIncrement}
              onDecrement={onChildrenDecrement}
              onChange={onChildrenChange}
              maxWidth="w-12"
            />

            <PassengerCounter
              icon={Baby}
              label="Infant"
              value={transport.infant || 0}
              onIncrement={onInfantIncrement}
              onDecrement={onInfantDecrement}
              onChange={onInfantChange}
              maxWidth="w-12"
            />

            <PassengerCounter
              icon={Briefcase}
              label="FOC ( Free of charge )"
              value={transport.foc || 0}
              onIncrement={onFocIncrement}
              onDecrement={onFocDecrement}
              onChange={onFocChange}
              maxWidth="w-12"
            />
          </div>
        </div>
      </div>

      {/* Tourist Guide */}
      <div className="mb-6">
        <Label className="mb-2">Tourist Guide</Label>
        <div className="grid grid-cols-2 items-center gap-3">
          <SelectField
            icon={UserCircle2}
            value={transport.guide || ""}
            onValueChange={onGuideChange}
            options={GUIDE_OPTIONS}
            placeholder="Assign a guide"
          />
          <SelectField
            icon={UserCircle2}
            value={transport.extraGuide || ""}
            onValueChange={onExtraGuideChange}
            options={GUIDE_OPTIONS}
            placeholder="Add extra guide"
          />
        </div>
      </div>
    </div>
  );
}
