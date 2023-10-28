module.exports = {
  validateAddress: function (addressData, addressObj) {
    // Validate that the first hit closely matches the address passed from the client
    let isAddressMatched = null;
    if (
      addressData.city_name === addressObj.city &&
      addressData.state_code === addressObj.state &&
      addressData.zip_code === addressObj.zipcode
    ) {
      // The valuation is most likely to be a correct match to the address delivered from the client side
      // The data for the address has also already been cached
      // This increases the confidence in the valuation shown for an address
      isAddressMatched = true;
    } else {
      // The valuation returned is unlikely to be the correct match for the address delivered from the client-side
      // The the correct address could be present in the hits array, however, it is not the first hit
      // You may decide to have the user choose the correct address from the array of hits as a possible solution
      isAddressMatched = false;
    }
    return isAddressMatched;
  },
};
