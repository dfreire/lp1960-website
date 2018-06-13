const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');
import Document from './src/Document';

const config = dotenv.config().parsed;
const {
	SITE_ROOT,
	DK_SERVER
} = config;
const CONTENT_DIR = path.join(process.cwd(), '..', 'lp1960-diskette-data', 'content');

const root = require(path.join(CONTENT_DIR, 'index.json'));
const introPage = require(path.join(CONTENT_DIR, '0-intro', 'index.json'));
const imagesPage = require(path.join(CONTENT_DIR, '1-imagens', 'index.json'));
const projectsPage = require(path.join(CONTENT_DIR, '2-projectos', 'index.json'));
const contactPage = require(path.join(CONTENT_DIR, '3-contacto', 'index.json'));

function listDirs(location) {
	const dir = path.join(location);

	const list = [];

	fs.readdirSync(dir).forEach(subDir => {
		fs.statSync(path.join(dir, subDir)).isDirectory() && list.push(subDir);
	});

	list.sort((a, b) => {
		const a1 = parseInt(a.split('-')[0]);
		const b1 = parseInt(b.split('-')[0]);
		return a1 - b1;
	});

	return list;
}

const imageList = listDirs(path.join(CONTENT_DIR, '1-imagens')).map(dir => {
	const image = require(path.join(CONTENT_DIR, '1-imagens', dir, 'index.json'));
	image.baseUrl = `${DK_SERVER}/api/files/1-imagens/` + dir;
	return image;
});

const projectList = listDirs(path.join(CONTENT_DIR, '2-projectos')).map(dir => {
	const image = require(path.join(CONTENT_DIR, '2-projectos', dir, 'index.json'));
	image.baseUrl = `${DK_SERVER}/api/files/2-projectos/` + dir;
	return image;
});

export default {
	siteRoot: SITE_ROOT,

	Document,

	getSiteData: async () => {
		const links = [{
				to: '/intro',
				name: introPage.fields.title,
			},
			{
				to: '/imagens',
				name: imagesPage.fields.title,
			},
			{
				to: '/projectos',
				name: projectsPage.fields.title,
			},
			{
				to: '/contacto',
				name: contactPage.fields.title,
			},
		];

		return {
			links,
			title: root.fields.title,
		}
	},
	getRoutes: async () => {
		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
			}, {
				path: '/intro',
				component: 'src/pages/Intro.jsx',
				getData: () => ({
					...introPage.fields,
				}),
			},
			{
				path: '/imagens',
				component: 'src/pages/Images.jsx',
				getData: () => {
					const images = imageList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/imagens/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
						}));
					return {
						images,
					}
				},
				children: imageList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image1.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			},
			{
				path: '/projectos',
				component: 'src/pages/Images.jsx',
				getData: () => {
					const images = projectList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/projectos/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
							legend: item.fields.title,
						}));
					return {
						images,
					}
				},
				children: projectList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image1.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			}, {
				path: '/contacto',
				component: 'src/pages/Contacto.jsx',
				getData: () => ({
					...contactPage.fields,
				}),
			}, {
				is404: true,
				component: 'src/pages/404.jsx',
			},
		]
	},
}