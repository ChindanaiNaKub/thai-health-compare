import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

const origin = 'https://thai-health-compare.pages.dev';
const pages = ['/', '/method', '/สถานะข้อมูล', '/แก้ไขข้อมูล', '/บริจาค'];

export const GET: RequestHandler = () => {
	const urls = pages.map((path) => `<url><loc>${origin}${path === '/' ? '/' : encodeURI(path)}</loc></url>`).join('');
	return text(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
