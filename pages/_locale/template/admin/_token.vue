<script>
import AbstractCreator from '~/components/AbstractCreator';

export default {
  extends: AbstractCreator,
  meta: {
    apiEndpointBuilder: params => 'template/admin/' + params.token,
  },
}
</script>
