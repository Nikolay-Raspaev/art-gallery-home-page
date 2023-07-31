import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OptionActionCreators from '../store/asyncAction/authors';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(OptionActionCreators, dispatch);
};
