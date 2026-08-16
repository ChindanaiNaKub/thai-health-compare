<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>สนับสนุนเว็บเปรียบเทียบประกันสุขภาพไทย</title>
	<meta name="description" content="สนับสนุนค่าเซิร์ฟเวอร์ของเว็บเปรียบเทียบประกันสุขภาพไทยที่ไม่มีโฆษณาและไม่มีค่าคอมมิชชัน" />
	<link rel="canonical" href="https://thai-health-compare.pages.dev/บริจาค" />
	<meta property="og:title" content="สนับสนุนเว็บเปรียบเทียบประกันสุขภาพไทย" />
	<meta property="og:description" content="ช่วยให้เว็บข้อมูลประกันสุขภาพไทยที่ไม่มีโฆษณาเปิดให้ใช้งานต่อไป" />
	<meta property="og:url" content="https://thai-health-compare.pages.dev/บริจาค" />
</svelte:head>

<h1 class="text-xl font-bold tracking-tight">สนับสนุนเว็บนี้</h1>

<div class="mt-4 max-w-sm space-y-4">
	<p class="text-muted">
		เว็บนี้ไม่มีโฆษณาและไม่มีลิงก์แนะนำ อยากช่วยออกค่าเซิร์ฟเวอร์ก็สแกนจ่ายพร้อมเพย์ได้เลย
		ให้เท่าไหร่ก็ได้ตามสะดวก
	</p>
	<div class="border-rule inline-block border-2 p-4">
		{@html data.qr}
	</div>
</div>
