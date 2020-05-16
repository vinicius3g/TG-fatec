const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        // await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    // afterAll(async () => {
    //     await connection.destroy();
    // });


    it('should be able to create a new ONG', async () => {
        const res = await request(app)
            .post('/ongs')
            .send({
                name: "dogshow",
                email: "dogshow@gmail.com",
                whatsapp: "40313123",
                city: "BragançaPaulista",
                uf: "sp"
            });

        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toHaveLength(8);
    })
    it('should create a new session', async () => {
        const response = await request(app)
            .post('/api/ongs')
            .send({
                name: "dogshow",
                email: "dogshow@gmail.com",
                whatsapp: "40313123",
                city: "BragançaPaulista",
                uf: "sp"
            });
            
        const ong = response.body;

        const session = await request(app)
            .post('/api/sessions')
            .set('Authorization', ong.id)
            .send({ id: ong.id });
        expect(session.body).toHaveProperty('name');
        expect(session.body.name).toBe('APAD');
    });

    it('should not log in profile', async () => {
        await request(app)
            .get('/api/profile')
            .expect(400);
    });
})