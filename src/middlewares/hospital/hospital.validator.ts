import {body} from 'express-validator'

const validations = [
    body('name').exists().withMessage('Password is required'),
    body('name').if(body('name').exists()).isLength({min:3}).withMessage('Name should have 3 letters at least'),
];

export default validations;