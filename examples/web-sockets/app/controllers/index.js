import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  messaging: service(),

  init() {
    this._super(...arguments);
    this.set('messages', []);

    this.get('messaging').on('received', (data) => this.get('messages').pushObject(data));
  },

  actions: {
    setText(text) {
      this.set('text', text);
    },

    send(e) {
      e.preventDefault();

      let text = this.get('text');
      this.get('messaging').send(text);
      this.set('text', null);
    }
  }
});