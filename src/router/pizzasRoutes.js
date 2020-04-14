import { Router } from 'express';
import multer from 'multer';

import pizzaThumbnails from '../config/pizzaThumbnails';
import PizzasController from '../controllers/PizzasController';
import authentication from '../middlewares/authentication';

const upload = multer(pizzaThumbnails);

const pizzasRoutes = Router();

pizzasRoutes.use(authentication);

pizzasRoutes.get('/', PizzasController.index);
pizzasRoutes.get('/new', PizzasController.neW);
pizzasRoutes.post('/', upload.any(), PizzasController.create);
// pizzasRoutes.get('/:id/edit', upload.any(), PizzasController.edit);
// pizzasRoutes.put('/:id', upload.any(), PizzasController.update);
pizzasRoutes.delete('/:id', PizzasController.destroy);

export default pizzasRoutes;
