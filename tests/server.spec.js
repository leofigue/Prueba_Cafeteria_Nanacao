const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it('Consultar todos los cafes', async ()=>{
        const respuesta = await request(server)
        .get('/cafes')
        .send();
        expect(respuesta.statusCode).toBe(200);
        //expect(respuesta.body).toBeInstanceOf(Array);
        //expect(respuesta.body).not.toHaveLength(0);
        expect(Array.isArray(respuesta.body)).toBe(true);
        expect(respuesta.body.length).toBeGreaterThan(0)
    });

    it('Eliminar ID que no existe', async ()=>{
        const jwt = "token";
        const idCafeAEliminar = 5
        const respuesta = await request(server)
        .delete(`/cafes/${idCafeAEliminar}`)
        .set("Authorization", jwt)
        .send();

        expect(respuesta.statusCode).toBe(404);

    });

    it('Agregar un producto', async ()=>{
        const id = 5;
        const producto = {id, nombre:'nuevo producto'};
        const respuesta = await request(server)
        .post('/cafes/')
        .send(producto);

        expect(respuesta.statusCode).toBe(201);
    });

    it('Actualizar un producto con id diferentes', async ()=>{
        const idCafeParametro = 4
        const id = 3;
        const producto = {id, nombre:'Mocacino'};
        const respuesta = await request(server)
        .put(`/cafes/${idCafeParametro}`)
        .send(producto);

        expect(respuesta.statusCode).toBe(400);
    });

});
