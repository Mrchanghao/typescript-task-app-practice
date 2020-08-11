interface Animal {
  name: string;
}

class Cat implements Animal {
  name: string = 'cat';

  constructor(name: string) {
    this.name = name;
  }
}

class Dog implements Animal {
  name: string = 'Dog';

  constructor(name: string) {
    this.name = name;
  }
}

interface AnimalConstructor {
  new (name: string): Animal;
}

function initialzeAnimal(Animal: AnimalConstructor, name: string) {
  const animal = new Animal(name);
}
