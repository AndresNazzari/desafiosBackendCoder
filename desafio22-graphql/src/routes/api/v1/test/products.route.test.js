import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect, should } from 'chai';
import supertest from 'supertest';
chai.use(chaiHttp);

describe('Products Route Test', () => {
    const url = 'http://localhost:3000';
    let idGenerated = '';
    let idGenerated2 = '';

    describe('POST /api/v1/products/', () => {
        it('Should POST an product and status code 200 ', (done) => {
            supertest(url)
                .post('/api/v1/products')
                .send({
                    title: 'dfdffd',
                    description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
                    price: 1099,
                    discountPercentage: 11.83,
                    rating: 4.54,
                    stock: 96,
                    brand: 'Infinix',
                    category: 'laptops',
                    thumbnail: 'https://dummyjson.com/image/i/products/9/thumbnail.jpg',
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    idGenerated = res.body.product._id;
                    done();
                });
        });

        it('Should POST an product and get msg OK and product object', (done) => {
            supertest(url)
                .post('/api/v1/products')
                .send({
                    title: 'dfdffd',
                    description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty',
                    price: 1099,
                    discountPercentage: 11.83,
                    rating: 4.54,
                    stock: 96,
                    brand: 'Infinix',
                    category: 'laptops',
                    thumbnail: 'https://dummyjson.com/image/i/products/9/thumbnail.jpg',
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('msg').to.be.equal('producto agregado');
                    expect(res.body.product).to.be.an('object');
                    idGenerated2 = res.body.product._id;
                    done();
                });
        });
    });

    describe('GET /api/v1/products', () => {
        it('Should GET an status code 200 ', (done) => {
            supertest(url)
                .get('/api/v1/products')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('Should GET an array', (done) => {
            supertest(url)
                .get('/api/v1/products')
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /api/v1/products/:id', () => {
        it('Should GET an status code 200 ', (done) => {
            supertest(url)
                .get(`/api/v1/products/${idGenerated}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it(`Should GET an Object`, (done) => {
            supertest(url)
                .get(`/api/v1/products/${idGenerated}`)
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id').to.be.equal(idGenerated);
                    done();
                });
        });
    });

    describe('DELETE /api/v1/products/:id', () => {
        it('Should DELETE an status code 200 ', (done) => {
            supertest(url)
                .del(`/api/v1/products/${idGenerated}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it(`Should DELETE an return Object deleted with the id`, (done) => {
            supertest(url)
                .del(`/api/v1/products/${idGenerated2}`)
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('msg').to.be.equal('products eliminado');
                    expect(res.body).to.have.property('product').to.be.an('object');
                    expect(res.body).to.have.property('product').to.have.property('_id').to.be.equal(idGenerated2);
                    done();
                });
        });
    });
});
