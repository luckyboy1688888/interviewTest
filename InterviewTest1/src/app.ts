import express, { Request, Response, NextFunction } from 'express';
import {example1, example2} from "./utiles/prepareData";
import {fillMissingMetrics} from "./utiles/util";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.get('/search_N_days_data_ex1', (req: Request, res: Response) => {
    let days = req.body.days;
    let final_obj = fillMissingMetrics(example1, days);
    res.json(final_obj);
});

app.get('/search_N_days_data_ex2', (req: Request, res: Response) => {
    let days = req.body.days;
    let final_obj = fillMissingMetrics(example2, days);
    res.json(final_obj);
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop`);
});