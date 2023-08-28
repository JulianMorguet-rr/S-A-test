import express from 'express';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);


const PORT = 8000; // Neuer Port, z.B. 4000, 5000, etc.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});