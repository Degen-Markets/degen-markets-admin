import React, { useState, useEffect, useCallback } from "react";
import { fetchPools, Pool } from "../api";

interface PoolSelectProps {
  selectedPoolAddress: string;
  onChange: (poolAddress: string) => void;
  disabled?: boolean;
  filter?: (pool: Pool) => boolean;
}

const defaultFilterFn = () => true; // needs to be outside the component to avoid re-renders

const PoolSelect: React.FC<PoolSelectProps> = ({
  selectedPoolAddress,
  onChange,
  disabled = false,
  filter: filterFn = defaultFilterFn, // allow all pools by default
}) => {
  const [pools, setPools] = useState<{ address: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPools = useCallback(async () => {
    setIsLoading(true);
    try {
      const allPools = await fetchPools();
      const filteredPools = allPools.filter(filterFn);
      setPools(filteredPools.map(({ address, title }) => ({ address, title })));
    } catch (error) {
      console.error("Failed to load pools:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterFn]);

  useEffect(() => {
    loadPools();
  }, [loadPools]);

  return (
    <select
      value={selectedPoolAddress}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || isLoading}
      className="block w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-200 disabled:text-gray-500 cursor-pointer"
    >
      {isLoading ? (
        <option value="">Fetching Pools...</option>
      ) : (
        <>
          <option value="">Select a pool</option>
          {pools.map((pool) => (
            <option
              key={pool.address}
              value={pool.address}
              className="text-black bg-white hover:bg-purple-100 focus:bg-purple-100"
            >
              {pool.title}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default PoolSelect;
