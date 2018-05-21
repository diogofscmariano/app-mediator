const register = (app) => {
  if (!window.appRegistry) {
    window.appRegistry = _registry();
  }

  window.appRegistry.register(app.id);
};

const findContainer = (id, selector) => {
  if (!window.appRegistry) {
    console.log('No app registry defined!');
    return;
  }

  return window.appRegistry.findContainer(id, selector);
};

const _registry = () => {
  const apps = [];

  return {
    register: (id) => {
      const app = apps.find((app) => app.id === id);

      app ? console.log(`App ${id} already registered!`) : apps.push({ id: id });
    },
    findContainer: (id, selector) => {
      const app = apps.find((app) => app.id === id);

      if (app) {
        const container = document.querySelector(app.id);
        return container.shadowRoot.querySelector(selector);
      } else {
        console.log(`App ${id} not registered!`);
      }
    },
    get apps() {
      return apps;
    }
  };
};

export { register, findContainer };
