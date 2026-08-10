import { anyId } from 'promptparse/generate';
import QRCode from 'qrcode';

// ponytail: one fixed PromptPay number, no admin UI to change it — edit the string below if it changes.
const PROMPTPAY_PHONE = '0931313323';

export async function load() {
	const payload = anyId({ type: 'MSISDN', target: PROMPTPAY_PHONE });
	const qr = await QRCode.toString(payload, { type: 'svg', margin: 1, width: 240 });
	return { qr };
}
