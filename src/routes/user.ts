import { Router } from 'express';
import { create, deleteById, getAll, getById, updateById } from '../controller/user';

const router = Router()

router.get('/',getAll)
router.get('/:id',getById)
router.post('/',create)
router.patch('/:id',updateById)
router.delete('/:id',deleteById)

export default router