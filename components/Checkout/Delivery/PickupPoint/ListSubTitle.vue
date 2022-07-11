<template>
  <fragment>
    <p class="nobottommargin">{{ deliveryMethod.pickupPoint.address }}</p>
    <p>
      <a href="#" role="button" @click.prevent="showingModal = true">
        {{ $trans('checkout.delivery_step.pickup_point.open_map') }}
      </a>
    </p>
    <BsModal
      v-if="showingModal"
      class="fade"
      @opened="showModalMap"
      @closed="showingModal = false"
    >
      <template v-slot:title>
        {{ deliveryMethod.pickupPoint.mapAddress }}
      </template>
      <template v-slot:body>
        <script ref="mapMarkerContentTemplate" type="text/template">
          <div id="content">
            <div id="bodyContent">
              <p>
                <b>{{ deliveryMethod.name }}</b>
                <br>
                {{ deliveryMethod.description }}
                <br>
                {{ deliveryMethod.pickupPoint.mapAddress }}
              </p>
            </div>
          </div>
        </script>
        <div ref="mapContainer" style="width: 100%; height: 400px;"></div>
      </template>
    </BsModal>
  </fragment>
</template>

<script>
export default {
  props: [
    'deliveryMethod'
  ],
  data: () => ({
    showingModal: false,
  }),
  methods: {
    showModalMap() {
      const map = new google.maps.Map(this.$refs.mapContainer, {
        center: new google.maps.LatLng(
          this.deliveryMethod.pickupPoint.mapLocation?.lat,
          this.deliveryMethod.pickupPoint.mapLocation?.lng,
        ),
        zoom: 17,
        mapTypeControl: false,
      });

      const infowindow = new google.maps.InfoWindow({
        content: this.$refs.mapMarkerContentTemplate.innerHTML,
      });

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        title: this.deliveryMethod.name,
      });

      marker.setMap(map);

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(map, 'idle', function () {
        google.maps.event.trigger(map, 'resize');
      });
    },
  },
}
</script>
