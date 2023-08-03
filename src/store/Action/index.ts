import * as AuthorActionCreators from './author';
import * as PaintingActionCreators from './painting';
import * as LocationActionCreators from './location';
import * as ThemeActionCreators from './theme';

const ActionCreators = {
  ...AuthorActionCreators,
  ...PaintingActionCreators,
  ...LocationActionCreators,
  ...ThemeActionCreators
};

// Export the combined object
export default ActionCreators;
