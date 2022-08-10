<template>
  <CheckoutDeliveryFieldCity
    :titleFormatter="city => city.Description || city.Present || ''"
  />
</template>
