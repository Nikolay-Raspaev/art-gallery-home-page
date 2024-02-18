import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { themeActions } from '../store/reducers/themeSlice';

const rootAction = {
    ...themeActions
};
export function useActions() {
    const dispatch = useDispatch();
    return bindActionCreators(rootAction, dispatch);
}
