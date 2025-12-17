import {
  UseFormSetValue,
  UseFormTrigger,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface UsePassengerCounterProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  watchedValues: Partial<T>;
}

export function usePassengerCounter<T extends FieldValues>({
  setValue,
  trigger,
  watchedValues,
}: UsePassengerCounterProps<T>) {
  const incrementCounter = (field: Path<T>) => {
    const currentValue = (watchedValues[field] as number) || 0;
    setValue(field, Math.min(currentValue + 1, 99) as PathValue<T, Path<T>>);
    trigger(field);
  };

  const decrementCounter = (field: Path<T>) => {
    const currentValue = (watchedValues[field] as number) || 0;
    setValue(field, Math.max(currentValue - 1, 0) as PathValue<T, Path<T>>);
    trigger(field);
  };

  const handleCounterChange = (field: Path<T>, value: string) => {
    const numValue = parseInt(value) || 0;
    setValue(
      field,
      Math.min(Math.max(numValue, 0), 99) as PathValue<T, Path<T>>
    );
    trigger(field);
  };

  return {
    incrementCounter,
    decrementCounter,
    handleCounterChange,
  };
}
