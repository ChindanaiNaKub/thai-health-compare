<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content="เทียบประกันสุขภาพไทย" />
	<meta property="og:locale" content="th_TH" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://thai-health-compare.pages.dev/og-image.svg" />
	<meta property="og:image:type" content="image/svg+xml" />
	<meta property="og:image:alt" content="เทียบประกันสุขภาพไทยจากข้อมูลที่อ้างอิงได้" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:image" content="https://thai-health-compare.pages.dev/og-image.svg" />
</svelte:head>

<div class="mx-auto flex min-h-dvh max-w-7xl flex-col px-4">
	<header class="border-rule flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 py-5">
		<a href="/" class="text-lg font-bold tracking-tight">
			<span class="text-accent font-mono">&gt;</span> เทียบประกันสุขภาพไทย
		</a>
		<nav class="text-muted flex flex-wrap gap-x-4 gap-y-1 text-sm">
			<a class="nav" href="/method">วิธีเก็บข้อมูล</a>
			<a class="nav" href="/สถานะข้อมูล">สถานะข้อมูลที่กำลังตรวจ</a>
			<a class="nav" href="/แก้ไขข้อมูล">แจ้งแก้ไขข้อมูล</a>
			<a class="nav" href="/บริจาค">สนับสนุนเว็บนี้</a>
		</nav>
	</header>

	<main class="flex-1 py-8">
		{@render children()}
	</main>

	<footer class="border-rule text-muted mt-4 space-y-2 border-t-2 py-6 text-sm">
		<p>
			เว็บนี้ไม่ใช่นายหน้าประกันภัย ไม่มีลิงก์แนะนำ ไม่เก็บข้อมูลติดต่อ
			ไม่ได้รับค่าคอมมิชชันหรือผลประโยชน์จากบริษัทประกันภัย และไม่ให้คำแนะนำการลงทุนหรือการซื้อประกัน
			จัดทำขึ้นเพื่อการศึกษา รวบรวมข้อเท็จจริงเพื่อให้คุณเปรียบเทียบได้ด้วยตัวเอง
		</p>
		<p>
			ไม่ได้รับใบอนุญาตจากสำนักงาน คปภ. และไม่ได้ทำหน้าที่แทน คปภ. หรือบริษัทประกันใด ๆ
			ตัวเลขทุกตัวมีลิงก์ไปยังเอกสารต้นทาง โปรดตรวจสอบกับบริษัทก่อนตัดสินใจ
		</p>
		<p class="font-mono text-xs">
			MIT (code) · CC BY-SA 4.0 (data) ·
			<a class="text-accent underline underline-offset-2" href="/method">วิธีเก็บข้อมูล</a> ·
			<a class="text-accent underline underline-offset-2" href="/สถานะข้อมูล">สถานะข้อมูลที่กำลังตรวจ</a> ·
			<a class="text-accent underline underline-offset-2" href="/แก้ไขข้อมูล">แจ้งแก้ไขข้อมูล</a> ·
			<a class="text-accent underline underline-offset-2" href="/บริจาค">สนับสนุนเว็บนี้</a>
		</p>
	</footer>
</div>

<style>
	:global(a) {
		color: inherit;
	}

	/* The two secondary pages were only reachable from the footer, which on a
	   33-row table is a scroll away from anyone wondering where a number came
	   from — the exact moment they want the method page. */
	.nav {
		text-underline-offset: 3px;
		transition: color 120ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.nav:hover {
			color: var(--color-ink);
			text-decoration: underline;
		}
	}
</style>
