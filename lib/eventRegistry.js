const subscribe = (type, callback) => {
  if (!window.eventRegistry) {
    window.eventRegistry = _eventsRegistry();
  }

  window.eventRegistry.subscribe(type, callback);
};

const dispatch = (type) => {
  if (!window.eventRegistry) {
    console.log('No event registry defined!');
    return;
  }

  window.eventRegistry.dispatch(type);
};

const _eventsRegistry = () => {
  const events = [];

  return {
    subscribe: (type, callback) => {
      const event = events.find((event) => event.type === type);

      event
        ? event.callbacks.push(callback)
        : events.push({ type: type, callbacks: [ callback ] });
    },
    dispatch: (type) => {
      const event = events.find((event) => event.type === type);

      event
        ? event.callbacks.forEach((callback) => callback())
        : console.error(`No subscribers for event ${type}`);
    },
    get events() {
      return events;
    }
  };
};

export { subscribe, dispatch };
