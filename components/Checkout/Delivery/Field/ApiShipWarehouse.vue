<template>
  <CheckoutDeliveryFieldWarehouse
    :titleFormatter="warehouse => warehouse.name + ' (' + warehouse.address + ')'"
  />
</template>
