import {Express} from 'express';
import healthController from './controllers/health.controller'
import hospitalController from './controllers/hospital.controller'

const routes = (app:Express):void => {
    app.use('/v1/health', healthController)
    app.use('/v1/hospital', hospitalController)
};

export default routes;