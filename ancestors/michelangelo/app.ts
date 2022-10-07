import 'dotenv/config';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import ExpressError from './utilities/expressError';
import mainRoutes from './utilities/routes/mainRoutes';
import apiRoutes from './utilities/routes/apiRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);
app.use('/api/', apiRoutes);

app.all('*', (_: Request, __: Response, next: NextFunction) => {
  next(new ExpressError('Page not found', 404));
});

app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  if (!err.message) err.message = 'Something went wrong';
  if (!err.status) err.status = 500;
  res.status(err.status).send(err.message);
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
