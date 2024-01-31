const request = require('supertest');
const app = require('../index');
require('dotenv').config();

describe('POST /v1/create_intent', () => {
  it('should create a payment intent', async () => {
    const response = await request(app)
      .post('/v1/create_intent')
      .send({
        amount: 1000,
        currency: 'inr',
        description: 'Test Payment Intent',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientSecret');
  });

  it('should handle errors while creating a payment intent', async () => {
    const response = await request(app)
      .post('/v1/create_intent')
      .send({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});

describe('POST /v1/capture_intent/:id', () => {
  it('should capture a payment intent', async () => {
    const validPaymentIntentId = 'pi_3Od9EpSDFbeIRnXw0QI9IccW';

    const response = await request(app)
      .post(`/v1/capture_intent/${validPaymentIntentId}`);

    expect(response.status).toBe(200);
  });

  it('should handle errors while capturing a payment intent', async () => {
    const response = await request(app)
      .post('/v1/capture_intent/invalid_id');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});

describe('POST /create_refund/:id', () => {
  it('should create a refund for a payment intent', async () => {
    const validPaymentIntentId = 'pi_3Od9EpSDFbeIRnXw0QI9IccW';

    const response = await request(app)
      .post(`/create_refund/${validPaymentIntentId}`)
      .send({
        amount: 500,
        reason: 'Test Refund',
      });

    expect(response.status).toBe(200);
  });

  it('should handle errors while creating a refund', async () => {
    const response = await request(app)
      .post('/create_refund/invalid_id')
      .send({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /v1/get_intents', () => {
  it('should get a list of payment intents', async () => {
    const response = await request(app)
      .get('/v1/get_intents');

    expect(response.status).toBe(200);
  });

  it('should handle errors while fetching payment intents', async () => {
    const response = await request(app)
      .get('/v1/get_intents');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});

