import Ember from 'ember';

export default Ember.Object.extend({
 greet: function(){
  return `Hi, My name is ${this.get("firstName")} ${this.get("lastName")}. You can call me ${this.get("nickName")}`;
 },
 addConference: function(conf){
  this.conferences.push(conf);
  return this.conferences;
 },
 isOld: Ember.computed("age", function(){
    if (this.age > 30) {
      return true;
  } else {
      return false;
  }
 }), 
 wroteRuby: Ember.computed("authorOf", function(){
    if (this.authorOf === "Ruby"){
      return true;
    } else {
      return false;
    }
 }), 
 keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
  var conferences = this.get('conferences');
  var fullName = `${this.get("firstName")} ${this.get("lastName")}`;
  return conferences.filterBy('keyNote', fullName);
 }),
 conferenceNames: Ember.computed("conferences", function() {
  var empty_array = [];
  var array = this.conferences;
    for (var i = 0; i < array.length; i++) {
        empty_array.push(array[i].name);
    }
    return empty_array;
 }), 
 conferenceTotal: Ember.computed("conferences", function() {
  return this.conferences.length;
 }), 
 itinerary: Ember.computed("conferenceTotal", function() {
  var conferenceTotal = this.get("conferenceTotal");
  return `${this.nickName} is speaking at ${conferenceTotal} conferences`;
 }), 
 hasValidEmail: Ember.computed('email', function() {
  var email = this.get('email');
  var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return regex.test(email);
 }), 
errors: Ember.computed('firstName', 'lastName', 'age', 'email', function(){
    var errors = [];
    if(!this.get('firstName')){
      errors.push("firstName cannot be blank");
    }
    if(!this.get('lastName')){
      errors.push("lastName cannot be blank");
    }
    if(!this.get('age')){
      errors.push("age cannot be blank");
    }
    if(!this.get('hasValidEmail')){
      errors.push("email must be valid");
    }
    return errors;
  }),
  isInvalid: Ember.computed('errors', function(){
    if(this.get('errors').length === 0) {
      return false;
    } else {
      return true;
    }
  }),
  hasErrors: Ember.computed('errors', function(){
    if(this.get('errors').length === 0){
      return false;
    } else {
      return true;
    }
  }),
  isValid: Ember.computed('isInvalid', function(){
    return !this.get('isInvalid');
  })
});
