const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const default_size = 5;
const default_delay = 1;
const max_size = 100;

class ProductsService {

    constructor(){
        this.products = [];        
    }

    async generate(size){
        let limit = size || default_size;
        if(size > max_size) limit = max_size;
      
        this.products = [];
      
        for (let i = 1; i <= limit; i++) {
          this.products.push({
            id : +i,
            nombre : faker.commerce.productName(),
            precio : faker.commerce.price(100, 999, 0),
            imagen : faker.image.imageUrl()
          });
        }

        return this.products;
    }

    async getListProducts(){
        return this.products;
    }

    async searchProduct(id){
        const index = this.products.findIndex( (product) => product.id == id );
        if (index === -1){
            throw boom.notFound('producto no encontrado');
        }
        return this.products[index];
    }

    async createProduct(body){
        const id = body.id;
        const index = this.products.findIndex( (product) => product.id == id );
        if (index !== -1){
            throw boom.conflict('producto ya existe');
        }
        const newProduct = body;
        this.products.push(newProduct);

        return newProduct;
    }

    async updatePartialProduct(body,id){
        const index = this.products.findIndex( (product) => product.id == id );
        if (index === -1){
            throw boom.notFound('producto no encontrado');
        }
        if(body.nombre) this.products[index].nombre = body.nombre;
        if(body.precio) this.products[index].precio = body.precio;
        if(body.imagen) this.products[index].imagen = body.imagen;

        return this.products[index];
    }

    async updateProduct(body,id){
        const index = this.products.findIndex( (product) => product.id == id );
        if (index === -1){
            throw boom.notFound('producto no encontrado');
        }
        this.products[index].nombre = body.nombre;
        this.products[index].precio = body.precio;
        this.products[index].imagen = body.imagen;

        return this.products[index];
    }

    async deleteProduct(id){
        const index = this.products.findIndex( (product) => product.id == id );
        if (index === -1){
            throw boom.notFound('producto no encontrado');
        }
        this.products.splice(index,1);
        return { id };
    }
    
}

module.exports = ProductsService;