<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto flex min-h-dvh max-w-6xl flex-col px-4">
	<header class="border-rule flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 py-5">
		<a href="/" class="text-lg font-bold tracking-tight">
			<span class="text-accent font-mono">&gt;</span> เทียบประกันสุขภาพไทย
		</a>
		<span class="label">ข้อมูลล้วน ๆ / ไม่ขายของ</span>
	</header>

	<main class="flex-1 py-8">
		{@render children()}
	</main>

	<footer class="border-rule text-muted mt-4 space-y-2 border-t-2 py-6 text-sm">
		<p>
			เว็บนี้ไม่ใช่นายหน้าประกันภัย ไม่มีลิงก์แนะนำ ไม่เก็บข้อมูลติดต่อ
			และไม่ให้คำแนะนำการลงทุนหรือการซื้อประกัน — เป็นการรวบรวมข้อเท็จจริงเพื่อให้เปรียบเทียบเอง
		</p>
		<p>
			ไม่ได้รับใบอนุญาตจากสำนักงาน คปภ. และไม่ได้ทำหน้าที่แทน คปภ. หรือบริษัทประกันใด ๆ
			ตัวเลขทุกตัวมีลิงก์ไปยังเอกสารต้นทาง กรุณาตรวจกับบริษัทก่อนตัดสินใจ
		</p>
		<p class="font-mono text-xs">
			MIT (code) · CC BY-SA 4.0 (data) ·
			<a class="text-accent underline underline-offset-2" href="/method">วิธีเก็บข้อมูล</a> ·
			<a class="text-accent underline underline-offset-2" href="/แก้ไขข้อมูล">แจ้งแก้ไขข้อมูล</a>
		</p>
	</footer>
</div>

<style>
	:global(a) {
		color: inherit;
	}
</style>
