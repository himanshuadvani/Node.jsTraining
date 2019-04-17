const routes=require('express').Router();

const transaction=require('./controllers/transaction');

/**
 * @author: Himanshu Advani
 * Different routes to perform various operations
 * like add, update, view, delete student
 *  and its details.
 */

routes.get('/', transaction.findAll);

routes.get('/students', transaction.findAll);

routes.get('/students/:id', transaction.find);

routes.post('/students/', transaction.addStudent);

routes.put('/students/:id', transaction.updateStudent);

routes.delete('/students/:id', transaction.deleteStudent);

module.exports=routes;
