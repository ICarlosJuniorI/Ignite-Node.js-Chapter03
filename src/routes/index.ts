import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

//Com o /categories não precisa ficar passando sempre nas rotas
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

export { router };