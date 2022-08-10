<template>
  <CheckoutDeliveryFieldStreet
    :titleFormatter="street => street.StreetsType + ' ' + street.Description"
  />
</template>
