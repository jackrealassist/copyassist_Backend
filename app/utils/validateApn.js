module.exports = {
  validateApn: function (addressData, addressObj) {
    // validate whether the first hit has a matching apn value
    return addressData.alternate_apns.includes(addressObj.apn);
  },
};
