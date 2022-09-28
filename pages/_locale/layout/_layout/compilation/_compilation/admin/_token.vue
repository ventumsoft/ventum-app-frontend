<script>
import AbstractCreator from '~/components/AbstractCreator';

export default {
  extends: AbstractCreator,
  meta: {
    apiEndpointBuilder: params => 'layout/' + params.layout + '/compilation/' + params.compilation + '/admin/' + params.token,
  },
}
</script>
