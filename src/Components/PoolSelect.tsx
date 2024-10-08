import React, { useState, useEffect } from "react";
import { fetchPools, Pool } from "../api";

interface PoolSelectProps {
  selectedPoolAddress: string;
  onChange: (poolAddress: string) => void;
  disabled?: boolean;
  filter?: (pool: Pool) => boolean;
}

const PoolSelect: React.FC<PoolSelectProps> = ({
  selectedPoolAddress,
  onChange,
  disabled = false,
  filter: filterFn = () => true, // allow all pools by default
}) => {
  const [pools, setPools] = useState<{ address: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPools = async () => {
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
  };

  useEffect(() => {
    loadPools();
  }, []);

  return (
    <select
      value={selectedPoolAddress}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <option value="">Fetching Pools...</option>
      ) : (
        <>
          <option value="">Select a pool</option>
          {pools.map((pool) => (
            <option key={pool.address} value={pool.address}>
              {pool.title}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default PoolSelect;
