import { validationResult } from 'express-validator';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import Hospital from '../models/hospital';
import { ErrorHandler, handleError } from '../error';
import bodyHospitalValidations from '../middlewares/hospital/hospital.validator';
import validationHandler from '../middlewares/validator';

const router = Router();

router.post('/', bodyHospitalValidations, validationHandler, async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        let hospital = await Hospital.findOne({ name });
        if (hospital) {
            const custom = new ErrorHandler(400, 'Hospítal already exist');
            handleError(custom, req, res);
        }

        hospital = new Hospital({
            name
        });

        await hospital.save();

        const payload = {
            hospital: {
                id: hospital.id,
            },
        }

        jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                data: { token },
                msj: 'Hospital Created'
            })
        });
    }
    catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res)
    }
})

export default router;