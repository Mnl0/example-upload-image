import express from 'express'
import dotenv from 'dotenv'
import { fileTypeFromBuffer } from 'file-type'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
dotenv.config();

const app = express();
const port = process.env.PORT_SERVER;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw({ type: 'image/*', limit: '100mb' }))
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
	next();
});

app.use((err, req, res, next) => {
	if (err.status === 413) {
		err.message = `Request enviada a la ruta ${req.path} excedio el limite de tamano. Request no sera procesada. Maximo permitido: ${err.limit} bytes.`
		res.status(413).json({ message: `Request enviada a la ruta ${req.path} excedio el limite de tamano. Request no sera procesada.` })
	}
	next(err.message)
})

const contentTypesPermitidos = ['image/jpeg', 'image/png', 'image/gif']

async function validarImage(req, res, next) {
	let contentType = req.get('Content-Type');
	if (!contentTypesPermitidos.includes(contentType)) {
		console.warn(`Archivo de tipo ${contentType} no soportados. Usar uno de ${contentTypesPermitidos.join(", ")}`);
		res.status(415).json({ message: `Archivo de tipo ${contentType} no soportados. Usar uno de ${contentTypesPermitidos.join(", ")}` });
		return
	}
	let inforArchivo = await fileTypeFromBuffer(req.body);
	console.log(inforArchivo)
	if (!contentTypesPermitidos.includes(inforArchivo.mime)) {
		console.warn(`Disparidad entre content-type ${contentType} y tipo de archivo ${inforArchivo.ext}. Request no sera procesada.`);
		res.status(415).json({ message: `Archivo de tipo ${inforArchivo.mime} no soportados. Usar uno de ${contentTypesPermitidos.join(", ")}` });
		return
	}
	req.extensionArchivo = inforArchivo.ext;
	next()
}

app.get('/', (req, res) => {
	res.json({ message: 'Hola mundo' });
})

app.post('/', (req, res) => {
	const body = req.body;
	console.log(body)
	res.json({ success: true })
})

app.post('/image', validarImage, (req, res) => {
	const image = req.body;
	console.log(image)
	const dirStorageImg = path.join(__dirname, 'storage');

	if (!fs.existsSync(dirStorageImg)) {
		fs.mkdirSync(dirStorageImg);
	}
	const nombreArchivo = `${Date.now()}.${req.extensionArchivo}`;
	fs.writeFileSync(path.join(dirStorageImg, nombreArchivo), image);
	res.json({ success: true })
})

app.listen(port, () => {
	console.log(`servidor corriendo en puerto ${port}`)
})