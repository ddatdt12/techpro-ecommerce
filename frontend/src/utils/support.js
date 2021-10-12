export const isShippingInfoFull = (shippingInfo) => {
  const { phoneNumber, shippingAddress } = shippingInfo;
  return (
    phoneNumber &&
    shippingAddress &&
    shippingAddress.address &&
    shippingAddress.city &&
    shippingAddress.district
  );
};
