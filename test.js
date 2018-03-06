Object.extend = function(superClass, definition) {
  var subClass = function() {}
  // Our constructor becomes the 'subclass'
  if (definition.constructor !== Object) {
    subClass = definition.constructor
  }

  subClass.prototype = new superClass()

  for (var prop in definition) {
    if (prop != 'constructor') {
      subClass.prototype[prop] = definition[prop]
    }
  }

  return subClass
}

const Animal = function (name) {
  this.name = name
}

Animal.prototype.getName = function () {
  return this.name
}

const Cat = Object.extend(Animal, {
  constructor: function (name) {
    this.name = name
  },
  getReverseName: function () {
    return this.name
  }
})
