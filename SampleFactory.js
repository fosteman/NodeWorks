 function createImage(name) {
     if(name.match(/\.jpeg$/)) {
       return new JpegImage(name);
     } else if(name.match(/\.gif$/)) {
       return new GifImage(name);
     } else if(name.match(/\.png$/)) {
       return new PngImage(name);
     } else {
       throw new Error('Unsupported format');
     }
}
//factory also allows us to not expose the constructors of the objects it creates, and prevents them from being extended or modified

//encapsulation\information hiding
function createPerson(name) {
     const privateProperties = {};
     const person = {
       setName: name => {
         if(!name) throw new Error('A person must have a name');
         privateProperties.name = name;
       },
       getName: () =>  privateProperties.name;
   };
     person.setName(name);
     return person;
   }