import React from "react";
import { FieldError } from "react-hook-form";
import { Bus, UserCircle2, Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SelectField } from "./SelectField";
import {
  TRANSPORT_OPTIONS,
  DRIVER_OPTIONS,
  BUS_ID_OPTIONS,
} from "@/constants/FormOptions";

interface TransportDetailsProps {
  transport: string;
  driver: string;
  busId: string;
  onTransportChange: (value: string) => void;
  onDriverChange: (value: string) => void;
  onBusIdChange: (value: string) => void;
  transportError?: FieldError;
  driverError?: FieldError;
  busIdError?: FieldError;
  showLabel?: boolean;
}

export function TransportDetails({
  transport,
  driver,
  busId,
  onTransportChange,
  onDriverChange,
  onBusIdChange,
  transportError,
  driverError,
  busIdError,
  showLabel = true,
}: TransportDetailsProps) {
  return (
    <div className="mb-6">
      {showLabel && <Label className="mb-2">Transport Details</Label>}

      <SelectField
        icon={Bus}
        value={transport}
        onValueChange={onTransportChange}
        options={TRANSPORT_OPTIONS}
        placeholder="Select a transport"
        error={transportError}
        className="mb-3"
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectField
          icon={UserCircle2}
          value={driver}
          onValueChange={onDriverChange}
          options={DRIVER_OPTIONS}
          placeholder="Assign driver"
          error={driverError}
        />

        <SelectField
          icon={Briefcase}
          value={busId}
          onValueChange={onBusIdChange}
          options={BUS_ID_OPTIONS}
          placeholder="Bus ID"
          error={busIdError}
        />
      </div>
    </div>
  );
}
