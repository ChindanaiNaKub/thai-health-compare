<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto flex min-h-dvh max-w-5xl flex-col px-4">
	<header class="border-border flex items-baseline gap-3 border-b py-5">
		<a href="/" class="text-lg font-semibold">เทียบประกันสุขภาพไทย</a>
		<span class="text-muted text-sm">ข้อมูลล้วน ๆ ไม่ขายของ</span>
	</header>

	<main class="flex-1 py-8">
		{@render children()}
	</main>

	<footer class="border-border text-muted space-y-2 border-t py-6 text-sm">
		<p>
			เว็บนี้ไม่ใช่นายหน้าประกันภัย ไม่มีลิงก์แนะนำ ไม่เก็บข้อมูลติดต่อ
			และไม่ให้คำแนะนำการลงทุนหรือการซื้อประกัน — เป็นการรวบรวมข้อเท็จจริงเพื่อให้เปรียบเทียบเอง
		</p>
		<p>
			ไม่ได้รับใบอนุญาตจากสำนักงาน คปภ. และไม่ได้ทำหน้าที่แทน คปภ. หรือบริษัทประกันใด ๆ
			ตัวเลขทุกตัวมีลิงก์ไปยังเอกสารต้นทาง กรุณาตรวจกับบริษัทก่อนตัดสินใจ
		</p>
		<p>
			โค้ดเผยแพร่ภายใต้ MIT · ข้อมูลและคำอธิบายภายใต้ CC BY-SA 4.0 ·
			<a class="text-accent underline" href="/method">วิธีเก็บข้อมูล</a> ·
			<a class="text-accent underline" href="/แก้ไขข้อมูล">แจ้งแก้ไขข้อมูล</a>
		</p>
	</footer>
</div>

<style>
	:global(a) {
		color: inherit;
	}
</style>
