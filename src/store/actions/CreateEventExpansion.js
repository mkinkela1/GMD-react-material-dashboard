import { CREATE_EVENT_EXPANSION } from '../../constants/ExpansionContants';

const toggle = (isVisible) => ({
  type: CREATE_EVENT_EXPANSION,
  isVisible
});

export default toggle;
