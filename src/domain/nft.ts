enum NFTType{
    Ethereum,
    IMX,
    Solana,
    Loopring,
}
type NFT ={
    title:string,
    description:string,
    imageURL:string,
    collecctionAddress:string,
    tokenAddress:string,
    nftType:NFTType
}

export type  { NFT } 
export {NFTType}