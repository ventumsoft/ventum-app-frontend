<script>
import AbstractCreator from '~/components/AbstractCreator';

export default {
  extends: AbstractCreator,
  meta: {
    apiEndpointBuilder: params => 'products/creator/' + params.creator,
  },
}
</script>
