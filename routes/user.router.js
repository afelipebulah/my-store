const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const {  createUserSchema, updatePartialUserSchema, updateUserSchema, getUserSchema, getListUserSchema, generateUserSchema } = require('../schemas/user.schema');
const UserService = require('../services/user.services');

const service = new UserService();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "route": "/users",
    "version": "v0.0.1"
  });
});

router.get('/generate',
  validatorHandler(generateUserSchema, 'query'),
  async (req, res) => {
    const { size } = req.query;
    const users = await service.generate(size);
    res.status(200).json(users);
  });

router.get('/list',
  validatorHandler(getListUserSchema, 'query'),
  async (req, res, next) => {
    const { size } = req.query;
    try {
      const users = await service.getListUsers(size);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    } 
  });

router.get('/search/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await service.searchUser(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newuser = await service.createUser(body);
      res.status(201).json({
        message: `usuario creado`,
        data: newuser
      });
    } catch (error) {
      next(error);
    }
  })

router.patch('/update/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updatePartialUserSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const userUpdated = await service.updateUser(body, id);
      res.json({
        id,
        message: 'usuario actualizado',
        data: userUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.put('/update/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const userUpdated = await service.updateUser(body, id);
      res.json({
        id,
        message: 'usuario actualizado',
        data: userUpdated
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/delete/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const userDeleted = await service.searchUser(id);
      await service.deleteUser(id);
      res.status(200).json({
        message: 'usuario eliminado',
        data: userDeleted
      });
    } catch (error) {
      next(error);
    }
  })

module.exports = router;