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
     * @param {string} status
     */
    constructor(id,name, address, isLiked,age, breed,size,description,owner,image,status = "disponible"){
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
        this.status = status;
    }
    
    /**
   * Inicia el proceso de adopción si está disponible.
   * @returns {boolean} true si se inicia correctamente, false si ya estaba en proceso o adoptado.
   */
  iniciarAdopcion() {
    if (this.status !== "disponible") {
      return false;
    }
    this.status = "en proceso";
    return true;
  }

 
  completarAdopcion() {
    if (this.status === "en proceso") {
      this.status = "adoptado";
    }
  }

  cancelarAdopcion() {
    if (this.status === "en proceso") {
      this.status = "disponible";
    }
  }


  estaDisponible() {
    return this.status === "disponible";
  }
}
