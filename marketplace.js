import React, { useState, useEffect } from 'react';
import NFTCard from './NFTCard';
import { getNFTsForSale } from '../utils/web3';

function Marketplace() {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const nfts = await getNFTsForSale();
      setNFTs(nfts);
    }
    fetchData();
  }, []);

  return (
    <div className="nft-list">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}

export default Marketplace;
