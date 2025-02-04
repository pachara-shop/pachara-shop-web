import EventEmitter from 'events';

const loadingEmitter = new EventEmitter();

const setLoading = (isLoading: boolean) => {
  loadingEmitter.emit('loading', isLoading);
};

const onLoadingChange = (callback: (isLoading: boolean) => void) => {
  loadingEmitter.on('loading', callback);
};

const removeLoadingChangeListener = (
  callback: (isLoading: boolean) => void
) => {
  loadingEmitter.removeListener('loading', callback);
};

export { setLoading, onLoadingChange, removeLoadingChangeListener };
