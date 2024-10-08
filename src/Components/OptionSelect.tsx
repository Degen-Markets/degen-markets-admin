import React, { useState, useEffect } from "react";
import { fetchOptions } from "../api";

interface OptionSelectProps {
  poolAddress: string;
  selectedOptionAddress: string;
  onChange: (optionAddress: string) => void;
  disabled?: boolean;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  poolAddress,
  selectedOptionAddress,
  onChange,
  disabled = false,
}) => {
  const { options, isLoading } = useOptions(poolAddress);
  return (
    <select
      value={selectedOptionAddress}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || isLoading || options.length === 0}
    >
      {isLoading ? (
        <option value="">Fetching Options...</option>
      ) : (
        <>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.address} value={option.address}>
              {option.title}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

const useOptions = (poolAddress: string) => {
  const [options, setOptions] = useState<{ address: string; title: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!poolAddress) {
        setOptions([]);
        setIsLoading(false);
        return;
      }

      try {
        const fetchedOptions = await fetchOptions(poolAddress);
        setOptions(
          fetchedOptions.map(({ address, title }) => ({ address, title })),
        );
      } catch (error) {
        console.error("Failed to load options:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [poolAddress]);

  return { options, isLoading };
};

export default OptionSelect;
