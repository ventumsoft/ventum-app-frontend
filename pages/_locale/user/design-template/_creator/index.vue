<script>
import AbstractCreator from '~/components/AbstractCreator';

export default {
  extends: AbstractCreator,
  meta: {
    apiEndpointBuilder: params => 'user/design-template/' + params.creator,
  },
}
</script>
