export default class PetModel{
    /**
     * 
     * @param {number} id
     * @param {string} name 
     * @param {string} address 
     * @param {boolean} isLiked
     * @param {number} age 
     * @param {string} breed 
     * @param {string} size 
     * @param {string} description 
     * @param {string} owner 
     * @param {string} image
     */
    constructor(id,name, address, isLiked,age, breed,size,description,owner,image){
        this.id = id;
        this.name = name;
        this.address = address;
        this.isLiked = isLiked;
        this.age = age;
        this.breed = breed;
        this.size = size;
        this.description = description;
        this.owner = owner;
        this.image = image;
    }
}