import express from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';





/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard info
 */




const router = express.Router();

router.get('/dashboard', protect, authorize('admin'), (req, res) => {
    res.json({
        message: `Welcome to the admin dashboard, ${req.user.name}`
    });
});

export default router;
